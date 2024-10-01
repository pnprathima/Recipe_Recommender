import mongodb from "mongodb";
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
      ingredients = await conn.db(process.env.RECIPES_NS).collection("ingredient_list");
      users = await conn.db(process.env.RECIPES_NS).collection("user");
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
    query = { "userName": filters.userName }
    if (filters) {
      cursor = await users.findOne(query);
      if (cursor.userName) {
        if (cursor.password == filters.password) {
          return { success: true, user: cursor }
        } else {
          return { success: false }
        }
      } else {
        return { success: false }
      }
    }
  }

  static async addUser({ data = null } = {}) {
    let query;
    let cursor;
    let user;
    query = { "userName": data.userName }
    console.log(query)
    if (data) {
      cursor = await users.findOne(query);
      console.log(cursor)
      if (cursor!==null) {
        return {success: false}
      } else {
        const res = await users.insertOne(data)
        return { success: true }
      }
    }
  }
  
  //function to get bookmarks
  static async getBookmarks(userName) {
    let query;
    let cursor;
    let user;
    query = { "userName": userName }
    console.log(query)
    try {
      cursor = await users.findOne(query);
      if (cursor.userName) {
        return cursor.bookmarks;
      } else {
        return { bookmarks: [] }
      }
    } catch (e) {
      console.log(`error: ${e}`)
    }
  }

  //Function to get recipe by name
  static async getRecipeByName({ filters = null } = {}) {
    let query;
    if (filters) {
      if ("recipeName" in filters) {
        const words = filters["recipeName"].split(" ");
        const regexPattern = words.map(word => `(?=.*\\b${word}\\b)`).join('');
        const regex = new RegExp(regexPattern, "i");
        query = { "TranslatedRecipeName": { $regex: regex } };
        // query["Cuisine"] = "Indian";
      }
      let recipesList;
      try {
        recipesList = await recipes
          .find(query)
          .collation({ locale: "en", strength: 2 }).toArray();
        return { recipesList }
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
    try{
      response = await recipes.insertOne(inputRecipe);
      return response;
    } catch(e){
      console.error(`Unable to add recipe, ${e}`);
      return response;
    }
  }

    //function to add recipe to user profile
    static async addRecipeToProfile(userName, recipe) {
      let response;
      console.log(userName)
      try {
        response = await users.updateOne(
          { userName: userName },
          { $push: { bookmarks: recipe } }
        )
        console.log(response)
        return response;
      } catch (e) {
        console.log(`Unable to add recipe, ${e}`)
      }
    }
    
  static async getIngredients(){
    let response = {};
    try{
      response = await ingredients.distinct('item_name');
      return response;
    }catch(e){
      console.error(`Unable to get ingredients, ${e}`);
      return response;
    }
  } 
}
