import * as React from "react";

import { Container, Heading, Text, Flex, Button, Spacer, ButtonGroup } from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";

interface PostHeaderProps {
    title: string;
    content: string;
    topic: string;
    lastmodified: Date;
    isedited: Boolean;
    upvotes: Number;
    downvotes: Number;
    username: string;
};

const PostHeader: React.FC<PostHeaderProps> = ({title, content, topic, lastmodified, isedited, upvotes, downvotes, username}) => {
    return (
        <Container maxWidth='100%' border='1px' borderColor='gray.200' mt='4'>
            <Text size='xs' mt='3'>Posted by {username}</Text>
            <Heading size='md'mt='1.5'>{title}</Heading>
            <Text mt='6'>{content}</Text>
            <Flex mt='4' mb='2'>
                <Button aria-label='Comment' leftIcon={<ChatIcon />}>
                    Comment
                </Button>
                <Spacer/>
                <ButtonGroup verticalAlign='baseline'>
                    <Button aria-label='Upvote' rightIcon={<ArrowUpIcon/>} w='130px'>
                        {upvotes.toString()} Upvotes
                    </Button>
                    <Button aria-label='Downvote' leftIcon={<ArrowDownIcon/>} w='130px'>
                        {downvotes.toString()} Downvotes
                    </Button>
                </ButtonGroup>
            </Flex>
        </Container>
    )
};

export default PostHeader;