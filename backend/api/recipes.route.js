import express from "express";
import RecipesCtrl from "./recipes.controller.js";
import RecipesDAO from "../dao/recipesDAO.js";

const router = express.Router();
//URl to get the recipes
router.route("/").get(RecipesCtrl.apiGetRecipes);

router.route("/cuisines").get(RecipesCtrl.apiGetRecipeCuisines);

router.route("/addRecipe").post(RecipesCtrl.apiPostRecipe);

router.route('/callIngredients').get(RecipesCtrl.apiGetIngredients);

router.route("/signup").post(RecipesCtrl.apiAuthSignup);

router.route("/login").get(RecipesCtrl.apiAuthLogin);

router.route("/getBookmarks").get(RecipesCtrl.apiGetBookmarks);

router.route("/addRecipeToProfile").post(RecipesCtrl.apiPostRecipeToProfile);

router.route("/getRecipeByName").get(RecipesCtrl.apiGetRecipeByName);

export default router;
