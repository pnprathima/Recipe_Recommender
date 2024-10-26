const { ObjectId } = require("mongodb");

const request = require("supertest")("http://localhost:5000/api/v1/recipes");
const expect = require("chai").expect;

describe("Ratings", function() {

    describe("PATCH /rateRecipe", function() {
        it("Should correctly update the rating to be new average", async function() {
            const response0 = await request.get("/getRecipeByName?recipeName=BLT");
            const res0JSON =  JSON.parse(response0.text)
            expect(response0.status).to.eql(200);
            const response = await request.patch("/rateRecipe")
                .send({ recipeID: res0JSON["recipes"][0]['_id'], rating: 3 });
            expect(response.status).to.eql(200);
            const response2 = await request.get("/getRecipeByName?recipeName=BLT");
            const res2JSON = JSON.parse(response2.text)
            expect(res2JSON["recipes"][0]['Recipe-rating'] === 4).true
        })
    })
})