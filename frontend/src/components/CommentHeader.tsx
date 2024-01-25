import * as React from "react";

import { Container, Heading, Text, Flex, Button, Spacer, ButtonGroup, IconButton, useBoolean, Textarea } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import { useAuth } from "./Auth";
import { deleteComment, editComment } from "../services/Comments";

interface CommentHeaderProps {
    commentid: string;
    content: string;
    lastmodified: string;
    isedited: Boolean;
    upvotes: Number;
    downvotes: Number;
    username: string;
    userid: string;
    postid: string;
};

const CommentHeader: React.FC<CommentHeaderProps> = ({commentid, content, lastmodified, isedited, upvotes, downvotes, username, userid, postid}) => {
    const { user } = useAuth();

    const dateObject: Date = new Date(lastmodified);
    const options: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Singapore', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const readableDateString: string = dateObject.toLocaleDateString('en-SG', options);

    const [editedComment, setEditedComment] = React.useState<string>("");
    const [isEditing, setIsEditing] = useBoolean(false);

    const onChangeEditedComment = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setEditedComment(e.target.value);
    }

    const clickEditComment = () => {
        setIsEditing.toggle();
    }

    const submitEditedComment = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        const isContentError = editedComment === ""
        if (isContentError) {
            console.error("No Content!")
            return
        }
        try {
            const userid = user?user.Userid : "";
            console.log(userid)
            console.log(commentid)
            await editComment(userid, commentid, editedComment);
        }
        catch(error) {
            console.error("unable to edit post")
        }
    }

    const clickDeleteComment = async () => {
        try {
            const userid = user?user.Userid : "";
            await deleteComment(userid, commentid);
        }
        catch(error) {
            // Should settle auth here
            console.error('Unable to delete post')
        }
    }
    return (
        <Container maxWidth='100%' border='1px' borderColor='gray.300' padding='2' backgroundColor='yellow.100'>
                <Flex>
                    <Text size='xs' mt='3'>Posted by {username}</Text>
                    <Spacer />
                    {userid == user?.Userid ? (<ButtonGroup>
                        <IconButton aria-label='Edit Post' icon={<EditIcon/>} colorScheme="orange" onClick={clickEditComment}/>
                        <IconButton aria-label='Delete Post' icon={<DeleteIcon />} colorScheme="red" onClick={clickDeleteComment}/>
                    </ButtonGroup>) : (<div></div>)}
                </Flex>
                {isedited ? <Heading size='sm'>Edited at {readableDateString}</Heading> : <Heading size='sm'>Posted at {readableDateString}</Heading>}
                <Text mt='6'>{content}</Text>
                {isEditing ? (
                    <Container maxWidth="100%" mt='2'>
                        <Textarea placeholder='Enter new content here: ' borderColor='green' onChange={onChangeEditedComment}></Textarea>
                        <Button mt='2' ml='auto' mr='0' onClick={submitEditedComment}>Edit Comment</Button>
                    </Container>
                ) 
                : (<div></div>)}
            </Container>
    )
};

export default CommentHeader;