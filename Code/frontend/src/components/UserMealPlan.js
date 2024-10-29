import { useEffect, useState } from "react";
import { Heading, Flex, Button, Spacer } from "@chakra-ui/react"
import recipeDB from "../apis/recipeDB";
import MealPlanRecipeList from "./MealPlanRecipeList";

const UserMealPlan = (props) => {
    useEffect(() => {
        const plan = recipeDB.get("/recipes/mealPlan", {
            params: {
                userName: localStorage.getItem("userName")
            }
        })
        plan.then(res => {
            console.log(res)
            if (res.data) {
                console.log(res.data)
                setMealPlan(res.data)
            }
        })
    }, [])
    const [mealPlan, setMealPlan] = useState({})
    const handleClick = () => {
        props.handleProfileView()
    }
    return (
        <>
            <Flex >
                <Heading size={"md"} ml={10} mr={10}>Meal Plan for {props.user.userName}</Heading>
                <Spacer />
                <Button onClick={handleClick} mr={10}>Go to HomePage</Button>
            </Flex>
            {mealPlan.length === 0 ?
                <></>
                :
                <MealPlanRecipeList mealPlan={mealPlan} />
            }
        </>
    )
}

export default UserMealPlan;