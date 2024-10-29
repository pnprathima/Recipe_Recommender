//
import Form from "./components/Form.js";
import Header from "./components/Header";
import recipeDB from "./apis/recipeDB";
import RecipeList from "./components/RecipeList";
import AddRecipe from "./components/AddRecipe.js";
import React, { Component } from "react";
import { Tabs, Tab, TabList, TabPanel, TabPanels, Box } from "@chakra-ui/react";
import RecipeLoading from "./components/RecipeLoading.js";
import Nav from "./components/Navbar.js";
import SearchByRecipe from "./components/SearchByRecipe.js";
import Login from "./components/Login.js";
import UserProfile from "./components/UserProfile.js";
import LandingPage from "./components/LandingPage.js";
import BookMarksRecipeList from "./components/BookMarksRecipeList"; // Import BookMarksRecipeList

// Main component of the project
class App extends Component {
  // constructor for the App Component
  constructor(props) {
    super(props);

    // this.handleRemoveBookmark = this.handleRemoveBookmark.bind(this);

    this.state = {
      cuisine: "",
      //NoIngredients : 0,
      ingredients: new Set(),
      recipeList: [],
      recipeByNameList: [],
      searchName: "",
      email: "",
      flag: false,
      isLoading: false,
      isLoggedIn: false,
      isProfileView: false,
      userData: {
        bookmarks: [],
      },
    };
  }

  handleBookMarks = () => {
    this.setState({
      isProfileView: true,
    });
  };

  handleProfileView = () => {
    this.setState({
      isProfileView: false,
    });
  };

  handleSignup = async (userName, password) => {
    try {
      const response = await recipeDB.post("/recipes/signup", {
        userName,
        password,
      });
      console.log(response.data);
      if (response.data.success) {
        alert("Successfully Signed up!");
        this.setState({
          isLoggedIn: true,
          userData: response.data.user,
        });
        localStorage.setItem("userName", response.data.user.userName);
        console.log(response.data.user);
      } else {
        alert("User already exists");
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleLogin = async (userName, password) => {
    try {
      const response = await recipeDB.get("/recipes/login", {
        params: {
          userName,
          password,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        this.setState({
          isLoggedIn: true,
          userData: response.data.user,
        });
        localStorage.setItem("userName", response.data.user.userName);
        console.log(response.data.user);
        alert("Successfully logged in!");
      } else {
        console.log("Credentials are incorrect");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function to get the user input from the Form component on Submit action
  handleSubmit = async (formDict) => {
    this.setState({
      isLoading: true,
    });
    console.log(formDict);
    this.setState({
      // cuisine: cuisineInput,
      //NoIngredients: noIngredientsInput,
      ingredients: formDict["ingredient"],
      cuisine: formDict["cuisine"],
      email: formDict["email_id"],
      flag: formDict["flag"],
    });

    const mail = formDict["email_id"];
    const flag = formDict["flag"];
    const items = Array.from(formDict["ingredient"]);
    const cuis = formDict["cuisine"];
    this.getRecipeDetails(items, cuis, mail, flag);
    //  alert(typeof(ingredientsInput["cuisine"]));
  };

  handleRecipesByName = (recipeName) => {
    this.setState({
      isLoading: true,
      searchName: recipeName,
    });
    recipeDB
      .get("/recipes/getRecipeByName", {
        params: {
          recipeName: recipeName,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          recipeByNameList: res.data.recipes,
          isLoading: false,
        });
      });
  };

  getRecipeDetails = async (ingredient, cuis, mail, flag) => {
    try {
      const response = await recipeDB.get("/recipes", {
        params: {
          CleanedIngredients: ingredient,
          Cuisine: cuis,
          Email: mail,
          Flag: flag,
        },
      });
      this.setState({
        recipeList: response.data.recipes,
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleLogout = () => {
    console.log("logged out");
    this.setState({
      isLoggedIn: false,
      showLogin: false,
      userData: {},
    });
  };

  handleBookMarks = async () => {
    // Fetch bookmarks when navigating to profile view
    const userName = localStorage.getItem("userName");
    try {
      const response = await recipeDB.get("/recipes/getBookmarks", {
        params: { userName },
      });
      this.setState({
        isProfileView: true,
        userData: {
          ...this.state.userData,
          bookmarks: response.data.recipes, // Set fetched bookmarks to state
        },
      });
    } catch (err) {
      console.error("Error fetching bookmarks", err);
    }
  };

  handleRemoveBookmark = async (recipeId) => {
    const userName = localStorage.getItem("userName");

    try {
      const response = await recipeDB.post("/recipes/removeBookmark", {
        userName,
        recipeId,
      });

      if (response.data.success) {
        this.setState((prevState) => ({
          userData: {
            ...prevState.userData,
            bookmarks: prevState.userData.bookmarks.filter(
              (recipe) => (recipe.id || recipe._id) !== recipeId // Remove based on recipeId
            ),
          },
        }));
      } else {
        throw new Error(response.data.message || "Failed to remove bookmark");
      }
    } catch (error) {
      console.error("Failed to remove bookmark:", error);
    }
  };

  handleProfileView = () => {
    this.setState({
      isProfileView: false,
    });
  };

  render() {
    return (
      <div>
        <Nav
          handleLogout={this.handleLogout}
          handleBookMarks={this.handleBookMarks}
          user={this.state.isLoggedIn ? this.state.userData : null}
          onLoginClick={() => this.setState({ isLoggedIn: false })}
        />
        {this.state.isLoggedIn ? (
          <>
            {this.state.isProfileView ? (
              <UserProfile
                handleProfileView={this.handleProfileView}
                user={this.state.userData}
              >
                {}
                <BookMarksRecipeList
                  recipes={this.state.userData.bookmarks}
                  // onRemove={this.handleRemoveBookmark}
                />
              </UserProfile>
            ) : (
              <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList ml={10}>
                  <Tab>Search Recipe</Tab>
                  <Tab>Add Recipe</Tab>
                  <Tab>Search Recipe By Name</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Box display='flex'>
                      <Form sendFormData={this.handleSubmit} />
                      {this.state.isLoading ? (
                        <RecipeLoading />
                      ) : (
                        <RecipeList recipes={this.state.recipeList} />
                      )}
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <AddRecipe />
                  </TabPanel>
                  <TabPanel>
                    <SearchByRecipe sendRecipeData={this.handleRecipesByName} />
                    {this.state.isLoading ? (
                      <RecipeLoading />
                    ) : (
                      <RecipeList
                        recipes={this.state.recipeByNameList}
                        refresh={this.handleRecipesByName}
                        searchName={this.state.searchName}
                      />
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}
          </>
        ) : (
          <>
            {this.state.showLogin ? (
              <Login
                handleSignup={this.handleSignup}
                handleLogin={this.handleLogin}
              />
            ) : (
              <LandingPage
                onGetStarted={() => this.setState({ showLogin: true })}
              />
            )}
          </>
        )}
      </div>
    );
  }
}

export default App;
