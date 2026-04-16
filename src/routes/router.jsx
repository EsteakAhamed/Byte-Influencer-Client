import { createBrowserRouter } from 'react-router-dom';
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home.jsx";
import InfluencerList from "../pages/InfluencerList.jsx";
import ClientList from '../pages/ClientList.jsx';

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
                path: "clients",
                element: <ClientList />
            },
        ],
    },
]);