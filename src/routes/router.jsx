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