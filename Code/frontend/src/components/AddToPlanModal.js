import React, { useState } from "react";
import { Button, Modal,ModalBody,
    ModalCloseButton,
    ModalOverlay,
    ModalHeader,
    ModalFooter,
    ModalContent,
    Heading,
    Box,
    SimpleGrid,
    Text,
    Card,
    CardHeader,
    CardBody,
    Image,
    Select,
    Spacer
} from "@chakra-ui/react";
import Rating from "./Rating"; 
import recipeDB from "../apis/recipeDB";

const MiniRecipeCard = (props) => {
    const color = props.recipe['_id'] === props.selectedRecipe ? "lightgray" : null
    const handleClick = () => {
        props.setRecipe(props.recipe['_id'])
        console.log(props.recipe['_id'])
        console.log(color)
    }
    return <Card
          data-testid='recipeCard'
          borderRadius='md'
          boxShadow='lg'
          bgColor={color || ""}
          _hover={{
            transform: "scale(1.05)",
            bg: color || "green.100",
            transitionDuration: "0.2s",
          }}
          transition='0.2s'
          my={0}
          mb={4}
          px={1}
          onClick={() => handleClick()}
        >
          <CardHeader>
            <Heading
              data-testid='recipeName'
              size='md'
              textAlign='center'
              color='teal.600'
            >
              {props.recipe.TranslatedRecipeName}
            </Heading>
          </CardHeader>
          <CardBody py={1} px={1}>
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
          </CardBody>
        </Card>
}

const AddToPlanModal = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [day, setDay] = useState(props.day)
    const [recipeToAdd, setRecipeToAdd] = useState(null)
    const onClose = () => {
        setRecipeToAdd(null)
        setDay(props.day)
        setIsOpen(false)
    }

    const addToMealPlan = () => {
        const requestBody = {
            userName: localStorage.getItem("userName"),
            recipeID: recipeToAdd,
            weekDay: day
        }
        recipeDB.put("/recipes/mealPlan", requestBody).then((res) => {
            setIsOpen(false)
            props.updateMealPlan()
        })
    }

    const TextButton = () => {
        return <Button onClick={() => setIsOpen(true)}>Add from Bookmarks</Button>
    }
    const PlusButton = () => {
        return <Box as="button" onClick={() => setIsOpen(true)} variant="ghost" size="lg" bgColor="transparent">
            <Heading color="teal.600" _hover={{color: "black"}}>+</Heading>
        </Box>
    }
    
    return (
        <>
            {props.text ? <TextButton /> : <PlusButton />}
            <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent data-testid='addToPlanModal'>
                    <ModalHeader>Add to Meal Plan from Bookmarks</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <SimpleGrid
                        spacing={5}
                        templateColumns='repeat(auto-fill, minmax(250px, 1fr))'
                        >
                        {props.bookmarks.length !== 0 ? (
                            props.bookmarks.map((recipe) => (
                            <MiniRecipeCard
                                key={recipe.id || recipe.TranslatedRecipeName} // Use a unique identifier as key
                                recipe={recipe} setRecipe={setRecipeToAdd} selectedRecipe={recipeToAdd}
                            />
                            ))
                        ) : (
                            <Text data-testid='noResponseText' fontSize={"lg"} color={"gray"}>
                            No bookmarks available.
                            </Text>
                        )}
                        
                    </SimpleGrid>
                    <Box display="flex" flexDirection="row" alignItems="center" my={6}>
                        <Text>Add this meal to which day?</Text>
                        <Select variant="filled" placeholder="Select a day..." value={day} onChange={(e) => setDay(e.target.value)} maxWidth={["50%", "50%", "25%", "25%", "15%"]} mx={6}>
                            <option value='sunday'>Sunday</option>
                            <option value='monday'>Monday</option>
                            <option value='tuesday'>Tuesday</option>
                            <option value='wednesday'>Wednesday</option>
                            <option value='thursday'>Thursday</option>
                            <option value='friday'>Friday</option>
                            <option value='saturday'>Saturday</option>
                        </Select>
                        <Spacer />
                        <Button colorScheme="teal" onClick={() => addToMealPlan()} isDisabled={!recipeToAdd || !day}>Add to Meal Plan</Button>
                    </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddToPlanModal