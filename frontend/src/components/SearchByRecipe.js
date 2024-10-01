/* MIT License

Copyright (c) 2023 Pannaga Rao, Harshitha, Prathima, Karthik  */

import { Box, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useState } from "react";
import recipeDB from "../apis/recipeDB";

const SearchByRecipe = (props) => {
    const [recipeName, setRecipeName] = useState("");
    const [recipes, setRecipes] = useState([])
    const handleNameChange = (e) => {
        e.preventDefault();
        setRecipeName(e.target.value)
    }
    const handleSearchByRecipeClick = (e) => {
        e.preventDefault();
        // console.log(recipeName)
        props.sendRecipeData(recipeName)
    }
    return (
        <>
            <Box mr={10} ml={10}>
                <InputGroup size='md'>
                    <Input  
                        pr='4.5rem'
                        placeholder='Enter Recipe Name'
                        onChange={handleNameChange}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleSearchByRecipeClick}>
                            Search
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Box>
        </>
    )
}

export default SearchByRecipe;