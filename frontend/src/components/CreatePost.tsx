import * as React from "react";
import { useState } from "react";

import { Container, Input, Text, Textarea, Select, Button } from "@chakra-ui/react";

import { user } from "../services/Authentication"
import { createPost, Post } from "../services/Posts"
import { useNavigate } from "react-router-dom";

interface PostsListProps {

}

const CreatePost: React.FC<PostsListProps> = () => {
    const emptyPost: Post = {PostID: "", Title: "", Content: "", Topic: "", Lastmodified: "", Isedited: false, Upvotes: 0, Downvotes: 0, UserID: user.Userid};
    const [post, setPost] = useState<Post>(emptyPost);

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedpost: Post = post;
        updatedpost.Title = e.target.value;
        setPost(updatedpost);
    }

    const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedpost: Post = post;
        updatedpost.Content = e.target.value;
        setPost(updatedpost);
    }

    const onChangeTopic = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const updatedpost: Post = post;
        updatedpost.Topic = e.target.value;
        setPost(updatedpost);
    }

    const navigate = useNavigate();
    const navigateHome = (): void => {
        navigate("/")
    }

    const submitPost = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const isTitleError = post.Title === ""
        const isContentError = post.Content === ""
        const isTopicError = post.Topic ===  ""

        if (isTitleError) {
            console.log("No Title!")
            return
        }
        if (isContentError) {
            console.log("No Content!")
            return
        }
        if (isTopicError) {
            console.log("No Topic!")
            return
        }
        const response: Promise<Post[]> = createPost(post);
        console.log(response)
        setPost(emptyPost);
        navigateHome();
    }

    return (
        <Container h='calc(100vh - 100px)' maxWidth='70%'>
            <Text fontSize='xs' color='red.600' mt='8'>* Required Field</Text>
            <Input placeholder='Title' mt='1' onChange={onChangeTitle}></Input>
            <Text fontSize='xs' color='red.600' mt='10'>* Required Field</Text>
            <Textarea placeholder='Post Content' height='50%' mt='1' onChange={onChangeContent}></Textarea>
            <Select placeholder='Select Topic' mt='5' onChange={onChangeTopic}>
                <option value='academics'>Academics</option>
                <option value='activitiesevents'>Activities & Events</option>
                <option value='clubsocs'>Clubs & Societies</option>
                <option value='recruitment'>Recruitment</option>
                <option value='social'>Social</option>
                <option value='others'>Others</option>
            </Select>
            <Button float='right' mt='5' onClick={submitPost}>Post</Button>
        </Container>
    )
};

export default CreatePost;