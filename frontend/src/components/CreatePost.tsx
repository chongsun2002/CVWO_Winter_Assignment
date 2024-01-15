import * as React from "react"

import { Container, Center } from "@chakra-ui/react"

interface PostsListProps {
    topic: string;
}

const CreatePost: React.FC<PostsListProps> = ({topic}) => {
    return (
        <Container h='calc(100vh - 100px)'>
            <Center>Sorry! The page "{topic}" you have clicked on is still under development!</Center>
        </Container>
    )
}

export default CreatePost