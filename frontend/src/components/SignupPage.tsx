import * as React from "react";

import { Container, InputGroup, Input, InputLeftElement, InputRightElement, useBoolean, Button, Stack, Center } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

interface PasswordInputProps {
    placeholder: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder }) => {
    const [show, setShow] = useBoolean(false);
    const handleClick: () => void = () => {
        setShow.toggle();
    };

    return (
        <InputGroup>
            <Input 
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder={ placeholder }
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
    return (
        <Container h='calc(100vh - 100px)'>
            <Center h='100%'>
                <Stack spacing='5'>
                    <InputGroup>
                        <Input placeholder="Enter username" />
                    </InputGroup>
                    <PasswordInput placeholder="Enter password"/>
                    <PasswordInput placeholder="Confirm password"/>
                    <Button>Sign Up</Button>
                    <Button>Don't have an account? Click here to Sign Up!</Button>
                    <ChakraLink as={ReactRouterLink} to='/resetpassword'>
                        <Center>Forgot Password? Click here to reset!</Center>
                    </ChakraLink>
                </Stack>
            </Center>
        </Container>
    )
};

export default SignupPage;