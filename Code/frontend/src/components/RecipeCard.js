import React from "react";
import {
  Box,
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  Text,
  CardBody,
  CardFooter,
  Button,
  Image,
  Tag,
  useToast, // For displaying notifications
} from "@chakra-ui/react";
import recipeDB from "../apis/recipeDB";
import Rating from "./Rating";

const RecipeCard = (props) => {
  const toast = useToast();

  const handleClick = () => {
    props.handler(props.recipe);
  };

  const handleSave = async () => {
    const userName = localStorage.getItem("userName");
    if (!userName) {
      console.error("No user logged in");
      // Show an error message to the user
      return;
    }

    try {
      console.log("Attempting to save recipe:", props.recipe);
      console.log("User:", userName);

      const response = await recipeDB.post("/recipes/addRecipeToProfile", {
        userName,
        recipe: props.recipe,
      });

      console.log("Save recipe response:", response.data);
      if (response.data.success) {
        // Show success toast
        toast({
          title: "Success",
          description: "Bookmark saved successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error(response.data.message || "Failed to save bookmark");
      }
      // Handle successful save
    } catch (error) {
      console.error("Error saving recipe:", error);
      // Show an error message to the user
      toast({
        title: "Error",
        description: error.message || "Failed to save bookmark",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Card
      data-testid='recipeCard'
      borderRadius='md'
      boxShadow='lg'
      _hover={{
        transform: "scale(1.05)",
        bg: "green.100",
        transitionDuration: "0.2s",
        cursor: "pointer",
      }}
      transition='0.2s'
      mb={4}
      p={4}
    >
      <CardHeader onClick={handleClick}>
        <Heading
          data-testid='recipeName'
          size='md'
          textAlign='center'
          color='teal.600'
        >
          {props.recipe.TranslatedRecipeName}
        </Heading>
      </CardHeader>
      <CardBody>
        <Image
          data-testid='recipeImg'
          objectFit='cover'
          src={props.recipe["image-url"]}
          borderRadius='md'
          mb={3}
          fallbackSrc='https://via.placeholder.com/250' // Placeholder for missing images
        />
        <Box display='flex' flexDirection='row' alignItems='center'>
          <Text data-testid='rating'>Rating: </Text>
          <Rating rating={props.recipe["Recipe-rating"]}></Rating>
        </Box>
        <Text data-testid='time' fontWeight='bold' mb={1}>
          Cooking Time: {props.recipe.TotalTimeInMins} mins
        </Text>
        <Text data-testid='rating' fontWeight='bold' mb={1}>
          Rating: {props.recipe["Recipe-rating"]}
        </Text>
        <Text data-testid='diet' fontWeight='bold' mb={2}>
          Diet Type: {props.recipe["Diet-type"]}
        </Text>
        <Tag
          onClick={handleSave}
          colorScheme='teal'
          variant='solid'
          cursor='pointer'
          mt={2}
        >
          Save Recipe
        </Tag>
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
