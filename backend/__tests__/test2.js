const request = require("supertest")("http://localhost:5000/api/v1");
const expect = require("chai").expect;

describe("GET /recipes", function () {
  it("is the API is fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.eql("pear");
  });

  it("is the API is fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=peach");

    expect(response.body.filters.CleanedIngredients).to.eql("peach");
  });

  it("is the API is fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=salt");

    expect(response.body.filters.CleanedIngredients).to.eql("salt");
  });

  it("is the API is fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=sugar");

    expect(response.body.filters.CleanedIngredients).to.eql("sugar");
  });

  it("is the API is fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=cheese");

    expect(response.body.filters.CleanedIngredients).to.eql("cheese");
  });

  it("is the API is fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=lemon");

    expect(response.body.filters.CleanedIngredients).to.eql("lemon");
  });

  it("is the API is fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=spinach");

    expect(response.body.filters.CleanedIngredients).to.eql("spinach");
  });

  it("is the API is fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=apple");

    expect(response.body.filters.CleanedIngredients).to.eql("apple");
  });

  it("is the API is fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=tortillas");

    expect(response.body.filters.CleanedIngredients).to.eql("tortillas");
  });
});
