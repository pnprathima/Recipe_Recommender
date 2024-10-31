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
      const recipeData = { recipeId: "1", title: "Test Recipe"};
      const response = await request(app).post(baseURL + "/addRecipeToProfile")
        .send({userName: "Test", recipe: recipeData})
      expect(response.status).to.eql(200);
      const response2 = await request(app).get(baseURL + "/getBookmarks")
        .query({ userName: "Test" });
      expect(response2.text.includes('"recipeId":"1"')).true
    });
    it("should successfully not add a recipe if no user is given", async function () {
      await request(app).get(baseURL + "/initDB")
      const recipeData = { recipeId: "2", title: "Test Recipe"};
      const response = await request(app).post(baseURL + "/addRecipeToProfile")
        .send({recipe: recipeData})
      expect(response.status).not.to.eql(200);
      expect(response.text.includes('"success":false')).true
    });
    it("should successfully not add a recipe if no recipe is given", async function () {
      await request(app).get(baseURL + "/initDB")
      const response = await request(app).post(baseURL + "/addRecipeToProfile")
        .send({userName: "Test"})

      expect(response.status).not.to.eql(200);
      expect(response.text.includes('"success":false')).true
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
    it("should not return bookmarks for a nonexistent user", async function () {
      await request(app).get(baseURL + "/initDB")
      const response = await request(app).get(baseURL + "/getBookmarks")
        .query({ userName: "Fake" });
  
      expect(response.status).not.to.eql(200);
    });
  });

  describe("Recipes API - Delete Bookmarks Tests", function() {
    it("Should remove an existing bookmark from a user", async function() {
      await request(app).get(baseURL + "/initDB");
      const response = await request(app).post(baseURL + "/removeBookmark").send({userName:"TestB", recipeId:85})
      expect(response.status).to.equal(200)
      expect(response.text.includes('"success":true')).true
      const response2 = await request(app).get(baseURL + "/getBookmarks")
        .query({ userName: "TestB" });
      expect(response2.text.includes("Test_Recipe_B")).false
    })
    it("Should not remove a bookmark that does not exist", async function() {
      await request(app).get(baseURL + "/initDB");
      const response = await request(app).post(baseURL + "/removeBookmark").send({userName:"TestB", recipeId:55})
      expect(response.status).to.equal(200)
      expect(response.text.includes('"success":false')).true
    })
    it("Should not remove a bookmark from a user that does not exist", async function() {
      await request(app).get(baseURL + "/initDB");
      const response = await request(app).post(baseURL + "/removeBookmark").send({userName:"Fake", recipeId:85})
      expect(response.status).to.equal(200)
      expect(response.text.includes('"success":false')).true
    })
  })

});
