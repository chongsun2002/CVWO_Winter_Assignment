import * as React from "react";

import { Container, InputGroup, Input, InputLeftElement, InputRightElement, useBoolean, Button, Stack, Center } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom"

import { createUser, createUserRequirements, User } from "../services/Users"

interface PasswordInputProps {
    placeholder: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder, onChange }) => {
    const [show, setShow] = useBoolean(false);
    const handleClick: () => void = () => {
        setShow.toggle();
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

const SignupPage = () => {
    const emptyUser: createUserRequirements = {Name: "", Password: "", Email: ""};
    const [user, setUser] = React.useState<createUserRequirements>(emptyUser);
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updateduser: createUserRequirements = user;
        updateduser.Email = e.target.value;
        setUser(updateduser);
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updateduser: createUserRequirements = user;
        updateduser.Name = e.target.value;
        setUser(updateduser);
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updateduser: createUserRequirements = user;
        updateduser.Password = e.target.value;
        setUser(updateduser);
    }

    const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }

    const navigate = useNavigate();
    const navigateHome = (): void => {
        navigate("/");
    };

    const submitCreateUser = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        const isEmailError = user.Email === "";
        const isNameError = user.Name === "";
        const isPasswordError = (user.Password === "") || (user.Password != confirmPassword)
        if (isEmailError) {
            console.error("No Email!");
        } 
        if (isNameError) {
            console.error("No Name!");
        }
        if (isPasswordError) {
            console.error("Invalid Password/Passwords don't match");
        }
        let response: User;
        try {
            response = await createUser(user);
            setUser(emptyUser);
            navigateHome();
        }
        catch (error) {
            console.error("Unable to create user");
        }
    };

    return (
        <Container h='calc(100vh - 100px)' >
            <Center h='100%'>
                <Stack spacing='5'>
                    <Input placeholder="Enter email" onChange={onChangeEmail}/>
                    <Input placeholder="Enter username" onChange={onChangeName}/>
                    <PasswordInput placeholder="Enter password" onChange={onChangePassword}/>
                    <PasswordInput placeholder="Confirm password" onChange={onChangeConfirmPassword}/>
                    <Button onClick={submitCreateUser}>Sign Up</Button>
                    <ChakraLink as={ReactRouterLink} to='/resetpassword'>
                        <Center>Forgot Password? Click here to reset!</Center>
                    </ChakraLink>
                </Stack>
            </Center>
        </Container>
    )
};

export default SignupPage;