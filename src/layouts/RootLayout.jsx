import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';

const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />

            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default RootLayout;