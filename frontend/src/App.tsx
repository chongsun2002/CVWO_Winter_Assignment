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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<PostsList topic="all"/>}/>
      <Route path="posts">
        <Route index element={<PostsList topic="all"/>}/>
        <Route path="academics" element={<PostsList topic="academics"/>}/>
        <Route path="activitiesevents" element={<PostsList topic="activitiesevents"/>}/>
        <Route path="clubsocs" element={<PostsList topic="clubsocs"/>}/>
        <Route path="recruitment" element={<PostsList topic="recruitment"/>}/>
        <Route path="social" element={<PostsList topic="social"/>}/>
        <Route path="others" element={<PostsList topic="others"/>}/>
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
    <RouterProvider router={router}/>
  </ChakraProvider>
)
