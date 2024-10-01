/* MIT License

Copyright (c) 2023 Pannaga Rao, Harshitha, Prathima, Karthik  */

import { useEffect, useState } from "react";
import BookMarksRecipeList from "./BookMarksRecipeList";
import { Heading, Flex, Button, Spacer } from "@chakra-ui/react"
import recipeDB from "../apis/recipeDB";

const UserProfile = (props) => {
    useEffect(() => {
        const bks = recipeDB.get("/recipes/getBookmarks", {
            params: {
                userName: localStorage.getItem("userName")
            }
        })
        bks.then(res => {
            if (res.data.bookmarks) {
                console.log(res.data.bookmarks)
                setBookmarks(res.data.bookmarks)
            }
        })
    }, [])
    const [bookmarks, setBookmarks] = useState([])
    const handleClick = () => {
        props.handleProfileView()
    }
    return (
        <>
            <Flex >
                <Heading size={"md"} ml={10} mr={10}>Saved Recipes for {props.user.userName}</Heading>
                <Spacer />
                <Button onClick={handleClick} mr={10}>Go to HomePage</Button>
            </Flex>
            {bookmarks.length === 0 ?
                <></>
                :
                <BookMarksRecipeList recipes={bookmarks} />
            }
        </>
    )
}

export default UserProfile;