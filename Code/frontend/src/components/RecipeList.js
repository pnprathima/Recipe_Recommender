import React, { useState } from "react";
import {
  Avatar,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Box,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";
import Rating from "./Rating";
import RateRecipe from "./RateRecipe";

// component to handle all the recipes
const RecipeList = ({ recipes, refresh, searchName }) => {
  // mapping each recipe item to the Recipe container
  // const renderedRecipes = recipes.map((recipe) => {
  //   // return <Recipe key={recipe._id} recipe={recipe} />;
  //   return(

  //   )
  // });
  console.log(recipes);
  const [isOpen, setIsOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});

  const [isChange, setIsChange] = useState(false);
  var youtube_videos =
    "https://www.youtube.com/results?search_query=" +
    currentRecipe["TranslatedRecipeName"];
  const handleViewRecipe = (data) => {
    setIsOpen(true);
    setCurrentRecipe(data);
  };

  const onClose = () => {
    setIsOpen(false);
    setIsOpen(false);
    setCurrentRecipe({});
    if (isChange) {
      refresh(searchName);
    }
  };
  // all the recipes are being returned in the form of a table
  return (
    <>
      <Box
        borderRadius={"lg"}
        border='1px'
        boxShadow='lg'
        borderColor='gray.200'
        fontFamily='sans-serif'
        m={10}
        width={"80%"}
        p={5}
        bg='white'
      >
        <Text fontSize='2xl' fontWeight='bold' mb={5} textAlign='center'>
          Recipe Collection
        </Text>
        <SimpleGrid
          spacing={5}
          templateColumns='repeat(auto-fill, minmax(250px, 1fr))'
        >
          {recipes.length !== 0 ? (
            recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                handler={handleViewRecipe}
                recipe={recipe}
                // You can also pass additional props to RecipeCard if needed
              />
            ))
          ) : (
            <Text data-testid='noResponseText' fontSize={"lg"} color={"gray"}>
              Searching for a recipe?
            </Text>
          )}
        </SimpleGrid>
      </Box>
      <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent data-testid='recipeModal'>
          <ModalHeader fontSize='xl' fontWeight='bold'>
            {currentRecipe.TranslatedRecipeName || "Recipe Details"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex align='center' mb={4}>
              <Avatar
                size='2xl'
                mr={4}
                src={currentRecipe["image-url"]}
                borderRadius='md'
                boxShadow='lg'
              />
              <Box>
                <Text fontSize='lg' fontWeight='bold'>
                  Cooking Time: {currentRecipe.TotalTimeInMins} mins
                </Text>
                <Text fontSize='lg' fontWeight='bold'>
                  Rating: {currentRecipe["Recipe-rating"]}
                </Text>
                <Text fontSize='lg' fontWeight='bold'>
                  Diet Type: {currentRecipe["Diet-type"]}
                </Text>
              </Box>
              <Flex>
                <Avatar
                  size='2xl'
                  mr={2}
                  mb={2}
                  src={currentRecipe["image-url"]}
                />
                <Box mt={4}>
                  <Text>
                    <Text as={"b"}>Cooking Time: </Text>
                    {currentRecipe.TotalTimeInMins} mins
                  </Text>
                  <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    maxHeight='30px'
                    maxWidth={"30%"}
                  >
                    <Text as={"b"}>Rating: </Text>
                    <Rating rating={currentRecipe["Recipe-rating"]}></Rating>
                  </Box>
                  <Text mb={2}>
                    <Text as={"b"}>Diet Type: </Text>{" "}
                    {currentRecipe["Diet-type"]}
                  </Text>
                </Box>
              </Flex>
              <Text fontSize='lg' mb={2}>
                <Text as={"b"}>Instructions:</Text>{" "}
                {currentRecipe["TranslatedInstructions"]}
              </Text>
              <Text color='blue.500' fontSize='lg'>
                <Text color='black' as={"b"}>
                  Video URL:
                </Text>
                <Text>
                  <a
                    href={youtube_videos}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    YouTube
                  </a>
                </Text>
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <RateRecipe
              recipe={currentRecipe}
              setChange={setIsChange}
            ></RateRecipe>
            <Button colorScheme='teal' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default RecipeList;
