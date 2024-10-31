const { ObjectId } = require("mongodb");
import app from "../server";
const baseURL = "/api/v1/recipes";

const request = require("supertest");
const expect = require("chai").expect;

describe("Ratings", function() {

    describe("PATCH /rateRecipe", function() {
        it("Should correctly update the rating to be new average", async function() {
            await request(app).get(baseURL + "/initDB")
            const response0 = await request(app).get(baseURL + "/getRecipeByName?recipeName=BLT");
            const res0JSON =  JSON.parse(response0.text)
            expect(response0.status).to.eql(200);
            const response = await request(app).patch(baseURL + "/rateRecipe")
                .send({ recipeID: res0JSON["recipes"][0]['_id'], rating: 3 });
            expect(response.status).to.eql(200);
            const response2 = await request(app).get(baseURL + "/getRecipeByName?recipeName=BLT");
            const res2JSON = JSON.parse(response2.text)
            expect(res2JSON["recipes"][0]['Recipe-rating'] === 4).true
        })
    })
})