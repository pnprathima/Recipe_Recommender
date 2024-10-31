import app from "../server";
const baseURL = "/api/v1";

const request = require("supertest");
const expect = require("chai").expect;

describe("GET /recipes", function () {
  it("is the API is functional test 1", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(baseURL + "/recipes?CleanedIngredients=coconut");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 2", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(baseURL + "/recipes?CleanedIngredients=COCONUT");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 3", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(baseURL + "/recipes?CleanedIngredients=mango");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 4", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(baseURL + "/recipes?CleanedIngredients=MANGO");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 5", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(baseURL + "/recipes?CleanedIngredients=Mango");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 6", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(baseURL + "/recipes?CleanedIngredients=mANGO");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 7", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(
      baseURL + "/recipes?CleanedIngredients={mango, salt}"
    );

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 8", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(
      baseURL + "/recipes?CleanedIngredients={salt, mango}"
    );

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 8", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(baseURL + "/recipes?CleanedIngredients={}");

    expect(response.status).to.eql(200);
  });

  it("is the API is fetching the filtered ingredient", async function () {
    await request(app).get(baseURL + "/recipes/initDB")
    const response = await request(app).get(baseURL + "/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.eql("pear");
  });
});
