import {render, screen, cleanup, fireEvent} from "@testing-library/react"
import Form from "./../Form";

afterEach(()=>{
    cleanup();
})
test("should render the ingredient input element", ()=> {
    render(<Form />)
    const ingredientInputElement = screen.getByTestId('ingredient')
    expect(ingredientInputElement).toBeInTheDocument()
})
test("should render the email id input element", ()=> {
    render(<Form />)
    const emailInputElement = screen.getByTestId('email_id')
    expect(emailInputElement).toBeInTheDocument()
})
test("should render the cuisine input element", ()=> {
    render(<Form />)
    const cuisineInputElement = screen.getByTestId('cuisine')
    expect(cuisineInputElement).toBeInTheDocument()
})

test("Search button works as expected", ()=> {
    const handleMock = jest.fn()
    render(<Form sendFormData={handleMock} />)
    const searchRecipeButton = screen.getByTestId('submit')
    fireEvent.click(searchRecipeButton)
    expect(handleMock).toHaveBeenCalledTimes(1)
})