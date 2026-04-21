import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import { Toaster } from 'react-hot-toast'; 

const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">

            <Toaster position="top-right" />

            <NavBar />

            <main className="flex-grow px-6 lg:px-12 py-12">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default RootLayout;