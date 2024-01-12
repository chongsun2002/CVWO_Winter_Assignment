import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { createBrowserRouter, BrowserRouterProps, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"

import PostsList from "./components/PostsList"
import RootLayout from "./components/RootLayout"
import LoginPage from "./components/LoginPage"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<PostsList />}/>
      <Route path="login" element={<LoginPage />}/>
    </Route>
  )
)

export const App = () => (
  <ChakraProvider theme={theme}>
    <RouterProvider router={router}/>
  </ChakraProvider>
)
