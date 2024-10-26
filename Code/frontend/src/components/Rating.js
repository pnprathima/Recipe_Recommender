import React from "react";
import { Image, Box } from "@chakra-ui/react";

const Rating = (props) => {
    var rate = Math.floor(Number(props.rating))
    var partial = Number(props.rating) - rate
    var stars = []
    for(var i = 0; i < rate; i++) {
        stars.push(<Image data-testid="recipeRate"
        objectFit='cover'
        width={"10%"}
        height={"10%"}
        src={require("./componentImages/Filled_star.png")}
        key={i}
        mx="2px"></Image>)
    }
    if(partial > 0.25 && partial < 0.75) {
        stars.push(<Image data-testid="recipeRate"
            objectFit='cover'
            width={"10%"}
            height={"10%"}
            src={require("./componentImages/Half_star.png")}
            key={stars.length}
            mx="2px"></Image>)
    }
    while(stars.length < 5) {
        stars.push(<Image data-testid="recipeRate"
            objectFit='cover'
            width={"10%"}
            height={"10%"}
            src={require("./componentImages/Empty_star.png")}
            key={stars.length}
            mx="2px"></Image>)
    }
    return stars
    
}

export default Rating