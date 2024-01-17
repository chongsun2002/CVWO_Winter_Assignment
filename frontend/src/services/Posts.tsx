import http from './AxiosAPI'
import axios, { AxiosResponse, AxiosError } from 'axios'

type Post = {
    Postid: string;
	Title: string;
	Content: string;
	Topic: string;
	Lastmodified: string;
	Isedited: boolean;
	Upvotes: number;
	Downvotes: number;
	Userid: string;
}

type GetPostsResponse = {
    data: Post[];
}

class PostsDataService {
    async getPosts(topic: string, postid: string = "", page: number = 0, postsPerPage: number = 10): Promise<Post[]> {
        try {
            const offset: number = page * postsPerPage
            const count: number = postsPerPage
            const response: AxiosResponse<GetPostsResponse> = await http.get('/posts', {
                params: {
                    topic,
                    postid,
                    offset,
                    count,
                }
            })
            const data: Post[] = response.data.data;
            const status: number = response.status
            console.log("/posts response status: ", status)

            return data
        }
        catch(error) {
            console.error('Error fetching posts:', error)
            throw error
        }
    }
}

export default PostsDataService