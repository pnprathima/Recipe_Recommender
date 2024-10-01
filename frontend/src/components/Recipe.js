import React from "react";
import "../video.css";
import VideoURL from "./VideoURL";
import background from "./componentImages/bg-card2.jpg";

// Recipe component dealing with individial recipe items
const Recipe = (recipe) => {
  // splitting the ingredients with seperator as a comma
  var ingredients_seperated = recipe.recipe["Cleaned-Ingredients"].split(",");
  var translated_instruction = recipe.recipe["TranslatedInstructions"];
  var cooking_time = recipe.recipe["TotalTimeInMins"];
  var recipe_rating = recipe.recipe["Recipe-rating"];
  var diet_type = recipe.recipe["Diet-type"];
  var restaurant = recipe.recipe["Restaurant"].split("%");
  var location = recipe.recipe["Restaurant-Location"].split("%");
  var restaurant_location = [];
  for (let i = 0; i < restaurant.length; i++) {
    restaurant_location.push(restaurant[i] + ": " + location[i]);
  }
  var youtube_videos =
    "https://www.youtube.com/results?search_query=" +
    recipe.recipe["TranslatedRecipeName"];
  // mapping each ingredient to be displayes as a list item
  ingredients_seperated = ingredients_seperated.map((ingredient) => (
    <li class="recipe_ingredient_item"> {ingredient}</li>
  ));
  restaurant_location = restaurant_location.map((restaurantitem) => (
    <li class="recipe_restaurant_item"> {restaurantitem}</li>
  ));
  <p>{translated_instruction}</p>;

  // returns individual container for each recipe

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="col-lg-2 pb-1"
      id="resultContainer"
    >
      <div className="card">
        <div className="card-body">
          <h2>{recipe.recipe.TranslatedRecipeName}</h2>
          <p className="card.text">
            <h3>Ingredients: </h3>
            <br />
            <ul class="result_ingredients"> {ingredients_seperated} </ul>
            <h3>Cooking Time (in Mins): </h3>
            <ul class="result_cookingtime"> {cooking_time} </ul>
            <h3>Diet Type: </h3>
            <ul class="result_diettype"> {diet_type} </ul>
            <h3>Recipe Rating: </h3>
            <ul class="result_reciperating"> {recipe_rating} </ul>
            <h3>Restaurants: </h3>
            <br />
            <ul class="result_restaurants"> {restaurant_location} </ul>
            <h3>Instructions: </h3>
            <br />
            <ol class="result_instructions"> {translated_instruction} </ol>
            <h3>Videos: </h3>
            <a href={youtube_videos}> {youtube_videos} </a>
            <br />
            <img
              src={recipe.recipe["image-url"]}
              alt={recipe.recipe.TranslatedRecipeName}
            />
          </p>
          <div className="row"></div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
