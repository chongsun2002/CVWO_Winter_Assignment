import * as React from "react";

import { Container, InputGroup, Input, InputRightElement, useBoolean, Button, Stack, Center } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { loginUserRequirements, User, loginUser } from "../services/Users"
import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";

interface PasswordInputProps {
    placeholder: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const PasswordInput: React.FC<PasswordInputProps> = ({placeholder, onChange}) => {
    const [show, setShow] = useBoolean(false);
    const handleClick: () => void = () => {
        setShow.toggle()
    };

    return (
        <InputGroup>
            <Input 
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder={placeholder}
                onChange={onChange}
            />
            <InputRightElement>
                <Button h='2.35rem' size='sm' onClick={handleClick}>
                    {show ? <ViewIcon /> : <ViewOffIcon/>}
                </Button>
            </InputRightElement>
        </InputGroup>
    )
};

const LoginPage = () => {
    const emptyLoginUser: loginUserRequirements = {Name: "", Password: ""};
    const [user, setUser] = React.useState<loginUserRequirements>(emptyLoginUser);
    const { login } = useAuth();

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updateduser: loginUserRequirements = user;
        updateduser.Name = e.target.value;
        setUser(updateduser);
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updateduser: loginUserRequirements = user;
        updateduser.Password = e.target.value;
        setUser(updateduser);
    }

    const navigate = useNavigate();
    const navigateHome = (): void => {
        navigate("/");
    };

    const submitLoginUser = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        const isNameError = user.Name === "";
        const isPasswordError = (user.Password === "")
        if (isNameError) {
            console.error("No Name!");
        }
        if (isPasswordError) {
            console.error("Invalid Password/Passwords don't match");
        }
        let response: User;
        try {
            response = await loginUser(user);
            login(response);
            setUser(emptyLoginUser);
            navigateHome();
        }
        catch (error) {
            console.error("Login Failed");
        }
    };
    return (
        <Container h='calc(100vh - 100px)'>
            <Center h='100%'>
                <Stack spacing='5'>
                    <InputGroup>
                        <Input placeholder="Enter username" onChange={onChangeName}/>
                    </InputGroup>
                    <PasswordInput placeholder="Enter password" onChange={onChangePassword}/>
                    <Button onClick={submitLoginUser}>Log In</Button>
                    <Button>
                        <ReactRouterLink to="/signup">Sign Up Here!</ReactRouterLink>
                    </Button>
                    <ChakraLink as={ReactRouterLink} to='/resetpassword'>
                        <Center>Forgot Password? Click here to reset!</Center>
                    </ChakraLink>
                </Stack>
            </Center>
        </Container>
    )
};

export default LoginPage;