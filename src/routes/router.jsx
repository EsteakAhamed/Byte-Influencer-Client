import { createBrowserRouter } from 'react-router-dom';
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home.jsx";

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
                element: <div>Influencer List Page (Coming Soon)</div>,
            },
            {
                path: "clients",
                element: <div>Client Management Page (Coming Soon)</div>,
            },
        ],
    },
]);