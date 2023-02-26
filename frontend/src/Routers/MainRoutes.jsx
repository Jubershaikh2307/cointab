import React from 'react';
import {Route,Routes} from 'react-router-dom'
import LandingPage from '../Pages/LandingPage';
import Page2 from '../Pages/Page2';

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/page2' element={<Page2/>} />
        </Routes>
    );
};

export default MainRoutes;