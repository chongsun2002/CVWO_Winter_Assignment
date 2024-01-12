import * as React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { Container, Heading, List, ListItem } from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react'

const SideBar: React.FC = () => {
    return (
        <Container>
            <Heading size='sm'>
                Topics
            </Heading>
            <List spacing={3} mt={5}>
                <ListItem>
                    <ChakraLink as={ReactRouterLink} to='/Academics'>Academics</ChakraLink>
                </ListItem>
                <ListItem>
                    <ChakraLink as={ReactRouterLink} to='/ActivitiesEvents'>Activities & Events</ChakraLink>
                </ListItem>
                <ListItem>
                    <ChakraLink as={ReactRouterLink} to='/ClubSocs'>Clubs & Societies</ChakraLink>
                </ListItem>
                <ListItem>
                    <ChakraLink as={ReactRouterLink} to='/Recruitment'>Recruitment</ChakraLink>
                </ListItem>
                <ListItem>
                    <ChakraLink as={ReactRouterLink} to='/Others'>Others</ChakraLink>
                </ListItem>
                <ListItem>
                    <ChakraLink as={ReactRouterLink} to='/Social'>Social</ChakraLink>
                </ListItem>
            </List>
        </Container>
    )
}

export default SideBar