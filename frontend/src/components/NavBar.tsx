import * as React from "react"
import { Flex, Heading, Spacer, Input, InputGroup, InputLeftElement, InputRightElement, Button, ButtonGroup, Box } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { Link as ReactRouterLink } from "react-router-dom"

const NavBar: React.FC = () => {
    return (
        <Flex minWidth='max-content' h='70px' alignItems='center' gap='2' border='1px' borderColor='gray.200'>
            <Box p='4'>
                <Heading size='lg'>NograssforUS</Heading>
            </Box>
            <InputGroup>
                <InputLeftElement>
                    <SearchIcon />
                </InputLeftElement>
                <Input placeholder="Search Posts"></Input>
            </InputGroup>
            <ButtonGroup gap='2' ml='15' mr='15'>
                <Button colorScheme='teal'>
                    <ReactRouterLink to="">Sign Up</ReactRouterLink>
                </Button>
                <Button colorScheme='teal'>
                    <ReactRouterLink to="/login">Log In</ReactRouterLink>
                </Button>
            </ButtonGroup>
        </Flex>
    )
}

export default NavBar