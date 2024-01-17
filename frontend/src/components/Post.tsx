import * as React from "react";

import { Container } from "@chakra-ui/react";

import PostHeader from "./PostHeader";

interface PostProps {
    title: string;
    content: string;
    topic: string;
    lastmodified: Date;
    isedited: Boolean;
    upvotes: Number;
    downvotes: Number;
    username: string;
};



const Post: React.FC<PostProps> = ({title, content, topic, lastmodified, isedited, upvotes, downvotes, username}) => {
    return (
        <Container h='calc(100vh - 100px)' maxWidth='70%'>
            <PostHeader title={title} content={content} topic={topic} lastmodified={lastmodified} isedited={isedited} upvotes={upvotes} downvotes={downvotes} username={username}/>
        </Container>
    )
};

export default Post;