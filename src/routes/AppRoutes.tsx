import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivetRoute";
import LoginPage from "@/features/login/page/LoginPage";
import Layout from "@/styles/Layout/Layout";
import { Suspense } from "react";
import DashbaordPage from "@/features/dashboard/page/DashboardPage";
import AppoinmentPage from "@/features/appointment/page/AppoinmentPage";

const publicRoutes = [
    {
        path: "/",
        element: <LoginPage />,
    },
];

const privateRoutes = [
    {
        path: "/dashboard",
        element: <DashbaordPage />,
    },
    {
        path: "/users",
        element: <>I am users</>,
    },
    {
        path: "/appointments",
        element: <AppoinmentPage />,
        submenu: [
            {
                path: "/appointments",
                element: <AppoinmentPage />,
            },
            {
                path: "/appointment/list",
                element: <>Appointment List</>,
            },
            {
                path: "/appointment/add",
                element: <>Add Appointment</>,
            },
        ],
    },
];

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                {publicRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                    />
                ))}

                {/* Private Routes */}
                <Route element={<PrivateRoute />}>
                    <Route element={<Layout />}>
                        {privateRoutes.map((route) => (
                            <>
                                {/* Parent Route */}
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={
                                        <Suspense fallback={<div>loading...</div>}>
                                            {route.element}
                                        </Suspense>
                                    }
                                />

                                {/* Submenu Routes */}
                                {route.submenu?.map((subRoute) => (
                                    <Route
                                        key={subRoute.path}
                                        path={subRoute.path}
                                        element={
                                            <Suspense fallback={<div>loading...</div>}>
                                                {subRoute.element}
                                            </Suspense>
                                        }
                                    />
                                ))}
                            </>
                        ))}
                    </Route>
                </Route>

                {/* 404 */}
                <Route path="*" element={<>i am not found</>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;