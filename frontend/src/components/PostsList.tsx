import * as React from "react"

import { Container, Center } from "@chakra-ui/react"

import Post from "./Post"

interface PostsListProps {
    topic: string
}

const p = {title: 'higher education sucks', content:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
                topic: 'academics', lastmodified: new Date(Date.now()), isedited: false, upvotes: 5, downvotes: 2,
                username: 'cs2002'}

const PostsList: React.FC<PostsListProps> = ({topic}) => {
    return (
        <Container h='calc(100vh - 100px)' maxWidth='100%' overflow='auto'>
            <Post title={p.title} content={p.content} topic={p.topic} lastmodified={p.lastmodified} isedited={p.isedited} upvotes={p.upvotes} downvotes={p.downvotes} username={p.username}/>
        </Container>
    )
}

export default PostsList