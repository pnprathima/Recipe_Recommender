import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Login from "../Login";

// Mock props
const mockHandleLogin = jest.fn();
const mockHandleSignup = jest.fn();

afterEach(() => {
    cleanup();
});

test("should render the user name input element", () => {
    render(<Login handleLogin={mockHandleLogin} handleSignup={mockHandleSignup} />);
    const userNameInput = screen.getByPlaceholderText('User name');
    expect(userNameInput).toBeInTheDocument();
});

test("should render the password input element", () => {
    render(<Login handleLogin={mockHandleLogin} handleSignup={mockHandleSignup} />);
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toBeInTheDocument();
});

test("Login button calls handleLogin on click", () => {
    render(<Login handleLogin={mockHandleLogin} handleSignup={mockHandleSignup} />);
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    expect(mockHandleLogin).toHaveBeenCalledTimes(1);
});

test("Signup button calls handleSignup on click", () => {
    render(<Login handleLogin={mockHandleLogin} handleSignup={mockHandleSignup} />);
    const signupButton = screen.getByText('Sign up');
    fireEvent.click(signupButton);
    expect(mockHandleSignup).toHaveBeenCalledTimes(1);
});