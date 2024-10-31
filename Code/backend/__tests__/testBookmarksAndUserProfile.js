/* MIT License

Copyright (c) 2023 Pannaga Rao, Harshitha, Prathima, Karthik  */

import app from "../server";
const baseURL = "/api/v1/recipes";

const request = require("supertest");
const expect = require("chai").expect;

describe("Bookmarks API Tests", function () {

  describe("POST /addRecipeToProfile", function () {
    it("should successfully add a recipe to user's profile", async function () {
      await request(app).get(baseURL + "/initDB")
      const recipeData = { recipeId: "1", title: "Test Recipe" };
      const response = await request(app).post(baseURL + "/addRecipeToProfile")
        .send(recipeData)

      expect(response.status).to.eql(200);
    });
  });

  describe("Recipes API - Get Bookmarks Tests", function () {
    // Test with userName provided
    it("should return bookmarks for a given user", async function () {
      await request(app).get(baseURL + "/initDB")
      const response = await request(app).get(baseURL + "/getBookmarks")
        .query({ userName: "Test" });
  
      expect(response.status).to.eql(200);
    });
  });

});
