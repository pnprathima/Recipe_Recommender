import app from "../server";
const baseURL = "/api/v1";

const request = require("supertest");
const expect = require("chai").expect;

describe("GET /recipes", function () {
  it("is the API is fetching the filtered ingredient", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(baseURL + "/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.eql("pear");
  });

  it("is the API is fetching the filtered ingredient", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(baseURL + "/recipes?CleanedIngredients=peach");

    expect(response.body.filters.CleanedIngredients).to.eql("peach");
  });

  it("is the API is fetching the filtered ingredient", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(baseURL + "/recipes?CleanedIngredients=salt");

    expect(response.body.filters.CleanedIngredients).to.eql("salt");
  });

  it("is the API is fetching the filtered ingredient", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(baseURL + "/recipes?CleanedIngredients=sugar");

    expect(response.body.filters.CleanedIngredients).to.eql("sugar");
  });

  it("is the API is fetching the filtered ingredient", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(baseURL + "/recipes?CleanedIngredients=cheese");

    expect(response.body.filters.CleanedIngredients).to.eql("cheese");
  });

  it("is the API is fetching the filtered ingredient", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(baseURL + "/recipes?CleanedIngredients=lemon");

    expect(response.body.filters.CleanedIngredients).to.eql("lemon");
  });

  it("is the API is fetching the filtered ingredient", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(baseURL + "/recipes?CleanedIngredients=spinach");

    expect(response.body.filters.CleanedIngredients).to.eql("spinach");
  });

  it("is the API is fetching the filtered ingredient", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(baseURL + "/recipes?CleanedIngredients=apple");

    expect(response.body.filters.CleanedIngredients).to.eql("apple");
  });

  it("is the API is fetching the filtered ingredient", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(baseURL + "/recipes?CleanedIngredients=tortillas");

    expect(response.body.filters.CleanedIngredients).to.eql("tortillas");
  });
});
