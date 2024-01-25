import * as React from "react"

import { Container, useBoolean, Center, VStack, StackDivider } from "@chakra-ui/react"

import { Post, getPosts } from "../services/Posts"
import PostHeader from "./PostHeader";

interface CommentSectionProps {
    postid: string
};

const CommentSection: React.FC<CommentSectionProps> = ({postid}) => {
    // State
    const [page, setPage] = React.useState<number>(0);
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [hasMore, setHasMore] = useBoolean(true);
    const [isLoading, setIsLoading] = useBoolean(false);
    const [rendered, setRendered] = useBoolean(false);
    
    const componentRef = React.useRef<HTMLDivElement | null>(null);

    const fetchPosts = async (page: number) => {
        try {
            if (isLoading) {
                return;
            }
            setIsLoading.on()
            const fetchedPosts: Post[] = await getPosts(postid, page, 10);
            if (fetchedPosts) {
                setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
            } else {
                setHasMore.off();
            }
        }
        catch(error) {
            console.error('Error fetching posts: ', error);
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
            fetchPosts(page);
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
      }, [posts]);

    return (
        <Container h='calc(100vh - 100px)' maxWidth='100%' overflow='auto'  ref={componentRef}>
            <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'
            >
                {posts.map((item: Post) => {
                    console.log(item);
                    return (
                        <PostHeader postid={item.Postid} title={item.Title} content={item.Content} topic={item.Topic}
                        lastmodified={item.Lastmodified} isedited={item.Isedited} upvotes={item.Upvotes}
                        downvotes={item.Downvotes} username={item.Name} />
                    )
                })}
                {!hasMore ? <Center margin="100">You have seen all the posts!</Center> : null}
            </VStack>
        </Container>
    )
};

export default CommentSection;