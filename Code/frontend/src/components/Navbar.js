'use client'

import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
  Image,
  Link
} from '@chakra-ui/react'


// interface Props {
//   children: React.ReactNode
// }

const NavLink = (props) => {
  const { children } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}

export default function Nav(props) {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleBookMarks =()=> {
    props.handleBookMarks();
  }
  const handleLogout = ()=> {
    console.log("logged out")
    props.handleLogout();
  }
  
  return (
    <>
      <Box color={"black"} mb={5}  bg={"purple"} px={5}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Link href="/" pl={10}> {/* Link to your homepage */}
            <Image src="/newlogo.png" alt="Logo" boxSize="50px" />
          </Link>
          <Box pl={10}><Heading size={"md"} color={"white"}>Saveurs Sélection</Heading></Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
            <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://i.redd.it/fcy75bgri5u41.jpg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'xl'}
                      src={'https://i.redd.it/fcy75bgri5u41.jpg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{localStorage.getItem("userName")}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={handleBookMarks}>Bookmarks</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}