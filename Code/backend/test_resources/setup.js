import { TextEncoder, TextDecoder } from 'util';
import mongodb from "mongodb"
const MongoClient = mongodb.MongoClient;
import dotenv from 'dotenv'
dotenv.config()

export default function (globalConfig, projectConfig) {
  
    console.log('Setting up for tests')
    const users = {"users": [
      {
        "userName": "Test",
        "password": "admin",
      },
      {
        "userName": "TestB",
        "password": "adminB",
        "bookmarks": [
          {
            "TranslatedRecipeName": "Test_Recipe_B",
            "_id": 85
          }
        ]
      }
    ]}
    const recipes = {
      "recipes": [
        {
          "TranslatedRecipeName": "BLT",
          "TotalTimeInMins": "15",
          "Diet-type": "",
          "Recipe-rating": 5,
          "Times-rated": 1,
          "Cuisine": "American",
          "image-url": "",
          "URL": "",
          "TranslatedInstructions": "Cook sandwich",
          "Cleaned-Ingredients": "Bacon%Lettuce%Tomato%Bread%",
          "Restaurant": "",
          "Restaurant-Location": ""
        },
        {
          "TranslatedRecipeName": "Andhra",
          "TotalTimeInMins": "20",
          "Diet-type": "Vegetarian",
          "Recipe-rating": 5,
          "Times-rated": 1,
          "Cuisine": "Indian",
          "image-url": "",
          "URL": "",
          "TranslatedInstructions": "Cook the food",
          "Cleaned-Ingredients": "Mango%Rice%",
          "Restaurant": "",
          "Restaurant-Location": ""
        },
        {
          "TranslatedRecipeName": "AndhraTwo",
          "TotalTimeInMins": "20",
          "Diet-type": "Vegetarian",
          "Recipe-rating": 5,
          "Times-rated": 1,
          "Cuisine": "Indian",
          "image-url": "",
          "URL": "",
          "TranslatedInstructions": "Cook the food",
          "Cleaned-Ingredients": "Bread%",
          "Restaurant": "",
          "Restaurant-Location": ""
        }
      ]
    }
    const ingredients = {"ingredients": [
      {"item_name": "Tomato"}, {"item_name": "Bread"}, {"item_name": "Lettuce"}, {"item_name": "Bacon"}, 
    ]}
    Object.assign(global, { TextDecoder, TextEncoder });
    const uri = process.env.RECIPES_DB_URI;
    var mongoClient = MongoClient.connect(uri, {
        useNewUrlParser: true,
        maxPoolSize: 50,
        wtimeoutMS: 2500,
    }).then(async (client) => {
        const recipeCollection = client.db(process.env.RECIPES_NS).collection("recipe")//.then(async (recipeCollection) => {
        await recipeCollection.deleteMany({})
        await recipeCollection.insertMany(recipes.recipes)
        const userCollection = client.db(process.env.RECIPES_NS).collection("user")//.then(async (recipeCollection) => {
        await userCollection.deleteMany({})
        await userCollection.insertMany(users.users)
        const ingredientCollection = client.db(process.env.RECIPES_NS).collection("ingredient_list")//.then(async (recipeCollection) => {
        await ingredientCollection.deleteMany({})
        await ingredientCollection.insertMany(ingredients.ingredients)
        client.close()
    });
};