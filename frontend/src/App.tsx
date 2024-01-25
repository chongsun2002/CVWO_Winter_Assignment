import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"

import PostsList from "./components/PostsList"
import RootLayout from "./components/RootLayout"
import LoginPage from "./components/LoginPage"
import ResetPassword from "./components/ResetPassword"
import SignupPage from "./components/SignupPage"
import CreatePost from "./components/CreatePost"
import { AuthProvider } from "./components/Auth"
import ErrorBoundary from "./components/ErrorBoundary"
import PostPage from "./components/Post"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorBoundary />}>
      <Route index element={<PostsList topic="all"/>}/>
      <Route path="posts">
        <Route index element={<PostsList topic="all"/>}/>
        <Route path="academics" element={<PostsList key="academics" topic="academics"/>}/>
        <Route path="activitiesevents" element={<PostsList key="activitiesevents" topic="activitiesevents"/>}/>
        <Route path="clubsocs" element={<PostsList key="clubsocs" topic="clubsocs"/>}/>
        <Route path="recruitment" element={<PostsList key="recruitment" topic="recruitment"/>}/>
        <Route path="social" element={<PostsList key="social" topic="social"/>}/>
        <Route path="others" element={<PostsList key="others" topic="others"/>}/>
        <Route path=":id" element={<PostPage></PostPage>}/>
      </Route>
      <Route path="createpost" element={<CreatePost />}/>
      <Route path="login" element={<LoginPage />}/>
      <Route path="resetpassword" element={<ResetPassword />}/>
      <Route path="signup" element={<SignupPage />}/>
      <Route/>
    </Route>
  )
)

export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </ChakraProvider>
)
