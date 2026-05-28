import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivetRoute";
import LoginPage from "@/features/login/page/LoginPage";
import Layout from "@/styles/Layout/Layout";
import { Suspense } from "react";
import DashbaordPage from "@/features/dashboard/page/DashboardPage";

const publicRoutes = [
    {
        path: "/",
        element: <LoginPage />,
    },
];

const privateRoutes = [
    {
        path: "/dashboard",
        element: <DashbaordPage />
    },
    {
        path: "/users",
        element: <>i am users</>,
    },
];

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public */}
                {publicRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                    />
                ))}

                {/* Private */}
                <Route element={<PrivateRoute />}>
                    <Route element={<Layout />}>
                        {privateRoutes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Suspense fallback={<div>loading...</div>}>
                                        {route.element}
                                    </Suspense>
                                }
                            />
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