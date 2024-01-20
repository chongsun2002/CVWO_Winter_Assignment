import * as React from "react"

import { useState } from "react"
import { Container, useBoolean } from "@chakra-ui/react"

import { Post, getPosts } from "../services/Posts"
import PostHeader from "./PostHeader";

interface PostsListProps {
    topic: string;
};

const PostsList: React.FC<PostsListProps> = ({topic}) => {
    // State
    const [page, setPage] = useState<number>(0);
    const [posts, setPosts] = useState<Post[]>([]);
    const [hasMore, setHasMore] = useBoolean(true);
    const [isLoading, setIsLoading] = useBoolean(false);

    const fetchPosts = async (page: number) => {
        try {
            const fetchedPosts = await getPosts(topic, page, 10);
            console.log("test", fetchedPosts);
            setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
        }
        catch(error) {
            console.error('Error fetching posts: ', error);
        }
    };

    React.useEffect(() => {fetchPosts(page);}, [page])

    const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
            fetchPosts(page);
            setPage(page + 1);
        }
    }

    React.useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
      }, [posts])

    return (
        <Container h='calc(100vh - 100px)' maxWidth='100%' overflow='auto'>
            <ul>
                {posts.map((item: Post, index: number) => {
                    return (
                            <PostHeader title={item.Title} content={item.Content} topic={item.Topic}
                            lastmodified={item.Lastmodified} isedited={item.Isedited} upvotes={item.Upvotes}
                                downvotes={item.Downvotes} username="cs2002"></PostHeader>
                    )
                })}
            </ul>
        </Container>
    )
};

export default PostsList;