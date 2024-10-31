import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";

const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const toast = useToast();

  const handleUserName = (e) => setUserName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;
      if (isLoginMode) {
        // Call the login function passed as a prop
        result = await props.handleLogin(userName, password);
      } else {
        // Call the signup function passed as a prop
        result = await props.handleSignup(userName, password);
      }

      // Check the result of login/signup
      if (result.success) {
        toast({
          title: isLoginMode ? "Login successful" : "Signup successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Optionally reset the form or perform other actions
        setUserName("");
        setPassword("");
        props.onClose(); // Close modal on successful login/signup
      } else {
        toast({
          title: "Error",
          description: result.message || "An unexpected error occurred.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {}
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    // Reset fields when toggling
    setUserName("");
    setPassword("");
  };

  return (
    <>
      <Modal isOpen={true} onClose={props.onClose}>
        {" "}
        {/* Pass onClose prop */}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isLoginMode ? "LOG IN" : "SIGN UP"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>User Name</FormLabel>
              <Input
                onChange={handleUserName}
                placeholder='User name'
                value={userName}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                onChange={handlePassword}
                placeholder='Password'
                value={password}
              />
            </FormControl>

            <Text mt={4} fontSize='sm'>
              {isLoginMode ? (
                <>
                  New user?{" "}
                  <Link color='blue.500' onClick={toggleMode}>
                    Sign Up here
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link color='blue.500' onClick={toggleMode}>
                    Log in here
                  </Link>
                </>
              )}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleSubmit}
              colorScheme='blue'
              mr={3}
              disabled={!userName || !password}
            >
              {isLoginMode ? "Login" : "Sign up"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
