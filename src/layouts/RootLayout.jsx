import React, { useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import Sidebar from '../components/Sidebar.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { Toaster } from 'react-hot-toast';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useAuth } from '../context/AuthContext';

const RootLayout = () => {
    useScrollToTop();
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';
    const { isLoggedIn } = useAuth();
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-base-200">
            {isLoading && <LoadingSpinner />}
            <Toaster position="top-right" />

            {/* Desktop sidebar — hidden on mobile, hidden when not logged in */}
            {isLoggedIn && (
                <div className="hidden md:flex">
                    <Sidebar />
                </div>
            )}

            {/* Mobile drawer overlay */}
            {isLoggedIn && drawerOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setDrawerOpen(false)}
                    />
                    {/* Drawer panel */}
                    <div className="relative z-10 animate-in slide-in-from-left duration-200">
                        <Sidebar mobile onClose={() => setDrawerOpen(false)} />
                    </div>
                </div>
            )}

            {/* Main content area */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <NavBar onMenuToggle={() => setDrawerOpen(prev => !prev)} />

                <div id="main-scroll-container" className="flex-1 overflow-y-auto">
                    <main className={`${isLoggedIn ? 'p-4 md:p-6' : ''}`}>
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default RootLayout;
