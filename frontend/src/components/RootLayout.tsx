import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { Grid, GridItem } from '@chakra-ui/react';

import NavBar from './NavBar';
import SideBar from './SideBar';

const RootLayout: React.FC = () => {
    return (
        <Grid
            templateAreas={`'nav nav'
                            'side main'`}
            gridTemplateRows={'100px'}
            gridTemplateColumns={'1fr 5fr'}
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
};

export default RootLayout