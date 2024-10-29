import React from "react";
import {
  Card,
  CardHeader,
  Heading,
  Text,
  CardBody,
  Image,
  Tag,
  Box
} from "@chakra-ui/react";
import Rating from "./Rating";
import recipeDB from "../apis/recipeDB";


const MealPlanRecipeCard = (props) => {
    const removeFromMealPlan = (day) => {
        const requestBody = {
            userName: localStorage.getItem("userName"),
            recipeID: "",
            weekDay: day
        }
        recipeDB.put("/recipes/mealPlan", requestBody).then((res) => {
            props.updateMealPlan()
        })
    }

    return (
        <Card
          data-testid='recipeCard'
          borderRadius='md'
          boxShadow='lg'
          _hover={{
            transform: "scale(1.05)",
            bg: "green.100",
            transitionDuration: "0.2s",
          }}
          transition='0.2s'
          my={0}
          mb={4}
          px={1}
        >
          <CardHeader>
            <Heading
              data-testid='recipeName'
              size='md'
              textAlign='center'
              color='teal.600'
              onClick={() => props.handler(props.recipe)}
              cursor='pointer' // Add pointer cursor to indicate it's clickable
            >
              {props.recipe.TranslatedRecipeName}
            </Heading>
          </CardHeader>
          <CardBody py={1} px={1}>
            <Image
              data-testid='recipeImg'
              objectFit='cover'
              src={props.recipe["image-url"]}
              borderRadius='md'
              mb={3}
              fallbackSrc='https://via.placeholder.com/250' // Placeholder for missing images
            />
            <Text data-testid='time' fontWeight='bold' mb={1}>
              Cooking Time: {props.recipe.TotalTimeInMins} mins
            </Text>
            <Box display="flex" flexDirection="row" alignItems="center" mb={1} flexWrap="wrap" px={0} widht="100%">
                <Box width={["100%, 100%, 100%", "100%", "100%", "auto"]}><Text data-testid='rating' fontWeight='bold' >
                Rating: 
                {/* {props.recipe["Recipe-rating"]} */}
                </Text></Box>
                <Rating rating={props.recipe["Recipe-rating"]}></Rating>
            </Box>
            <Text data-testid='diet' fontWeight='bold' mb={2}>
              Diet Type: {props.recipe["Diet-type"]}
            </Text>
            <Box justifySelf="center">
                <Tag
                as='a'
                colorScheme='red'
                variant='solid'
                cursor='pointer'
                mt={2}
                onClick={() => removeFromMealPlan(props.day)}
                >
                Remove
                </Tag>
            </Box>
          </CardBody>
        </Card>
    );
};

export default MealPlanRecipeCard