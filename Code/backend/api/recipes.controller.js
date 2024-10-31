import RecipesDAO from "../dao/recipesDAO.js";

export default class RecipesController {
  static async apiAuthLogin(req, res) {
    let filters = {};
    filters.userName = req.query.userName;
    filters.password = req.query.password;
    const { success, user } = await RecipesDAO.getUser({
      filters,
    });
    res.json({ success, user });
  }
  static async apiAuthSignup(req, res) {
    if (req.body) {
      let data = {};
      data.userName = req.body.userName;
      data.password = req.body.password;
      const { success, user } = await RecipesDAO.addUser({
        data,
      });
      res.json({ success, user });
    }
  }

  static async apiGetBookmarks(req, res) {
    if (req.query.userName) {
      const bookmarks = await RecipesDAO.getBookmarks(req.query.userName);
      console.log(bookmarks);
      res.json({ bookmarks });
    } else {
      res.json("Username not given");
    }
  }

  static async apiPostRecipeToProfile(req, res) {
    console.log("Received request to add recipe to profile");
    console.log("Request body:", JSON.stringify(req.body, null, 2));

    const { userName, recipe } = req.body;

    if (!userName || !recipe) {
      console.log("Missing userName or recipe in request");
      return res
        .status(400)
        .json({ success: false, message: "Missing userName or recipe" });
    }

    try {
      const result = await RecipesDAO.addRecipeToProfile(userName, recipe);
      console.log("Result of adding recipe:", result);
      res.json(result);
    } catch (e) {
      console.error("Error in apiPostRecipeToProfile:", e);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: e.message,
      });
    }
  }

  static async apiRemoveRecipeFromProfile(req, res) {
    const { userName, recipeId } = req.body;
    try {
      const result = await RecipesDAO.removeBookmark(userName, recipeId);
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async apiGetRecipeByName(req, res) {
    let filters = {};
    //Checking the query to find the required results
    console.log(req.query);
    if (req.query.recipeName) {
      filters.recipeName = req.query.recipeName;
    }

    const { recipesList } = await RecipesDAO.getRecipeByName({
      filters,
    });

    let response = {
      recipes: recipesList,
    };
    res.json(response);
  }

  static async apiGetRecipes(req, res, next) {
    const recipesPerPage = req.query.recipesPerPage
      ? parseInt(req.query.recipesPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    //Checking the query to find the required results

    if (req.query.CleanedIngredients) {
      filters.CleanedIngredients = req.query.CleanedIngredients;
      filters.Cuisine = req.query.Cuisine;
      filters.Email = req.query.Email;
      filters.Flag = req.query.Flag;
    }

    const { recipesList, totalNumRecipes } = await RecipesDAO.getRecipes({
      filters,
      page,
      recipesPerPage,
    });

    let response = {
      recipes: recipesList,
      page: page,
      filters: filters,
      entries_per_page: recipesPerPage,
      total_results: totalNumRecipes,
    };
    res.json(response);
  }
  //Function to get the cuisines
  static async apiGetRecipeCuisines(req, res, next) {
    try {
      let cuisines = await RecipesDAO.getCuisines();
      res.json(cuisines);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiPostRecipe(req, res, next) {
    try {
      let response = await RecipesDAO.addRecipe(req.body);
      res.json(response);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiPatchRecipeRating(req, res, next) {
    try {
      console.log(req.body);
      let response = await RecipesDAO.rateRecipe(req.body);
      res.json(response);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetIngredients(req, res, next) {
    try {
      let ingredients = await RecipesDAO.getIngredients();
      res.json(ingredients);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async apiAddtoPlan(req, res, next) {
    try {
      let response = await RecipesDAO.addRecipeToMealPlan(
        req.body.userName,
        req.body.recipeID,
        req.body.weekDay
      );
      res.json(response);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async apiGetMealPlan(req, res, next) {
    try {
      let response = await RecipesDAO.getMealPlan(req.query.userName);
      res.json(response);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async apiInitDB(req, res) {
    try {
      let response = await RecipesDAO.initDB();
      res.json(response);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
}
