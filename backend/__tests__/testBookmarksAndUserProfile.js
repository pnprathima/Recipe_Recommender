/* MIT License

Copyright (c) 2023 Pannaga Rao, Harshitha, Prathima, Karthik  */

const request = require("supertest")("http://localhost:5000/api/v1/recipes");
const expect = require("chai").expect;

describe("Recipes API Tests", function () {

  describe("POST /addRecipeToProfile", function () {
    it("should successfully add a recipe to user's profile", async function () {
      const recipeData = { recipeId: "1", title: "Test Recipe" };
      const response = await request.post("/addRecipeToProfile")
        .send(recipeData)

      expect(response.status).to.eql(200);
    });
  });

  describe("Recipes API - Get Bookmarks Tests", function () {
    // Test with userName provided
    it("should return bookmarks for a given user", async function () {
      const response = await request.get("/getBookmarks")
        .query({ userName: "Test" });
  
      expect(response.status).to.eql(200);
    });
  });

});
