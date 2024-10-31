import app from "../server";
const baseURL = "/api/v1/recipes";

const request = require("supertest");
const expect = require("chai").expect;

describe("GET /callIngredients", function () {
    it("Should retrieve all ingredients in the ingredients list", async function() {
        await request(app).get(baseURL + "/initDB");
        const response = await request(app).get(baseURL + "/callIngredients")
        console.log(response.text)
        expect(response.status).to.equal(200)
        expect(response.text.includes("Bread")).true
        const resArray = JSON.parse(response.text)
        expect(resArray.length).to.equal(4)
    })
});