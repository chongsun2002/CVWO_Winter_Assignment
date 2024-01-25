import * as React from "react";

import { Container, Text, Flex, Button, ButtonGroup, Heading, Spacer, IconButton, useBoolean, Textarea, Divider, AbsoluteCenter, Box } from "@chakra-ui/react";
import { ChatIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useParams, useNavigate } from "react-router-dom";

import { getPostById } from "../services/Posts";
import { Post, deletePost, editPost } from "../services/Posts";
import { useAuth } from "./Auth"
import { topicFormat } from "./Utility";
import { createComment, Comment } from "../services/Comments";
import CommentSection from "./CommentSection";


const PostPage: React.FC = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [isEditing, setIsEditing] = useBoolean(false);
    const [editedPost, setEditedPost] = React.useState<string>("");
    const [isCommenting, setIsCommenting] = useBoolean(false);
    const [comment, setComment] = React.useState<string>("");
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
        setIsEditing.toggle();
    }

    const onChangeEditedPost = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
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
        }
        catch(error) {
            console.error("unable to edit post")
        }
    }

    const clickComment = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setIsCommenting.toggle();
    }

    const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setComment(e.target.value);
    }

    const submitComment = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        if (!user) {
            navigate('/login');
        }
        const isCommentError = comment === "";
        if (isCommentError) {
            console.error("No Content!")
            return
        }
        try {
            const createdComment: Comment = {Commentid: "", Content: comment, Lastmodified: "", Isedited: false, Upvotes: 0, Downvotes: 0, Userid: user?.Userid ?? "", Name: user?.Name ?? "", Postid: Postid};
            await createComment(createdComment);
        } 
        catch(error) {
            console.error("Unable to create comment")
            throw error
        }
    }

    return (
        <Container maxWidth='100%' padding='0'>
            <Container maxWidth='100%'backgroundColor='orange.100' padding='2'border='1px' borderColor='gray.300'>
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
                    <Button aria-label='Comment' leftIcon={<ChatIcon />} onClick={clickComment}>
                        Comment
                    </Button>
                    <Spacer/>
                </Flex>
            </Container>
            {isEditing ? (
                <Container maxWidth="100%" mt='2'>
                    <Textarea placeholder='Enter new content here: ' borderColor='green' onChange={onChangeEditedPost}></Textarea>
                    <Button mt='2' ml='auto' mr='0' onClick={submitEditedPost}>Edit Post</Button>
                </Container>
            ) 
            : (<div></div>)}
            {isCommenting ? (
                <Container maxWidth="100%" mt='2'>
                    <Textarea placeholder='Enter comment: ' borderColor='green' onChange={onChangeComment}></Textarea>
                    <Button mt='2' ml='auto' mr='0' onClick={submitComment}>Comment</Button>
                </Container>
            ) 
            : (<div></div>)}
            <Divider borderColor='black' mb='10' mt='10'/>
            <CommentSection postid={Postid}></CommentSection>
        </Container>
    )
};

export default PostPage;