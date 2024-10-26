import mongodb from "mongodb"
const MongoClient = mongodb.MongoClient;
import recipes from "./testRecipes.json" assert {type: 'json'}
import users from "./testUsers.json" assert {type: 'json'}
import dotenv from 'dotenv'
dotenv.config()

export default async function (globalConfig, projectConfig) {
    const uri = process.env.RECIPES_DB_URI;
    console.log(uri)
    var mongoClient = MongoClient.connect(uri, {
        useNewUrlParser: true,
        maxPoolSize: 50,
        wtimeoutMS: 2500,
      }).then(async (client) => {
        const recipeCollection = await client.db(process.env.RECIPES_NS).collection("recipe")//.then(async (recipeCollection) => {
        await recipeCollection.deleteMany({})
        await recipeCollection.insertMany(recipes.recipes)
        const userCollection = await client.db(process.env.RECIPES_NS).collection("user")//.then(async (recipeCollection) => {
        await userCollection.deleteMany({})
        await userCollection.insertMany(users.users)
        client.close()
        });
};