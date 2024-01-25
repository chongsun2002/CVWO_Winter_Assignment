import * as React from "react";

import { Link as ChakraLink } from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"

const ErrorBoundary: React.FC = () => {
    return (
        <div>
            YOU SHOULDN'T BE HERE! <ChakraLink as={ReactRouterLink} to="/">
                CLICK HERE TO GO HOME!
            </ChakraLink>
        </div>
        
    );
}

export default ErrorBoundary