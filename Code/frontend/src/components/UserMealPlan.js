import { useEffect, useState } from "react";
import { Heading, Flex, Button, Spacer } from "@chakra-ui/react"
import recipeDB from "../apis/recipeDB";
import MealPlanRecipeList from "./MealPlanRecipeList";
import AddToPlanModal from "./AddToPlanModal";

const UserMealPlan = (props) => {
    const [mealPlan, setMealPlan] = useState({})
    const [bookmarks, setBookmarks] = useState([])
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        const plan = recipeDB.get("/recipes/mealPlan", {
            params: {
                userName: localStorage.getItem("userName")
            }
        })
        plan.then(res => {
            console.log(res)
            if (res.data) {
                setMealPlan(res.data)
            }
        })
        const bks = recipeDB.get("/recipes/getBookmarks", {
            params: {
                userName: localStorage.getItem("userName")
            }
        })
        bks.then(res => {
            if (res.data) {
                console.log(res.data)
                setBookmarks(res.data.bookmarks)
            }
        })
    }, [refresh])
    const handleClick = () => {
        props.handleProfileView()
    }
    const updateMealPlan = () => {
        setRefresh(!refresh)
    }
    return (
        <>
            <Flex >
                <Heading size={"md"} ml={10} mr={10}>Meal Plan for {props.user.userName}</Heading>
                <AddToPlanModal day={""} text={true} bookmarks={bookmarks} updateMealPlan={updateMealPlan}></AddToPlanModal>
                <Spacer />
                <Button onClick={handleClick} mr={10}>Go to HomePage</Button>
            </Flex>
            <MealPlanRecipeList mealPlan={mealPlan} bookmarks={bookmarks} updateMealPlan={updateMealPlan}/>
        </>
    )
}

export default UserMealPlan;