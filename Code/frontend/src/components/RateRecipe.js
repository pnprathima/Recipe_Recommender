import React, { useState } from "react"
import { Image, Box, Button, Text } from "@chakra-ui/react";
import recipeDB from "../apis/recipeDB"

const RateRecipe = (props) => {
    const [rating, setRating] = useState(0);
    const [show, setShow] = useState(true)
    
    const rateRecipe = (r) => {
        const body = {
            recipeID: props.recipe['_id'],
            rating: r
        }
        recipeDB.patch("/recipes/rateRecipe", body).then(() => {
            setShow(false)
            props.setChange(true)
        })
    }

    
    var stars = []
    for(var i = 1; i < 6; i++) {
        stars.push(<Star rating={rating} index={i} key={i} set={setRating}></Star>)
    }
    if(show) {
        return <Box display="flex" flexDirection="row" alignItems="center">
            {stars}
            <Button ml="10px" onClick={() => rateRecipe(rating)}>Rate this Recipe</Button>
        </Box>
    }
    else {
        return <Box display="flex" flexDirection="row" alignItems="center" justifyContent={"start"} width={"100%"}>
            <Text>Thank you for rating!</Text>
        </Box>
    }
    
}

const Star = (props) => {
    if(props.index <= props.rating) {
        return <Image data-testid="recipeRate"
        objectFit='cover'
        width={"3%"}
        height={"3%"}
        src={require("./componentImages/Filled_star_to_rate.png")}
        mx="2px"
        onClick={() => {
            props.set(props.index)
        }}></Image>
    }
    else {
        return <Image data-testid="recipeRate"
            objectFit='cover'
            width={"3%"}
            height={"3%"}
            src={require("./componentImages/Empty_star.png")}
            mx="2px"
            onClick={() => {
                props.set(props.index)
            }}></Image>
    }
}

export default RateRecipe