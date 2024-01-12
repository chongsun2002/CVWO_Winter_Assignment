import * as React from "react"
import { Flex, Center, Heading, Spacer, Input, Button, ButtonGroup, Box } from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"

const NavBar: React.FC = () => {
    return (
        <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box p='4'>
                <Heading size='lg'>CodersOfNUS</Heading>
            </Box>
            <Spacer />
            <Input placeholder="Search Posts"></Input>
            <Spacer />
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