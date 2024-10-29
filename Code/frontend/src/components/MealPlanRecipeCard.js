import React from "react";
import {
  Card,
  CardHeader,
  Heading,
  Text,
  CardBody,
  Image,
  Tag,
} from "@chakra-ui/react";


const MealPlanRecipeCard = (props) => {
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
          mb={4}
          p={4}
        >
          <CardHeader>
            <Heading
              data-testid='recipeName'
              size='md'
              textAlign='center'
              color='teal.600'
              cursor='pointer' // Add pointer cursor to indicate it's clickable
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
              as='a'
              colorScheme='red'
              variant='solid'
              cursor='pointer'
              mt={2}
            >
              Remove Bookmark
            </Tag>
          </CardBody>
        </Card>
    );
};

export default MealPlanRecipeCard