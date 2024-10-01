import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import RecipeList from "../RecipeList";

const recipes=[
    {
        TranslatedRecipeName: "Spicy Tomato Rice (Recipe)",
        TotalTimeInMins: 15,
        'Recipe-rating':2,
        'Diet-type': "Vegan", 
        'image-url': "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/b.yojana-gmail.com/Spicy_Thakkali_Rice_Tomato_Pulihora-1_edited.jpg",
        TranslatedInstructions: "To make tomato puliogere, first cut the tomatoes.\r\nNow put in a mixer grinder and puree it.\r\nNow heat oil in a pan.\r\nAfter the oil is hot, add chana dal, urad dal, cashew and let it cook for 10 to 20 seconds.\r\nAfter 10 to 20 seconds, add cumin seeds, mustard seeds, green chillies, dry red chillies and curry leaves.\r\nAfter 30 seconds, add tomato puree to it and mix.\r\nAdd BC Belle Bhat powder, salt and mix it.\r\nAllow to cook for 7 to 8 minutes and then turn off the gas.\r\nTake it out in a bowl, add cooked rice and mix it.\r\nServe hot.\r\nServe tomato puliogre with tomato cucumber raita and papad for dinner.",
        youtube_videos: "https://www.youtube.com/results?search_query=Spicy Tomato Rice (Recipe)"
    }
]

const emptyRecipes=[]

test("should render recipe card name", ()=>{
    render(<RecipeList recipes={recipes} />)
    const recipeNameElement = screen.getByTestId('recipeName')
    expect(recipeNameElement).toBeInTheDocument()
    expect(recipeNameElement).toHaveTextContent(recipes[0].TranslatedRecipeName)
})

test("should render recipe card time", ()=>{
    render(<RecipeList recipes={recipes} />)
    const recipeTimeElement = screen.getByTestId('time')
    expect(recipeTimeElement).toBeInTheDocument()
    expect(recipeTimeElement).toHaveTextContent(recipes[0].TotalTimeInMins)

})

test("should render recipe card rating", ()=>{
    render(<RecipeList recipes={recipes} />)
    const recipeRatingElement = screen.getByTestId('rating')
    expect(recipeRatingElement).toBeInTheDocument()
    expect(recipeRatingElement).toHaveTextContent(recipes[0]['Recipe-rating'])

})

test("should render recipe card diet", ()=>{
    render(<RecipeList recipes={recipes} />)
    const dietElement = screen.getByTestId('diet')
    expect(dietElement).toBeInTheDocument()
    expect(dietElement).toHaveTextContent(recipes[0]['Diet-type'])

})

test("should render recipe card image", ()=>{
    render(<RecipeList recipes={recipes} />)
    const imageElement = screen.getByTestId('recipeImg')
    expect(imageElement).toBeInTheDocument()
})

test("should not render recipe cards", ()=>{
    render(<RecipeList recipes={emptyRecipes} />)
    const noResponseElement = screen.getByTestId('noResponseText')
    expect(noResponseElement).toBeInTheDocument()
    expect(noResponseElement).toHaveTextContent("Searching for a recipe?")
})

test("should render recipe details modal on click", ()=>{
    render(<RecipeList recipes={recipes} />)
    const cardElement = screen.getByTestId('recipeCard')
    expect(cardElement).toBeInTheDocument()
    fireEvent.click(cardElement)
    const modalElement = screen.getByTestId('recipeModal')
    expect(modalElement).toBeInTheDocument()
})