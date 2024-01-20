import http from './AxiosAPI'
import { AxiosResponse } from 'axios'

export type Post = {
    PostID: string;
	Title: string;
	Content: string;
	Topic: string;
	Lastmodified: string;
	Isedited: boolean;
	Upvotes: number;
	Downvotes: number;
	UserID: string;
}


export async function getPosts(topic: string, page: number = 0, postsPerPage: number = 10): Promise<Post[]> {
    try {
        const offset: number = page * postsPerPage
        const count: number = postsPerPage
        const response: AxiosResponse = await http.get('/posts', {
            params: {
                topic,
                offset,
                count,
            }
        })
        const data: Post[] = response.data;
        console.log("/posts response status: ", response.status);
        return data;
    }
    catch(error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export async function createPost(post: Post): Promise<Post[]> {
    try {
        console.log(post)
        const response = await http.post('/createpost', post);
        const data: Post[] = response.data.data;
        console.log("/createpost response status: ", response.status);
        console.log(data);
        return data;
    }
    catch(error) {
        console.error('Error creating posts: ', error);
        throw error;
    }
}

export async function editPost(post: Post): Promise<Post[]> {
    try {
        console.log(post)
        const response = await http.post('/editpost', post);
        const data: Post[] = response.data.data;
        console.log("/editpost response status: ", response.status);
        return data;
    }
    catch(error) {
        console.error('Error editing post: ', error);
        throw error;
    }
}

