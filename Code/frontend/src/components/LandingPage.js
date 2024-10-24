import { Box, Button, Heading, Text, Stack } from "@chakra-ui/react";

const LandingPage = ({ onGetStarted }) => {
  return (
    <Box as='section' bg='gray.100' py={20} textAlign='center' px={10}>
      <Heading fontSize={{ base: "3xl", md: "5xl" }} color='green.600'>
        Discover & Organize Your Favorite Recipes
      </Heading>
      <Text fontSize={{ base: "md", md: "xl" }} mt={4} color='gray.600'>
        Effortlessly search, organize, and share recipes with a few clicks.
      </Text>
      <Stack
        direction={{ base: "column", sm: "row" }}
        spacing={4}
        mt={8}
        justifyContent='center'
      >
        <Button size='lg' colorScheme='green' onClick={onGetStarted}>
          Get Started
        </Button>
      </Stack>
    </Box>
  );
};

export default LandingPage;
