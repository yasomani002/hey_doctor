import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivetRoute";
import LoginPage from "@/features/login/page/LoginPage";

// import Login from "../pages/Login";
// import Dashboard from "../pages/Dashboard";
// import Users from "../pages/Users";
// import NotFound from "../pages/NotFound";

const publicRoutes = [
    {
        path: "/",
        element: <LoginPage />,
    },
];

const privateRoutes = [
    {
        path: "/dashboard",
        element: <>i am dashbaord</>,
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
                    {privateRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Route>

                {/* 404 */}
                <Route path="*" element={<>i am not found</>} />

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;