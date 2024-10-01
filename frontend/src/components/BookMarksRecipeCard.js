/* MIT License

Copyright (c) 2023 Pannaga Rao, Harshitha, Prathima, Karthik  */

import React from "react";
import { Box, HStack, SimpleGrid, Card, CardHeader, Heading, Text, CardBody, CardFooter, Button, Image, Tag } from "@chakra-ui/react"
import recipeDB from "../apis/recipeDB";


const BookMarksRecipeCard = (props) => {
    const handleClick = ()=> {
        props.handler(props.recipe);
    }
    
    return (
        <>
            <Card onClick={handleClick} data-testid="recipeCard" _hover={{transform: "scale(1.05)", bg: "green.300", transitionDuration: "4" ,cursor: "pointer"}}>
                <CardHeader>
                    <Heading data-testid="recipeName" size='md'>{props.recipe.TranslatedRecipeName}</Heading>
                </CardHeader>
                <CardBody>
                    <Text data-testid="time">Cooking Time: {props.recipe.TotalTimeInMins} mins</Text>
                    <Text data-testid="rating">Rating: {props.recipe['Recipe-rating']}</Text>
                    <Text data-testid="diet">Diet Type: {props.recipe['Diet-type']}</Text>
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

export default BookMarksRecipeCard;