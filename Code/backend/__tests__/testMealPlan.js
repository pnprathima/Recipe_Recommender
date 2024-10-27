const { ObjectId } = require("mongodb");

const request = require("supertest")("http://localhost:5000/api/v1/recipes");
const expect = require("chai").expect;

describe("Meal Plan", function() {

    describe("Put /mealPlan", function() {
        it("Should correctly update the meal plan with new recipes", async function() {
            const response0 = await request.get("/getRecipeByName?recipeName=BLT");
            const res0JSON =  JSON.parse(response0.text)
            expect(response0.status).to.eql(200);
            const response = await request.put("/mealPlan")
                .send({ recipeID: res0JSON["recipes"][0]['_id'], userName: "Test", weekDay: "monday" });
            expect(response.status).to.eql(200);
        })
    })
})