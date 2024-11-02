# Enhanced Recipe Recommender: Introducing additional features and addressing issues for an improved user experience.

![](Reciperec.gif)
<br><br>
## Watch how our application works: 
### Click here to watch - [Youtube Video](https://youtu.be/133EWUQWe5Q) <br>
<br><br>



[![Made With](https://img.shields.io/badge/made%20with-javascript-gree)](https://www.javascript.com/)
[![DOI](https://zenodo.org/badge/706798373.svg)](https://zenodo.org/doi/10.5281/zenodo.10023534)
[![GitHub issues open](https://img.shields.io/github/issues/pnprathima/Recipe_Recommender)](https://github.com/pnprathima/Recipe_Recommender/issues)
[![GitHub stars](https://badgen.net/github/stars/pnprathima/Recipe_Recommender)](https://badgen.net/github/stars/pnprathima/Recipe_Recommender)
![Github closes issues](https://img.shields.io/github/issues-closed-raw/pnprathima/Recipe_Recommender)
[![Build Status](https://app.travis-ci.com/pnprathima/Recipe_Recommender.svg?branch=master)](https://app.travis-ci.com/pnprathima/Recipe_Recommender)
[![codecov](https://codecov.io/gh/usmanwardag/dollar_bot/branch/main/graph/badge.svg?token=PYAWX95R67)](https://codecov.io/gh/usmanwardag/dollar_bot)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Respost - Write comment to new Issue event](https://github.com/pnprathima/Recipe_Recommender/actions/workflows/Respost.yml/badge.svg)](https://github.com/pnprathima/Recipe_Recommender/actions/workflows/Respost.yml)
![GitHub contributors](https://img.shields.io/github/contributors/pnprathima/Recipe_Recommender)
[![Code Formatter and Syntax Check](https://github.com/pnprathima/Recipe_Recommender/actions/workflows/Code_Formatter_and_Syntax_Check.yml/badge.svg)](https://github.com/pnprathima/Recipe_Recommender/actions/workflows/Code_Formatter_and_Syntax_Check.yml)
[![Running Code Coverage](https://github.com/pnprathima/Recipe_Recommender/actions/workflows/coverage.yml/badge.svg)](https://github.com/pnprathima/Recipe_Recommender/actions/workflows/coverage.yml)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/pnprathima/Recipe_Recommender)
![Open Issues](https://img.shields.io/github/issues-raw/pnprathima/Recipe_Recommender)
![Closed Issues](https://img.shields.io/github/issues-closed-raw/pnprathima/Recipe_Recommender)
![CI/CD](https://img.shields.io/badge/CI/CD-Passing-brightgreen)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

   
   
<h2> What is Recipe Recommender? </h2>

Meet Recipe Recommender, your ultimate kitchen companion! Say goodbye to the dilemma of deciding what to cook with the ingredients on hand. We've revolutionized the cooking experience with an application that effortlessly suggests delicious recipes based on your kitchen inventory.  <br>

Unlock the full potential of your pantry and fridge as our innovative software guides you in selecting perfect dishes tailored to your current ingredients. Cooking is now an exciting adventure rather than a daunting task. Immerse yourself in a realm of limitless culinary possibilities with Recipe Recommender.  <br>

We've added <b> numerous entertaining new features and fixes to enhance user-friendliness.</b> <br>
1. Craving enchiladas but unsure how to cook Mexican food? Now, you can search for recipes by names! Just type in "enchiladas," choose a recipe based on its features, and enjoy. <br>

2. Imagine finding interesting recipes during your commute. With another new feature, you can save them on the go. We've also introduced dedicated user profiles. Sign up, log in, and save your favorite recipes under your profile in the "bookmarks" section. When you're ready to cook, everything will be waiting for you.  <br>

3. That's not all! We've removed non-functional buttons, technically known as "refactoring the system."  <br>
4. Your profile, information, and favorite recipes now have a dedicated space. Secure logins and logouts ensure no duplicate entries or exposed credentials, making the system more secure.


<br> <b> More about our new additions in our next section!</b>

## Feature additions: Enhancements, Upgrades and BugFixes:
Presenting our latest additions: Here's a comprehensive list of all our new features, enhancements, and upgrades! <br>
1. User Profile: In our application, users can now establish a profile with a unique username and password, allowing seamless login and logout. This facilitates personalized experiences and customized access to preferences and activities. Further details will be discussed in the following points. Your profile, information, and preferred recipes now inhabit a designated area, simplifying the management of all your belongings in one organized space.
2. Bookmarks: Picture this scenario: You're commuting, scrolling through intriguing recipes in our app. Thanks to a cutting-edge feature, you can now save them instantly. The introduction of dedicated user profiles elevates your experience. Simply sign up, log in, and curate your favorite recipes in the "bookmarks" section under your profile. When the time comes to cook, everything awaits you – seamlessly organized and easily accessible.
3. Search for recipes by name: Previously limited to ingredient-based searches only, our system now boasts an exciting upgrade. You can now search for recipes by name! Ever craved enchiladas without knowing the recipe? Simply input "enchiladas," peruse based on features, and relish the culinary journey.
4. Refactoring the UI: We've eliminated inactive buttons and links, employing a technical process termed "system refactoring" to enhance functionality and optimize the user interface.
5. System security upgrade: We observed some passwords present in the codebase, which is a major security threat. We have ensured to removed this and move it to the DB. Additionally, we have implemented secure logins and logouts ensuring the prevention of duplicate entries and safeguards credentials, fortifying the overall security of the system.
6. The requirements.txt file has been updated to ensure forward compatibility by specifying package versions greater than or equal to the ones explicitly mentioned. This modification allows for the installation of packages with versions that meet or exceed the specified ones, thus accommodating future updates and maintaining compatibility with evolving dependencies.

## Documentation and Project Flow:
![](flow-rr.gif) <br><br>
1. User Registration: Establish a unique username and password; no duplicate usernames allowed, ensuring password confidentiality.
2. User Authentication: Log in using the correct username and password for secure access.
3. Search Recipes by Ingredients: Input your available ingredients to discover relevant recipes based on ingredient names.
4. Search Recipes by Dish Name: Locate recipes by specifying the dish name in the search.
5. Add a Recipe: Share details such as ingredients, dish name, time, cuisine, instructions, and optional images to contribute your recipe.
6. Bookmark Favorite Recipes: Save preferred recipes for easy access.
7. View Bookmarked Recipes in User Profile: Access and review all saved recipes conveniently stored under your user profile.
8. Logout: Securely log out to protect your profile information and activities. <br><br>



Source documentation can be found at: [Recipe Recommender Docs](https://github.com/pnprathima/Recipe_Recommender/blob/master/Recipe%20Recommender%20Source%20Documentation.pdf)


## API Documentation
**Get Recipes:**
Retrieve a list of recipes based on specified filters like ingredients, cuisine, and page parameters. Success returns a code of 200 with the recipe list; error returns code 500 with an error message.

**Get Recipe Cuisines:**
Fetches available cuisines, responding with a code of 200 and an array of cuisine strings on success. In case of an error, it returns a code of 500 with an error message.

**Add Recipe:**
Allows users to add a new recipe via the /addRecipe endpoint, responding with a code of 200 and the inserted recipe's ID on success. In case of an error, it returns a code of 500 with an error message.

**Get Ingredients:**
Retrieves a list of distinct ingredients through the /callIngredients endpoint. Success returns a code of 200 with an array of ingredient strings; error returns code 500 with an error message.

**User Signup:**
Enables user registration at the /signup endpoint. Success returns a code of 200 with a success indicator; error returns code 500 with an error message.

**User Login:**
Authenticates a user via the /login endpoint, returning a code of 200 with a success indicator and user object on success. In case of an error, it returns a code of 500 with an error message.

**Get Bookmarks:**
Retrieves bookmarked recipes for a user through the /getBookmarks endpoint. Success returns a code of 200 with an array of bookmarked recipes; error returns code 500 with an error message.

**Add Recipe to User Profile:**
Adds a recipe to a user's profile bookmarks via the /addRecipeToProfile endpoint. Success returns a code of 200 with the count of modified items; error returns code 500 with an error message.

<br>Detailed documentation can be found at: [API Docs](https://github.com/pnprathima/Recipe_Recommender/blob/master/API_Documentation.pdf)

## Technology Stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![JEST](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

<br>Detailed documentation can be found at: [TechStack Docs](https://github.com/pnprathima/Recipe_Recommender/blob/master/TechStack-Docs)

## Key Software Requirements

- [Node.js v18.17.1](https://nodejs.org/en/download/)
- [NPM v10.1.0](https://nodejs.org/en/download/)

## Project Setup Steps:

### Installation:
Check out our comprehensive YouTube video demonstrating each step for easy guidance. [Project Setup](https://youtu.be/uKh-afpUdh0)
- clone repository using `git clone https://github.com/pnprathima/Recipe_Recommender.git`
- setup for frontend
  open terminal and navigate to the **frontend** folder and execute the following:
  ```
  npm install
  ```
- setup for backend
  open terminal and navigate to the **backend** folder and execute the following:

  ```
  npm install
  ```

  ## Execution Steps

1.  start backend server using:
    ```
    npx nodemon
    ```
2.  start frontend server using:
    ```
    npm start
    ```
3.  Automatically a browser window is opened which shows frontend.
4.  run `npm test` for running the tests [Dependencies: Jest, Chai, Supertest]


## Release Made in this cycle <br>
1. Major release 3.1 - Major release to add search by recipe, user registration, user login and bookmarks.
2. Hotfix Release 3.1.2 - Minor version release to add test case for login
3. Major Release 3.2 - Major release- Included test cases addition, user registration, minor bug fixes and documentation updates<br>
[Read our detailed release notes](https://github.com/pnprathima/Recipe_Recommender/releases) <br>
<br>


### IDE and Code Formatter

- [Visual Studio Code](https://code.visualstudio.com/) IDE
- [Prettier Formatter for Visual Studio Code](https://github.com/prettier/prettier-vscode/blob/main/README.md)



## :page_facing_up: License <a name="License"></a>

This project is licensed under the terms of the MIT license. Please check [License](https://github.com/PvPatel-1001/Recipe_Recommender/blob/master/LICENSE) for more details.

## :pencil2: Contributions <a name="Contributions"></a>

Please see our [CONTRIBUTING.md](https://github.com/pnprathima/Recipe_Recommender/blob/master/CONTRIBUTING.md) for instructions on how to contribute to the project by completing some of the issues.

## FUTURE SCOPE

Meal planning- saving data for all meals of the day.

Voice to text integration. 

Chatbot integration- to answer quick queries about the recipe.

## Team Members

Tejas Desai <br>
Kaustubh Sonnawane <br>
Nikita Chuadhari <br>

## New Features

Implemented personalized diertary requirements based filtering.

<p align="center">Made with ❤️ on GitHub.</p>
