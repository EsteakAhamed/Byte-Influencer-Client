import { createBrowserRouter } from 'react-router-dom';
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home.jsx";
import InfluencerList from "../pages/InfluencerList.jsx";
import InfluencerProfile from "../pages/InfluencerProfile.jsx";
import ClientList from '../pages/ClientList.jsx';
import NotFound from '../pages/NotFound.jsx';

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
                path: "*",
                element: <NotFound />
            }
        ],
    },
]);