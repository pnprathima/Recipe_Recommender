import app from "../server";
const baseURL = "/api/v1/recipes";

const request = require("supertest");
const expect = require("chai").expect;

describe("GET /recipes", function () {
  it("is the API is functional test 1", async function () {
    await request(app).get(baseURL + "/initDB")
    const response = await request(app).get(baseURL + "?CleanedIngredients=Tomato");

    expect(response.status).to.eql(200);
  });
  it("is the API is functional test 2", async function () {
    await request(app).get(baseURL + "/initDB")
    const response = await request(app).get(baseURL + "?Cuisine=Indian");

    expect(response.status).to.eql(200);
  });
  it("is the API is fetching the filtered ingredient", async function () {
    await request(app).get(baseURL + "/initDB")
    const response = await request(app).get(
      baseURL + "?CleanedIngredients=Mango&Cuisine=Indian"
    );

    expect(response.body.filters.CleanedIngredients).to.eql("Mango");
  });
  it("is the API is fetching the filtered ingredient", async function () {
    await request(app).get(baseURL + "/initDB")
    const response = await request(app).get(
      baseURL + "?CleanedIngredients=Mango&Cuisine=Mexican"
    );

    expect(response.body.filters.Cuisine).to.eql("Mexican");
  });
  it("is the API fetching the recipe components", async function () {
    await request(app).get(baseURL + "/initDB")
    const response = await request(app).get(
      baseURL + "?CleanedIngredients=Mango&Cuisine=Indian"
    );

    expect(response.text.includes("Cleaned-Ingredients")).true;
  });
  it("is the API fetching the recipe components", async function () {
    await request(app).get(baseURL + "/initDB")
    const response = await request(app).get(
      baseURL + "?CleanedIngredients=Mango&Cuisine=Indian"
    );

    expect(response.text.includes('"Cuisine":"Indian"')).true;
  });
  it("is the API fetching the recipe components", async function () {
    await request(app).get(baseURL + "/initDB")
    const response = await request(app).get(
      baseURL + "?CleanedIngredients=Mango&Cuisine=Indian"
    );

    expect(response.text.includes("TotalTimeInMins")).true;
  });
  it("is the API fetching the recipe components", async function () {
    await request(app).get(baseURL + "/initDB")
    const response = await request(app).get(
      baseURL + "?CleanedIngredients=Mango&Cuisine=Indian"
    );

    expect(response.text.includes("Diet-type")).true;
  });
  it("is the API fetching the recipe components", async function () {
    await request(app).get(baseURL + "/initDB")
    const response = await request(app).get(
      baseURL + "?CleanedIngredients=Mango&Cuisine=Indian"
    );

    expect(response.text.includes("Recipe-rating")).true;
  });
  it("is the API fetching the recipe by name", async function () {
    await request(app).get(baseURL + "/initDB")
    const response = await request(app).get(
      baseURL + "/getRecipeByName?recipeName=andhra"
    );

    expect(response.text.includes("Andhra")).true;
  });
});
