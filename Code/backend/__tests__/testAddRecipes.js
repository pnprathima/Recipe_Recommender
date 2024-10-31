import app from "../server";
const baseURL = "/api/v1/recipes";

const request = require("supertest");
const expect = require("chai").expect;

describe("POST /addRecipes", function () {
    it("Should add a recipe if all fields are provided", async function() {
        await request(app).get(baseURL + "/initDB");
        const recipe = {
            recipeName: "Test_Recipe_1",
            cookingTime: 20,
            dietType: "Normal",
            recipeRating: 3,
            cuisine: "American",
            imageURL: "",
            recipeURL: "",
            instructions: "1) Cook the food \n2) Eat the food",
            ingredients: ["Meat", "Pasta", "Sauce"],
            restaurants: ["Pasta House"],
            locations: ["Raleigh"]
        }
        const response = await request(app).post(baseURL + "/addRecipe").send(recipe)
        expect(response.status).to.equal(200)
        const response2 = await request(app).get(
            baseURL + "/getRecipeByName?recipeName=Test_Recipe_1"
        );
        expect(response2.status).to.equal(200)
        expect(response2.text.includes("Test_Recipe_1")).true;
    });
    it("Should add a recipe if some fields are provided", async function() {
        await request(app).get(baseURL + "/initDB");
        const recipe = {
            recipeName: "Test_Recipe_2",
            cookingTime: 20,
            recipeRating: 3,
            cuisine: "American",
            instructions: "1) Cook the food \n2) Eat the food",
            ingredients: ["Meat", "Pasta", "Sauce"],
            restaurants: [],
            locations: []
        }
        const response = await request(app).post(baseURL + "/addRecipe").send(recipe)
        expect(response.status).to.equal(200)
        const response2 = await request(app).get(
            baseURL + "/getRecipeByName?recipeName=Test_Recipe_2"
        );
        expect(response2.status).to.equal(200)
        expect(response2.text.includes("Test_Recipe_2")).true;
    });
    it("Should not add a recipe if no name is provided", async function() {
        await request(app).get(baseURL + "/initDB");
        const recipe = {
            cookingTime: 20,
            recipeRating: 3,
            cuisine: "American",
            instructions: "1) Cook the food \n2) Eat the food",
            ingredients: ["Meat", "Pasta", "Sauce"],
            restaurants: [],
            locations: []
        }
        const response = await request(app).post(baseURL + "/addRecipe").send(recipe)
        expect(response.status).to.not.equal(200)
    });
})