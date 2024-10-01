import React, { useState } from "react";
import { Avatar, Flex, Modal, ModalBody, ModalCloseButton, ModalOverlay, ModalHeader, ModalFooter, ModalContent, Box, SimpleGrid, Text, Button } from "@chakra-ui/react"
import RecipeCard from "./RecipeCard";

// component to handle all the recipes
const RecipeList = ({ recipes }) => {
  // mapping each recipe item to the Recipe container
  // const renderedRecipes = recipes.map((recipe) => {
  //   // return <Recipe key={recipe._id} recipe={recipe} />;
  //   return(

  //   )
  // });
  console.log(recipes)
  const [isOpen, setIsOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});
  var youtube_videos =
    "https://www.youtube.com/results?search_query=" +
    currentRecipe["TranslatedRecipeName"];
  const handleViewRecipe = (data) => {
    setIsOpen(true)
    console.log(data)
    setCurrentRecipe(data);
  }
  const onClose = () => {
    setIsOpen(false)
  }
  // all the recipes are being returned in the form of a table
  return (
    <>
      <Box borderRadius={"lg"} border="1px" boxShadow={"10px"} borderColor={"gray.100"} fontFamily="regular" m={10} width={"70%"} p={5}>
        <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
          {recipes.length !==0 ? recipes.map((recipe) => (
            <RecipeCard handler={handleViewRecipe} recipe={recipe} />
          )) : <Text data-testid="noResponseText" fontSize={"lg"} color={"gray"}>Searching for a recipe?</Text>}
        </SimpleGrid>
      </Box>
      <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent data-testid="recipeModal" >
          <ModalHeader>{currentRecipe.TranslatedRecipeName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex >
            <Avatar size="2xl" mr={2} mb={2} src={currentRecipe["image-url"]} />
              <Box mt={4}>
                <Text><Text as={"b"}>Cooking Time: </Text>{currentRecipe.TotalTimeInMins} mins</Text>
                <Text><Text as={"b"}>Rating: </Text> {currentRecipe['Recipe-rating']}</Text>
                <Text mb={2}><Text as={"b"}>Diet Type: </Text> {currentRecipe['Diet-type']}</Text>
              </Box>
            </Flex>
            <Text><Text as={"b"}>Instructions: </Text> {currentRecipe["TranslatedInstructions"]}</Text>
            <Text color={"blue"}><Text color={"black"}  as={"b"}>Video Url: </Text><a href={youtube_videos}>Youtube</a></Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};
export default RecipeList;
