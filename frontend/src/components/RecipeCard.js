import React from "react";
import { Box, SimpleGrid, Card, CardHeader, Heading, Text, CardBody, CardFooter, Button, Image, Tag } from "@chakra-ui/react"
import recipeDB from "../apis/recipeDB";


const RecipeCard = (props) => {
    const handleClick = ()=> {
        props.handler(props.recipe);
    }
    const handleSave = ()=> {
        console.log("saved")
        var userName = localStorage.getItem("userName")
        try {
            const response = recipeDB.post("/recipes/addRecipeToProfile", {
                "userName": userName,
                "recipe": props.recipe
            })
            alert("Recipe saved to your profile!")
        } catch(e) {
            console.log(`Error adding recipe to user-${userName}`)
            console.log("caught exception")
        }
    }
    return (
        <>
            <Card data-testid="recipeCard" _hover={{transform: "scale(1.05)", bg: "green.300", transitionDuration: "4" ,cursor: "pointer"}}>
                <CardHeader onClick={handleClick}>
                    <Heading data-testid="recipeName" size='md'>{props.recipe.TranslatedRecipeName}</Heading>
                </CardHeader>
                <CardBody>
                    <Text data-testid="time">Cooking Time: {props.recipe.TotalTimeInMins} mins</Text>
                    <Text data-testid="rating">Rating: {props.recipe['Recipe-rating']}</Text>
                    <Text data-testid="diet">Diet Type: {props.recipe['Diet-type']}</Text>
                    <Tag onClick={handleSave} _hover={{bg: "white"}} ml={"160px"} bg={"gray.300"}>save recipe</Tag>
                </CardBody>
                <Image
                    data-testid="recipeImg"
                    objectFit='cover'
                    src={props.recipe["image-url"]}
                    width={"90%"}
                    height={"40%"}
                    m={"auto"}
                    mb="2"
                />
            </Card>
        </>
    )
}

export default RecipeCard;