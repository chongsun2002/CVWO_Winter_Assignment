import * as React from "react";
import { Flex, Heading, Spacer, Input, InputGroup, InputLeftElement,
         Button, ButtonGroup, Box, LinkBox, LinkOverlay, Image, HStack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";
import { useAuth } from "./Auth"

const NavBar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <Flex minWidth='max-content' h='100px' alignItems='center' gap='2' borderBottom='1px' borderBottomColor='gray.200'>
            <LinkBox ml='5vw'>
                <HStack p='4'>
                    <Image src='logo192.png' boxSize='75px'></Image>
                    <Heading size='lg'>
                        <LinkOverlay as={ReactRouterLink} to='/'>
                            NograssforUS
                        </LinkOverlay>
                    </Heading>
                </HStack>
            </LinkBox>
            <Spacer/>
            {user == null ? (
                <ButtonGroup gap='6' mr='5vw'>
                    <Button colorScheme='teal'>
                        <ReactRouterLink to="/signup">Sign Up</ReactRouterLink>
                    </Button>
                    <Button colorScheme='teal'>
                        <ReactRouterLink to="/login">Log In</ReactRouterLink>
                    </Button>
                </ButtonGroup>
            ) : (
                <ButtonGroup gap='6' mr='10 '>
                    <Heading size='md' mt='2'>Welcome, {user.Name}</Heading>
                    <Button colorScheme='red' onClick={logout}>Log Out</Button>
                </ButtonGroup>
            )}
        </Flex>
    )
};

export default NavBar;