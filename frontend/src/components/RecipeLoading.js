import { Box, Text, Wrap, Center, SkeletonCircle, SkeletonText } from "@chakra-ui/react"

const RecipeLoading = ()=> {
    return (
        <>
          <Box ml="30px" mt="20px" h="500px" w="70%" borderRadius="lg" overflowX="hidden" overflowY="scroll" >
            <Box m="10px" mt="10px">
            <Wrap justify="left" spacing="15px">
            {Array(4)
              .fill("")
              .map((_, i) => (
                
                  <Box boxShadow="lg" borderWidth="1px" borderRadius="lg" overflow="hidden"
                    padding="6" w={"200px"} bg="white">
                    <Center><SkeletonCircle size="20" /></Center>
                    <SkeletonText w={115} mt="4" noOfLines={6} spacing="4" />
                  </Box>
              ))}
              </Wrap>
              </Box>
            </Box>
          </>
    )
}
export default RecipeLoading;