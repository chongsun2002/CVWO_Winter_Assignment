import http from './AxiosAPI'
import { AxiosResponse } from 'axios'

export type Comment = {
    Commentid: string;
	Content: string;
	Lastmodified: string;
	Isedited: boolean;
	Upvotes: number;
	Downvotes: number;
	Userid: string;
    Postid: string;
    Name: string;
}


export async function getComments(postid: string, page: number = 0, postsPerPage: number = 10): Promise<Comment[]> {
    try {
        const offset: number = page * postsPerPage
        const count: number = postsPerPage
        const urlString: string = '/comments/' + postid
        const response: AxiosResponse = await http.get(urlString, {
            params: {
                offset,
                count,
            }
        })
        const data: Comment[] = response.data;
        console.log("/comments response status: ", response.status);
        return data;
    }
    catch(error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
}

export async function createComment(comment: Comment): Promise<Comment[]> {
    try {
        const response: AxiosResponse = await http.post('/createcomment', comment);
        const data: Comment[] = response.data;
        console.log("/createpost response status: ", response.status);
        return data;
    }
    catch(error) {
        console.error('Error creating comment: ', error);
        throw error;
    }
}

export async function editComment(userid: string, commentid: string, content: string): Promise<number> {
    try {
        console.log("here", userid)
        console.log(commentid, "here");
        const response: AxiosResponse = await http.post('/editcomment', {Userid: userid, Commentid: commentid, Content: content});
        const data: number = response.data;
        console.log("/editcomment response status: ", response.status);
        return data;
    }
    catch(error) {
        console.error('Error editing comment: ', error);
        throw error;
    }
}

export async function deleteComment(userid: string, commentid: string): Promise<number> {
    try {
        const response: AxiosResponse = await http.post('/deletecomment', {Userid: userid, Commentid: commentid});
        const data: number = response.data;
        console.log("/deletecomment response status: ", response.status);
        return data;
    }
    catch (error) {
        console.error('Error deleting comment: ', error);
        throw error;
    }
}
