import * as mongodb from "mongodb";
import nodemailer from "nodemailer";
import password from "./mail_param.js";
const pass = password.password;
const GMAIL = process.env.GMAIL;

const ObjectId = mongodb.ObjectId;
let recipes;
let ingredients;
let users;
//Function to connect to DB
export default class RecipesDAO {
  static async injectDB(conn) {
    if (recipes) {
      return;
    }
    try {
      recipes = await conn.db(process.env.RECIPES_NS).collection("recipe");
      ingredients = await conn
        .db(process.env.RECIPES_NS)
        .collection("ingredient_list");
      users = await conn.db(process.env.RECIPES_NS).collection("user");
      console.log("db started")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in recipesDAO: ${e}`
      );
    }
  }

  static async getUser({ filters = null } = {}) {
    let query;
    let cursor;
    let user;
    query = { userName: filters.userName };
    if (filters) {
      cursor = await users.findOne(query);
      if (cursor.userName) {
        if (cursor.password == filters.password) {
          return { success: true, user: cursor };
        } else {
          return { success: false };
        }
      } else {
        return { success: false };
      }
    }
  }

  static async addUser({ data = null } = {}) {
    let query;
    let cursor;
    let user;
    query = { userName: data.userName };
    console.log(query);
    if (data) {
      cursor = await users.findOne(query);
      console.log(cursor);
      if (cursor !== null) {
        return { success: false };
      } else {
        const res = await users.insertOne(data);
        return { success: true };
      }
    }
  }

  //function to get bookmarks
  static async getBookmarks(userName) {
    let query;
    let cursor;
    let user;
    query = { userName: userName };
    console.log(query);
    try {
      cursor = await users.findOne(query);
      if (cursor.userName) {
        return cursor.bookmarks;
      } else {
        return { bookmarks: [] };
      }
    } catch (e) {
      console.log(`error: ${e}`);
    }
  }

  //Function to get recipe by name
  static async getRecipeByName({ filters = null } = {}) {
    let query;
    if (filters) {
      if ("recipeName" in filters) {
        const words = filters["recipeName"].split(" ");
        const regexPattern = words
          .map((word) => `(?=.*\\b${word}\\b)`)
          .join("");
        const regex = new RegExp(regexPattern, "i");
        query = { TranslatedRecipeName: { $regex: regex } };
        // query["Cuisine"] = "Indian";
      }
      let recipesList;
      try {
        recipesList = await recipes
          .find(query)
          .collation({ locale: "en", strength: 2 })
          .toArray();
        return { recipesList };
      } catch (e) {
        console.error(`Unable to issue find command, ${e}`);
        return { recipesList: [], totalNumRecipess: 0 };
      }
    }
  }

  //Function to get the Recipe List
  static async getRecipes({
    filters = null,
    page = 0,
    recipesPerPage = 10,
  } = {}) {
    let query;
    if (filters) {
      if ("CleanedIngredients" in filters) {
        var str = "(?i)";

        for (var i = 0; i < filters["CleanedIngredients"].length; i++) {
          const str1 = filters["CleanedIngredients"][i];
          str += "(?=.*" + str1 + ")";
        }
        console.log(str);
        query = { "Cleaned-Ingredients": { $regex: str } };
        query["Cuisine"] = filters["Cuisine"];
        console.log(query);
        var email = filters["Email"];
        var flagger = filters["Flag"];
        console.log(email);
        console.log(flagger);
      }
    }

    let cursor;

    try {
      cursor = await recipes
        .find(query)
        .collation({ locale: "en", strength: 2 });
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { recipesList: [], totalNumRecipess: 0 };
    }

    const displayCursor = cursor.limit(recipesPerPage);
    try {
      const recipesList = await displayCursor.toArray();
      const totalNumRecipes = await recipes.countDocuments(query);

      var str_mail = "";
      for (var j = 1; j <= recipesList.length; j++) {
        str_mail += "\nRecipe " + j + ": \n";
        str_mail += recipesList[j - 1]["TranslatedRecipeName"] + "\n";
        str_mail +=
          "Youtube Link: https://www.youtube.com/results?search_query=" +
          recipesList[j - 1]["TranslatedRecipeName"].replace(/ /g, "+") +
          "\n\n";
      }

      if (flagger == "true") {
        var transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: GMAIL,
            pass: pass,
          },
        });

        var mailOptions = {
          from: GMAIL,
          to: email,
          subject: "Recommended Recipes! Enjoy your meal!!",
          text: str_mail,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }

      return { recipesList, totalNumRecipes };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { recipesList: [], totalNumRecipes: 0 };
    }
  }

  //Function to get the list of Cuisines
  static async getCuisines() {
    let cuisines = [];
    try {
      cuisines = await recipes.distinct("Cuisine");
      return cuisines;
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`);
      return cuisines;
    }
  }

  // Function to add a recipe
  static async addRecipe(recipe) {
    console.log("Inside addRecipe");
    console.log(recipe);
    let inputRecipe = {};
    inputRecipe["TranslatedRecipeName"] = recipe["recipeName"];
    inputRecipe["TotalTimeInMins"] = recipe["cookingTime"];
    inputRecipe["Diet-type"] = recipe["dietType"];
    inputRecipe["Recipe-rating"] = recipe["recipeRating"];
    inputRecipe["Times-rated"] = 1;
    inputRecipe["Cuisine"] = recipe["cuisine"];
    inputRecipe["image-url"] = recipe["imageURL"];
    inputRecipe["URL"] = recipe["recipeURL"];
    inputRecipe["TranslatedInstructions"] = recipe["instructions"];
    var ingredients = "";
    for (var i = 0; i < recipe["ingredients"].length; i++) {
      ingredients += recipe["ingredients"][i] + "%";
    }
    inputRecipe["Cleaned-Ingredients"] = ingredients;
    var restaurants = "";
    var locations = "";
    for (var j = 0; j < recipe["restaurants"].length; j++) {
      restaurants += recipe["restaurants"][j] + "%";
      locations += recipe["locations"][j] + "%";
    }
    inputRecipe["Restaurant"] = restaurants;
    inputRecipe["Restaurant-Location"] = locations;
    console.log("Input Recipe");
    console.log(inputRecipe);
    let response = {};
    try {
      response = await recipes.insertOne(inputRecipe);
      return response;
    } catch (e) {
      console.error(`Unable to add recipe, ${e}`);
      return response;
    }
  }

  static async rateRecipe(ratingBody) {
    let r = await recipes
      .find({ _id: new ObjectId(ratingBody.recipeID) })
      .collation({ locale: "en", strength: 2 })
      .toArray();
    let recipe = r[0];
    let timesRated = recipe["Times-rated"] ? Number(recipe["Times-rated"]) : 1;
    let newRating = Number(recipe["Recipe-rating"]) * timesRated;
    newRating += ratingBody.rating;
    timesRated++;
    newRating /= timesRated;
    await recipes.updateOne(
      { _id: new ObjectId(ratingBody.recipeID) },
      { $set: { "Times-rated": timesRated, "Recipe-rating": newRating } }
    );
  }

  //function to add recipe to user profile
  static async addRecipeToProfile(userName, recipe) {
    try {
      console.log(`Attempting to add recipe to profile for user: ${userName}`);

      // First, check if the recipe already exists in the user's bookmarks
      const user = await users.findOne({ userName: userName });
      if (!user) {
        return { success: false, message: "User not found" };
      }

      const existingBookmark = user.bookmarks
        ? user.bookmarks.find(
            (bookmark) => bookmark._id.toString() === recipe._id.toString()
          )
        : null;
      if (existingBookmark) {
        console.log("Recipe already bookmarked");
        return { success: false, message: "Recipe already bookmarked" };
      }

      // If the recipe doesn't exist, add it to the bookmarks
      const updateResult = await users.updateOne(
        { userName: userName },
        { $addToSet: { bookmarks: recipe } }
      );

      console.log("Update result:", updateResult);

      if (updateResult.modifiedCount === 0) {
        console.log("No changes made to bookmarks");
        return { success: false, message: "No changes made to bookmarks" };
      }

      console.log("Recipe added to bookmarks successfully");
      return {
        success: true,
        message: "Recipe added to bookmarks successfully",
      };
    } catch (e) {
      console.error(`Error in addRecipeToProfile: ${e}`);
      throw e;
    }
  }

  static async removeBookmark(userName, recipeId) {
    try {
      console.log("DAO: Removing bookmark for:", { userName, recipeId });
      const updateResponse = await users.updateOne(
        { userName: userName },
        { $pull: { bookmarks: { _id: recipeId } } }
      );
      console.log("DAO: Update response:", updateResponse);

      if (updateResponse.modifiedCount === 1) {
        console.log("DAO: Bookmark removed successfully");
        return { success: true, message: "Bookmark removed successfully" };
      } else if (updateResponse.matchedCount === 0) {
        console.log("DAO: User not found");
        return { success: false, message: "User not found" };
      } else {
        console.log("DAO: Bookmark not found or already removed");
        return {
          success: false,
          message: "Bookmark not found or already removed",
        };
      }
    } catch (e) {
      console.error(`DAO: Unable to remove bookmark:`, e);
      throw e;
    }
  }

  static async addRecipeToMealPlan(userName, recipeID, weekDay) {
    let response;
    try {
      if(!recipeID) {
        throw new Error("recipe id not defined")
      }
      let updateBody = JSON.parse(
        '{ "meal-plan.' + weekDay + '": "' + recipeID + '" }'
      );
      response = await users.updateOne(
        { userName: userName },
        { $set: updateBody }
      );
      return response;
    } catch (e) {
      console.log(`Unable to add recipe to meal plan, ${e}`);
    }
  }

  static async getMealPlan(userName) {
    let cursor;
    let mealPlanResponse = {
      sunday: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
    };
    try {
      cursor = await users.findOne({ userName: userName });
      if (cursor.userName) {
        let plan = cursor['meal-plan'] ? cursor['meal-plan'] : {}
        for(const day in plan) {
          if(plan[day] != "") {
            let recipe = await recipes.findOne({_id: new ObjectId(plan[day])})
            let dayPlan = {}
            dayPlan[day] = recipe
            mealPlanResponse = {...mealPlanResponse, ...dayPlan}
          }
        }
        console.log(mealPlanResponse)
        return mealPlanResponse
      } else {
        throw new Error(`Cannot find user with name ${userName}`);
      }
    } catch (e) {
      console.log(`error: ${e}`);
    }
  }

  static async getIngredients() {
    let response = {};
    try {
      response = await ingredients.distinct("item_name");
      return response;
    } catch (e) {
      console.error(`Unable to get ingredients, ${e}`);
      return response;
    }
  }

  static async initDB() {
    if(recipes) {
      return {success: true}
    }
    try {
      await mongodb.MongoClient.connect(process.env.RECIPES_DB_URI, {
          maxPoolSize: 50,
          wtimeoutMS: 2500,
          useNewUrlParser: true,
      }).then(async (client) => {
        await this.injectDB(client)
        return {success: true}
      })
      
    } catch (e) {
      console.log(e);
      return {success: false}
    }
  }
}
