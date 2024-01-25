import * as React from "react";

import { Container, Heading, Text, Flex, Button, Spacer, ButtonGroup, LinkOverlay, LinkBox } from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom"
import { topicFormat } from "./Utility";

interface CommentProps {
    postid: string;
    title: string;
    content: string;
    topic: string;
    lastmodified: string;
    isedited: Boolean;
    upvotes: Number;
    downvotes: Number;
    username: string;
};

const PostHeader: React.FC<CommentProps> = ({postid, title, content, topic, lastmodified, isedited, upvotes, downvotes, username}) => {
    const dateObject: Date = new Date(lastmodified);
    const options: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Singapore', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const readableDateString: string = dateObject.toLocaleDateString('en-SG', options);


    return (
        <Container maxWidth='100%' border='1px' borderColor='gray.200' padding='2'>
            <LinkBox backgroundColor='orange.100' padding='2'>
                <LinkOverlay as={ReactRouterLink} to={'/posts/' + postid}>
                    <Text size='xs' mt='3'>Posted by {username}</Text>
                    <Heading size='lg' mt='1.5'>{title}</Heading>
                    <Heading size='sm'>Topic: {topicFormat(topic)}</Heading>
                    {isedited ? <Heading size='sm'>Edited at {readableDateString}</Heading> : <Heading size='sm'>Posted at {readableDateString}</Heading>}
                    <Text mt='6'>{content}</Text>
                </LinkOverlay>
            </LinkBox>
            <Flex mt='2' mb='2'>
                <Button aria-label='Comment' leftIcon={<ChatIcon />}>
                    <ReactRouterLink to={"/posts/" + postid}>Comment</ReactRouterLink>
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

export default Comment;