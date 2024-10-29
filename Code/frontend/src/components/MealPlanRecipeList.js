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
  Heading
} from "@chakra-ui/react";
import Rating from "./Rating";
import MealPlanRecipeCard from "./MealPlanRecipeCard";
import AddToPlanModal from "./AddToPlanModal";

const MealPlanRecipeList = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentRecipe, setCurrentRecipe] = useState({});
    const youtubeVideosURL = `https://www.youtube.com/results?search_query=${currentRecipe["TranslatedRecipeName"]}`;

    const handleViewRecipe = (data) => {
        setIsOpen(true);
        setCurrentRecipe(data);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    const plan = []
    const today = new Date()
    var weekDay = 0
    for(const day in props.mealPlan) {
        const color = weekDay === today.getDay() ? "lightgray" : ""
        plan.push(<Box bgColor={color} p="10px" maxWidth="100%">
            <Heading
              data-testid='mealPlanDay'
              size='md'
              textAlign='center'
              mb="15px"
            >{day.toUpperCase()}</Heading>
            { props.mealPlan[day] ? 
                (<MealPlanRecipeCard recipe={props.mealPlan[day]} handler={handleViewRecipe} updateMealPlan={props.updateMealPlan} day={day}></MealPlanRecipeCard>) : 
                (<Box justifySelf="center" mt={5}>
                    <AddToPlanModal day={day} text={false} bookmarks={props.bookmarks} updateMealPlan={props.updateMealPlan}></AddToPlanModal>
                </Box>)}
        </Box>)
        weekDay++
    }

    return (
        <>
          <Box
            borderRadius={"lg"}
            border='1px'
            boxShadow={"10px"}
            borderColor={"gray.100"}
            fontFamily='sans-serif'
            m={10}
            width={"94%"}
            p={1}
            justifySelf={"center"}
          >
            <SimpleGrid
              spacing={1}
              //templateColumns='repeat(auto-fill, minmax(14%, 1fr))'
              templateColumns={["1fr", "1fr", "1fr", "14% 14% 14% 14% 14% 14% 14%"]}
              justifyContent="center"
            >
              {plan}
            </SimpleGrid>
          </Box>
            <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent data-testid='recipeModal'>
                <ModalHeader>{currentRecipe.TranslatedRecipeName}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
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
                        <Box display="flex" flexDirection="row" alignItems='center' maxHeight='30px' maxWidth={"30%"}>
                        <Text as={"b"}>Rating: </Text>{" "}
                        {/* {currentRecipe["Recipe-rating"]} */}
                        <Rating rating={currentRecipe["Recipe-rating"]}></Rating>
                        </Box>
                        <Text mb={2}>
                        <Text as={"b"}>Diet Type: </Text> {currentRecipe["Diet-type"]}
                        </Text>
                    </Box>
                    </Flex>
                    <Text>
                    <Text as={"b"}>Instructions: </Text>{" "}
                    {currentRecipe["TranslatedInstructions"]}
                    </Text>
                    <Text color={"blue"}>
                    <Text color={"black"} as={"b"}>
                        Video URL:{" "}
                    </Text>
                    <a
                        href={youtubeVideosURL}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Youtube
                    </a>
                    </Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='teal' mr={3} onClick={onClose}>
                    Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default MealPlanRecipeList