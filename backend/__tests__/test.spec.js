const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
// const request = require("supertest")(httplocalhost5000apiv1);
const expect = require("chai").expect;
// var util= require('util');
// var encoder = new util.TextEncoder('utf-8');
//
// describe(GET recipes, function () {
//   it(is the API is functional, async function () {
//     const response = await request.get(recipesCleanedIngredients=coconut);
//
//     expect(response.status).to.eql(200);
//   });
//
//   it(is the API is fetching the filtered ingredient, async function () {
//     const response = await request.get(recipesCleanedIngredients=pear);
//
//     expect(response.body.filters.CleanedIngredients).to.eql(pear);
//   });
// });

function test_connectivity_func() {
  // Connection URI. Update username, password, and your-cluster-url to reflect your cluster.
  // See httpsdocs.mongodb.comecosystemdriversnode for more details

  const uri =
    "mongodb+srv://atharvajoshi067:ZgSvdar14OnteUZx@cluster0.9zuebnu.mongodb.net/recipe_recommender?retryWrites=true&w=majority";
  var result = false;
  try {
    // Connect to the MongoDB cluster
    var mongoClient = MongoClient.connect(uri, {
      useNewUrlParser: true,
      maxPoolSize: 50,
      wtimeoutMS: 2500,
    }).then(async (client) => {
      // await recipesDAO.injectDB(client);
      // app.listen(port, () => {
      //   console.log(`listening on port ${port}`);
      // });
      client.close();
      // process.exit(1);
    });
    result = true;
  } catch (e) {
    result = false;
  } finally {
  }
  return result;
}

describe("GET recipes", function () {
  it("is Db up and running", function () {
    const response = test_connectivity_func();
    expect(response).to.equal(true);
  });
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.

  // MongoClient.disconnect();
  done();
});
