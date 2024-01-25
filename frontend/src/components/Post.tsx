import * as React from "react";

import { Container, Text, Flex, Button, ButtonGroup, Heading, Spacer, IconButton, useBoolean, Textarea } from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon, ArrowDownIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useParams, useNavigate } from "react-router-dom";

import { getPostById } from "../services/Posts";
import { Post, deletePost, editPost } from "../services/Posts";
import { useAuth } from "./Auth"
import { topicFormat } from "./Utility";


const PostPage: React.FC = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [isEditing, setIsEditing] = useBoolean(false);
    const [editedPost, setEditedPost] = React.useState<string>("");
    const navigate = useNavigate();
    const navigateHome = (): void => {
        navigate("/")
    }
    const idNotNull = id as string

    const [post, setPost] = React.useState<Post | null>(null);

    React.useEffect(()=> {
        const fetchData = async () => {
            try {
                const PostData = await getPostById(idNotNull);
                setPost(PostData);
            } catch(error) {
                console.error('Error fetching post: ', error);
            }
        }
        fetchData();
    }, [idNotNull]);

    if (!post) {
        return <div>Loading</div>
    }   

    const { Postid, Title, Content, Lastmodified, Isedited, Upvotes, Downvotes, Name, Topic, Userid } = post;

    const dateObject: Date = new Date(Lastmodified);
    const options: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Singapore', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const readableDateString: string = dateObject.toLocaleDateString('en-SG', options);

    const clickDeletePost = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {

        try {
            const userid = user?user.Userid : "";
            await deletePost(userid, Postid);
            navigateHome();
        }
        catch(error) {
            // Should settle auth here
            console.error('Unable to delete post')
        }
    }
    const clickEditPost = (e: React.MouseEvent<HTMLButtonElement>): void => {
        console.log("clicked")
        setIsEditing.toggle();
    }

    const onChangeEditedPost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedPost(e.target.value);
    }

    const submitEditedPost = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        const isContentError = editedPost === ""
        if (isContentError) {
            console.error("No Content!")
            return
        }
        try {
            const userid = user?user.Userid : "";
            await editPost(userid, Postid, editedPost);
            navigateHome();
        }
        catch(error) {
            console.error("unable to edit post")
        }
    }

    return (
        <Container maxWidth='100%' border='1px' borderColor='gray.200' padding='2' backgroundColor='orange.100'>
            <Container maxWidth='100%'>
                <Flex>
                    <Text size='xs' mt='3'>Posted by {Name}</Text>
                    <Spacer />
                    {Userid == user?.Userid ? (<ButtonGroup>
                        <IconButton aria-label='Edit Post' icon={<EditIcon/>} colorScheme="orange" onClick={clickEditPost}/>
                        <IconButton aria-label='Delete Post' icon={<DeleteIcon />} colorScheme="red" onClick={clickDeletePost}/>
                    </ButtonGroup>) : (<div></div>)}
                </Flex>
                <Heading size='md' mt='1.5'>{Title}</Heading>
                <Heading size='sm'>Topic: {topicFormat(Topic)}</Heading>
                {Isedited ? <Heading size='sm'>Edited at {readableDateString}</Heading> : <Heading size='sm'>Posted at {readableDateString}</Heading>}
                <Text mt='6'>{Content}</Text>
                <Flex mt='2' mb='2'>
                    <Button aria-label='Comment' leftIcon={<ChatIcon />}>
                        Comment
                    </Button>
                    <Spacer/>
                    <ButtonGroup verticalAlign='baseline'>
                        <Button aria-label='Upvote' rightIcon={<ArrowUpIcon/>} w='130px'>
                            {Upvotes.toString()} Upvotes
                        </Button>
                        <Button aria-label='Downvote' leftIcon={<ArrowDownIcon/>} w='130px'>
                            {Downvotes.toString()} Downvotes
                        </Button>
                    </ButtonGroup>
                </Flex>
            </Container>
            {isEditing ? (
                <Container maxWidth="100%">
                    <Textarea placeholder='Enter new content here: ' borderColor='green' onChange={onChangeEditedPost}></Textarea>
                    <Button mt='2' ml='auto' mr='0' onClick={submitEditedPost}>Edit Post</Button>
                </Container>
            ) 
            : (<div></div>)}
        </Container>
    )
};

export default PostPage;