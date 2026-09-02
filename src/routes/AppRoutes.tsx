import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivetRoute";
import LoginPage from "@/features/login/page/LoginPage";
import Layout from "@/styles/Layout/Layout";
import { Fragment, Suspense } from "react";
import DashbaordPage from "@/features/dashboard/page/DashboardPage";
import AppoinmentPage from "@/features/appointment/page/AppoinmentPage";
import PatientHistoryPage from "@/features/patient_history/page/PatientHistoryPage";
import EmployeePage from "@/features/staff_managment/employee/page/EmployeePage";
import UserRolePage from "@/features/staff_managment/user_role/page/UserRolePage";
import CreateUserRolePage from "@/features/staff_managment/user_role/page/CreateUserRolePage";

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
        submenu: [],
    },
    {
        path: "/patient-history",
        element: <PatientHistoryPage />,
        submenu: [],
    },
    {
        path: "/employees",
        element: <EmployeePage />,
        submenu: [],
    },
    {
        path: "/user-roles",
        element: <UserRolePage />,
        submenu: [
            {
                path: "/create",
                element: <CreateUserRolePage />,
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
                            <Fragment key={route.path}>
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
                                        key={`${route.path}${subRoute.path}`}
                                        path={`${route.path}${subRoute.path}`}
                                        element={
                                            <Suspense fallback={<div>loading...</div>}>
                                                {subRoute.element}
                                            </Suspense>
                                        }
                                    />
                                ))}
                            </Fragment>
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