import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { Toaster } from 'react-hot-toast'; 

const RootLayout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';

    return (
        <div className="min-h-screen flex flex-col">
            {isLoading && <LoadingSpinner />}

            <Toaster position="top-right" />

            <NavBar />

            <main className="flex-grow px-6 lg:px-12 pt-24 pb-12">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default RootLayout;
