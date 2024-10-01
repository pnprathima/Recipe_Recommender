import React from "react";
import {Box, HStack, Text, Input, InputGroup, InputRightElement, Button, VStack, Textarea, Badge, Alert, AlertIcon} from "@chakra-ui/react";
import recipeDB from "../apis/recipeDB";

const AddRecipe = () => {

    const [recipe, setRecipe] = React.useState({
        recipeName: "",
        cookingTime: 0,
        dietType: "",
        recipeRating: 0,
        cuisine: "",
        recipeURL: "",
        imageURL: "",
        instructions: "",
        ingredientCount: 0,
        ingredients: [],
        restaurants: [],
        locations: []
    });

    const [ingredientCount, setIngredientCount] = React.useState(0);

    const addIngredient = () => {
        const ingredient = document.getElementById("ingredients").value;
        setRecipe(prevValue => {
            return {
                ...prevValue,
                ingredients: [...prevValue.ingredients, ingredient],
                ingredientCount: prevValue.ingredientCount + 1
            }
        })
        document.getElementById("ingredients").value = "";
    };

    const addRestaurant = () => {
        const restaurant = document.getElementById("restaurant").value;
        setRecipe(prevValue => {
            return {
                ...prevValue,
                restaurants: [...prevValue.restaurants, restaurant]
            }
        })
        document.getElementById("restaurant").value = "";
    };

    const addLocation = () => {
        const location = document.getElementById("location").value;
        setRecipe(prevValue => {
            return {
                ...prevValue,
                locations: [...prevValue.locations, location]
            }
        })
        document.getElementById("location").value = "";
    }; 


    const handleChange = (event) => {
        setRecipe(prevValue => {
            return {
                ...prevValue,
                [event.target.id]: event.target.value
            }
        })
    }

    const addRecipe = () => {
        recipeDB.post("/recipes/addRecipe", recipe)
            .then(res => {
                console.log(res.data);
                // clear all fields
                setRecipe({
                    recipeName: "",
                    cookingTime: 0,
                    dietType: "",
                    recipeRating: 0,
                    cuisine: "",
                    recipeURL: "",
                    imageURL: "",
                    instructions: "",
                    ingredientCount: 0,
                    ingredients: [],
                    restaurants: [],
                    locations: []
                });
                document.getElementById("recipeName").value = "";
                document.getElementById("cookingTime").value = "";
                document.getElementById("dietType").value = "";
                document.getElementById("recipeRating").value = "";
                document.getElementById("cuisine").value = "";
                document.getElementById("recipeURL").value = "";
                document.getElementById("imageURL").value = "";
                document.getElementById("instructions").value = "";

                // Alert user that recipe was added
                <Alert status="success">
                    <AlertIcon />
                    Recipe Added!
                </Alert>
            })
            .catch(err => console.log(err));
    }

    const ingredientPrintHandler = () => {
        const ingredientList = recipe.ingredients;

        var ingredient_list = ingredientList.map((ingredient) =>
            <Badge id={ingredient} m={1} _hover={{cursor: "pointer"}} onClick={ingredientRemoveHandler} colorScheme="green">
                {ingredient}
            </Badge>
        );

        return  <ul class="IngredientList">{ingredient_list}</ul>;
    }

    const ingredientRemoveHandler = (event) => {
        const ingredient = event.target.id;
        const ingredientList = recipe.ingredients;
        const index = ingredientList.indexOf(ingredient);
        if (index > -1) {
            ingredientList.splice(index, 1);
        }
        setRecipe(prevValue => {
            return {
                ...prevValue,
                ingredients: ingredientList
            }
        })
    }

    const restaurantPrintHandler = () => {
        const restaurantList = recipe.restaurants;

        const restaurant_list = restaurantList.map((restaurant) =>
            <Badge id={restaurant} m={1} _hover={{cursor: "pointer"}} onClick={restaurantRemoveHandler} colorScheme="green">
                {restaurant}
            </Badge>
        );

        return <ul class="RestaurantList">{restaurant_list}</ul>;
    }

    const restaurantRemoveHandler = (event) => {
        const restaurant = event.target.id;
        const restaurantList = recipe.restaurants;
        const index = restaurantList.indexOf(restaurant);
        if (index > -1) {
            restaurantList.splice(index, 1);
        }
        setRecipe(prevValue => {
            return {
                ...prevValue,
                restaurants: restaurantList
            }
        })
    }

    const locationPrintHandler = () => {
        const locationList = recipe.locations;

        const location_list = locationList.map((location) =>
            <Badge id={location} m={1} _hover={{cursor: "pointer"}} onClick={locationRemoveHandler} colorScheme="green">
                {location}
            </Badge>
        );
    }

    const locationRemoveHandler = (event) => {
        const location = event.target.id;
        const locationList = recipe.locations;
        const index = locationList.indexOf(location);
        if (index > -1) {
            locationList.splice(index, 1);
        }
        setRecipe(prevValue => {
            return {
                ...prevValue,
                locations: locationList
            }
        })
    }

    return (
        <>
            <Box borderRadius={"lg"} border="2px" boxShadow={"lg"} borderColor={"gray.100"} fontFamily="regular" m={'auto'} marginTop={10} width={"50%"} p={5}>
                <Text fontSize={"3xl"} textAlign={'center'} fontWeight={"bold"}>Add New Recipe</Text>
                <VStack spacing={'5'} alignItems={"flex-center"} >
                    <HStack spacing={'5'} alignItems={"flex-start"} >
                        <Input type={"text"} id="recipeName" onChange={handleChange} placeholder={"Recipe Name"} />
                        <Input type={"number"} id="cookingTime" onChange={handleChange} placeholder={"Cooking Time in Mins"} />
                    </HStack>
                    <HStack spacing={'5'} alignItems={"flex-start"} >
                        <Input type={"text"} id="dietType" onChange={handleChange} placeholder={"Diet Type"} />
                        <Input type={"number"} id="recipeRating" onChange={handleChange} placeholder={"Recipe Rating"} />
                        <Input type={"text"} id="cuisine" onChange={handleChange} placeholder={"Cuisine"} />
                    </HStack>
                    <HStack spacing={'5'} alignItems={"flex-start"} >
                        <Input type={"URL"} id="recipeURL" onChange={handleChange} placeholder={"Recipe URL"} />
                        <Input type={"URL"} id="imageURL" onChange={handleChange} placeholder={"Image URL"} />
                    </HStack>
                    <HStack direction="row">
                        <InputGroup variant={"filled"}>
                        <Input type={"text"} marginEnd={"5px"} id="ingredients" placeholder={"Ingredients"} width={"45%"}/>
                        <Button mr={10} width={"5%"} onClick={addIngredient} id="addIngredientButton" _hover={{ bg: 'black', color: "gray.100" }} color={"gray.600"} bg={"green.300"}>Add</Button>
                        </InputGroup>
                        {ingredientPrintHandler()}
                    </HStack>
                    <HStack spacing={'5'} alignItems={"flex-start"} >
                        <InputGroup variant={"filled"}>
                            <Input type="text" marginEnd={"5px"} id="restaurant" placeholder={"Restaurannt"} width="45%"/>
                            <Button id="restaurantButton" width="5%" mr={10} onClick={addRestaurant} _hover={{ bg: 'black', color: "gray.100" }} color={"gray.600"} bg={"green.300"}>Add</Button>
                            {restaurantPrintHandler()}
                        </InputGroup>  
                    </HStack> 
                    <HStack spacing={'5'} alignItems={"flex-start"} >
                        <InputGroup variant={"filled"}>
                            <Input type="text" marginEnd={"5px"} id="location" placeholder={"Restaurant-Location"} width="45%" />
                            <Button id="locationButton" width="5%" mr={10} onClick={addLocation} _hover={{ bg: 'black', color: "gray.100" }} color={"gray.600"} bg={"green.300"}>Add</Button>
                            {locationPrintHandler()}
                        </InputGroup>  
                    </HStack> 
                    <Textarea onChange = {handleChange} id="instructions" placeholder={"Write Cooking Instructions Here"} />
                    <Button width={"30%"} m={'auto'} id="addRecipeButton" onClick={addRecipe} _hover={{ bg: 'black', color: "gray.100" }} color={"gray.600"} bg={"green.300"}>Add Recipe</Button>
                </VStack>
            </Box>
        </>
    )
};

export default AddRecipe;