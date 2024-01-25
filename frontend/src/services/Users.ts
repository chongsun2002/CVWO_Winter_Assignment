import http from './AxiosAPI'
import { AxiosResponse } from 'axios'

export interface createUserRequirements {
    Name: string;
    Password: string;
    Email: string
}

export interface User {
    Name: string;
    Userid: string;
}

export interface loginUserRequirements {
    Name: string;
    Password: string;
}

export async function createUser(user: createUserRequirements): Promise<User> {
    try {
        const response = await http.post('/createuser', user);
        const data: User = response.data;
        console.log("createuser: ", data)
        console.log("/createpost response status: ", response.status);
        return data;
    }
    catch(error) {
        console.error('Error creating posts: ', error);
        throw error;
    }
}

export async function loginUser(user: loginUserRequirements): Promise<User> {
    try {
        const response = await http.post('/login', user);
        const data: User = response.data;
        console.log("login: ", data)
        console.log("/login response status: ", response.status)
        return data;
    }
    catch (error) {
        console.error('Error logging in', error);
        throw error;
    }
}