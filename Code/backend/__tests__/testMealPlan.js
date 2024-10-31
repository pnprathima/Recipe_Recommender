const { ObjectId } = require("mongodb");
import app from "../server";
const baseURL = "/api/v1/recipes";

const request = require("supertest")
const expect = require("chai").expect;

describe("Meal Plan", function() {
    describe("Put /mealPlan", function() {
        it("Should correctly update the meal plan with new recipes", async function() {
            await request(app).get(baseURL + "/initDB")
            const response0 = await request(app).get(baseURL + "/getRecipeByName?recipeName=BLT");
            const res0JSON =  JSON.parse(response0.text)
            expect(response0.status).to.eql(200);
            const response = await request(app).put(baseURL + "/mealPlan")
                .send({ recipeID: res0JSON["recipes"][0]['_id'], userName: "Test", weekDay: "monday" });
            expect(response.status).to.eql(200);
            const response2 = await request(app).get(baseURL + "/mealPlan?userName=Test")
            expect(response2.text.includes("monday")).true
            expect(response2.text.includes(res0JSON["recipes"][0]['_id'])).true
        });
        it("Should remove a recipe from the meal plan", async function() {
            await request(app).get(baseURL + "/initDB")
            const response = await request(app).put(baseURL + "/mealPlan")
                .send({ recipeID: "", userName: "Test", weekDay: "monday" });
            expect(response.status).to.eql(200);
            const response2 = await request(app).get(baseURL + "/mealPlan?userName=Test")
            const res2JSON = JSON.parse(response2.text)
            expect(response2.text.includes("monday")).true
            expect(res2JSON.monday === "").true
        })
    })
})