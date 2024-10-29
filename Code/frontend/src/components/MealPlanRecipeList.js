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
import MealPlanRecipeCard from "./MealPlanRecipeCard";

const MealPlanRecipeList = (props) => {
    const plan = []
    for(const day in props.mealPlan) {
        plan.push(<>
            <Text>{day}</Text>
            <MealPlanRecipeCard recipe={props.mealPlan[day]}></MealPlanRecipeCard>
        </>)
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
            p={5}
          >
            <SimpleGrid
              spacing={5}
              templateColumns='repeat(auto-fill, minmax(250px, 1fr))'
            >
              {plan}
            </SimpleGrid>
          </Box>
        </>
    );
};

export default MealPlanRecipeList