import * as React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Container, Heading, List, ListItem } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';

const SideBar: React.FC = () => {
    return (
        <Container borderRight='1px' borderRightColor='gray.200' p='8' h='calc(100vh - 100px)'>
            <Heading size='sm' ml='2.5vw'>
                Topics
            </Heading>
            <List spacing='3' mt='5' ml='2.5vw'>
                <ListItem>
                    <ChakraLink as={ReactRouterLink} to='/posts/academics'>Academics</ChakraLink>
                </ListItem>
                <ListItem>
                    <ChakraLink as={ReactRouterLink} to='/posts/activitiesevents'>Activities & Events</ChakraLink>
                </ListItem>
                <ListItem>
                    <ChakraLink as={ReactRouterLink} to='/posts/clubsocs'>Clubs & Societies</ChakraLink>
                </ListItem>
                <ListItem>
                    <ChakraLink as={ReactRouterLink} to='/posts/recruitment'>Recruitment</ChakraLink>
                </ListItem>
                <ListItem>
                    <ChakraLink as={ReactRouterLink} to='/posts/social'>Social</ChakraLink>
                </ListItem>
                <ListItem>
                    <ChakraLink as={ReactRouterLink} to='/posts/others'>Others</ChakraLink>
                </ListItem>
            </List>
        </Container>
    )
};

export default SideBar;