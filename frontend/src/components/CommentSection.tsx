import * as React from "react"

import { Container, useBoolean, Center, VStack, StackDivider } from "@chakra-ui/react"


import PostHeader from "./PostHeader";
import CommentHeader from "./CommentHeader"
import { Comment, getComments } from "../services/Comments"

interface CommentSectionProps {
    postid: string
};

const CommentSection: React.FC<CommentSectionProps> = ({postid}) => {
    // State
    const [page, setPage] = React.useState<number>(0);
    const [comments, setComments] = React.useState<Comment[]>([]);
    const [hasMore, setHasMore] = useBoolean(true);
    const [isLoading, setIsLoading] = useBoolean(false);
    const [rendered, setRendered] = useBoolean(false);
    
    const componentRef = React.useRef<HTMLDivElement | null>(null);

    const fetchComments = async (page: number) => {
        try {
            if (isLoading) {
                return;
            }
            setIsLoading.on()
            const fetchedComments: Comment[] = await getComments(postid, page, 10);
            if (fetchedComments) {
                setComments((prevComments) => [...prevComments, ...fetchedComments]);
            } else {
                setHasMore.off();
            }
        }
        catch(error) {
            console.error('Error fetching Comments: ', error);
        }
        finally {
            setIsLoading.off();
        }
    };

    const onScroll = () => {
        const component: HTMLDivElement | null = componentRef.current;
        let scrollTop: number, scrollHeight: number, clientHeight: number;
        if (component) {
            const element = component as HTMLElement;
            scrollTop = element.scrollTop
            scrollHeight = element.scrollHeight
            clientHeight = element.clientHeight
            if (scrollHeight-scrollTop-clientHeight <= 1) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    }
    React.useEffect(() => {
        if (rendered) {
            fetchComments(page);
        } else {
            setRendered.on();
        }
    }, [page, rendered]);

    React.useEffect(() => {
        const component: HTMLDivElement | null = componentRef.current;
        if (component) {
            const element = component as HTMLElement
            element.addEventListener('scroll', onScroll)
            return () => element.removeEventListener('scroll', onScroll)
        }
      }, [comments]);

    return (
        <Container h='calc(100vh - 100px)' maxWidth='100%' overflow='auto'  ref={componentRef}>
            <VStack
                divider={<StackDivider borderColor='gray.300' />}
                spacing={4}
                align='stretch'
            >
                {comments.map((item: Comment) => {
                    console.log(item);
                    return (
                        <CommentHeader commentid={item.Commentid} content={item.Content}
                        lastmodified={item.Lastmodified} isedited={item.Isedited} upvotes={item.Upvotes}
                        downvotes={item.Downvotes} username={item.Name} postid={item.Postid} userid={item.Userid}/>
                    )
                })}
                {!hasMore ? <Center margin="100">You have seen all the Comments!</Center> : null}
            </VStack>
        </Container>
    )
};

export default CommentSection;