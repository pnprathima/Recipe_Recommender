const request = require("supertest")("http://localhost:5000/api/v1");
const expect = require("chai").expect;

describe("GET /recipes", function () {
  it("is the API is functional test 1", async function () {
    const response = await request.get("/recipes?CleanedIngredients=coconut");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 2", async function () {
    const response = await request.get("/recipes?CleanedIngredients=COCONUT");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 3", async function () {
    const response = await request.get("/recipes?CleanedIngredients=mango");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 4", async function () {
    const response = await request.get("/recipes?CleanedIngredients=MANGO");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 5", async function () {
    const response = await request.get("/recipes?CleanedIngredients=Mango");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 6", async function () {
    const response = await request.get("/recipes?CleanedIngredients=mANGO");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 7", async function () {
    const response = await request.get(
      "/recipes?CleanedIngredients={mango, salt}"
    );

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 8", async function () {
    const response = await request.get(
      "/recipes?CleanedIngredients={salt, mango}"
    );

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 8", async function () {
    const response = await request.get("/recipes?CleanedIngredients={}");

    expect(response.status).to.eql(200);
  });

  it("is the API is fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.eql("pear");
  });
});
