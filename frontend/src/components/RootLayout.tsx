import * as React from 'react'
import { Outlet } from 'react-router-dom'

import {  Grid, GridItem } from '@chakra-ui/react'

import NavBar from './NavBar'
import SideBar from './SideBar'
import PostsList from './PostsList'

const RootLayout: React.FC = () => {
    return (
        <Grid
            templateAreas={`'nav nav'
                            'side main'`}
            gridTemplateRows={'50px 1fr 30px'}
            gridTemplateColumns={'150px 1fr'}   
            gap='6'
        >
            <GridItem area={'nav'}>
                <NavBar />
            </GridItem>
            <GridItem area={'side'}>
                <SideBar />
            </GridItem>
            <GridItem area={'main'}>
                <Outlet />
            </GridItem>
        </Grid>
    )
}

export default RootLayout