import { createBrowserRouter } from 'react-router-dom';
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home.jsx";
import InfluencerList from "../pages/InfluencerList.jsx";
import InfluencerProfile from "../pages/InfluencerProfile.jsx";
import ClientList from '../pages/ClientList.jsx';
import NotFound from '../pages/NotFound.jsx';
import Register from '../pages/Register.jsx';
import Login from '../pages/Login.jsx';
import Profile from '../pages/Profile.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import AdminRoute from './AdminRoute.jsx';
import UserManagement from '../pages/UserManagement.jsx';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                element: <PrivateRoute />,
                children: [
                    {
                        path: "influencers",
                        element: <InfluencerList /> 
                    },
                    {
                        path: "influencers/:id",
                        element: <InfluencerProfile />
                    },
                    {
                        path: "clients",
                        element: <ClientList />
                    }
                ]
            },
            {
                element: <AdminRoute />,
                children: [
                    {
                        path: "admin/users",
                        element: <UserManagement />
                    }
                ]
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                element: <PrivateRoute />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />
                    }
                ]
            },
            {
                path: "*",
                element: <NotFound />
            }
        ],
    },
]);