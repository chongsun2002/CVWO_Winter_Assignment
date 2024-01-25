import http from './AxiosAPI'
import { AxiosResponse } from 'axios'

export type Post = {
    Postid: string;
	Title: string;
	Content: string;
	Topic: string;
	Lastmodified: string;
	Isedited: boolean;
	Upvotes: number;
	Downvotes: number;
	Userid: string;
    Name: string;
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

export async function getPostById(id: string): Promise<Post> {
    const urlString = '/posts/' + id;
    try {
        const response: AxiosResponse = await http.get(urlString);
        const data: Post = response.data;
        console.log('/posts/:id response status: ', response.status);
        return data;
    } catch(error) {
        console.error('Error fetching post, ', error);
        throw error;
    }
}

export async function createPost(post: Post): Promise<Post[]> {
    try {
        const response: AxiosResponse = await http.post('/createpost', post);
        const data: Post[] = response.data;
        console.log("/createpost response status: ", response.status);
        return data;
    }
    catch(error) {
        console.error('Error creating posts: ', error);
        throw error;
    }
}

export async function editPost(userid: string, postid: string, content: string): Promise<number> {
    try {
        const response: AxiosResponse = await http.post('/editpost', {Userid: userid, Postid: postid, Content: content});
        const data: number = response.data;
        console.log("/editpost response status: ", response.status);
        return data;
    }
    catch(error) {
        console.error('Error editing post: ', error);
        throw error;
    }
}

export async function deletePost(userid: string, postid: string): Promise<number> {
    try {
        const response: AxiosResponse = await http.post('/deletepost', {Userid: userid, Postid: postid});
        const data: number = response.data;
        console.log("/deletepost response status: ", response.status);
        return data;
    }
    catch (error) {
        console.error('Error deleting post: ', error);
        throw error;
    }
}
