import * as React from "react";
import { useState } from "react";

import { Container, Input, Text } from "@chakra-ui/react";

interface PostsListProps {

}

const CreatePost: React.FC<PostsListProps> = () => {
    interface Post {
        Title: string;
        Content: string;
        Topic: string;
    }

    const [post, setPost] = useState<Post>({Title: "", Content: "", Topic: ""})

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedpost: Post = post;
        updatedpost.Title = e.target.value;
        setPost(updatedpost);
    }

    const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedpost: Post = post;
        updatedpost.Content = e.target.value;
        setPost(updatedpost);
    }

    const onChangeTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedpost: Post = post;
        updatedpost.Topic = e.target.value;
        setPost(updatedpost);
    }

    return (
        <Container h='calc(100vh - 100px)' maxWidth='70%'>
            <Text fontSize='xs' color='red.600'>* Required Field</Text>
            <Input placeholder='Title' mt='1'></Input>
        </Container>
    )
};

export default CreatePost;