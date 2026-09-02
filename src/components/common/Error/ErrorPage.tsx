import { Loader } from "lucide-react";
import ErrorSection from "./ErrorSection";
import React from "react";
// import loader from "@/assets/icons/animated-loader.svg";


interface ErrorPageProps {
    isError: boolean;
    error: any | null;
    isLoading: boolean;
    children: React.ReactNode;
}
const ErrorPage = ({ isError, error, isLoading, children }: ErrorPageProps) => {

    // If there is an error, show the error section
    if (isError) {
        console.log(error);
        return <ErrorSection errorCode={500} />;
    }

    // If there is a loading state, show the loader
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                {/* <img src={loader} alt="loader" className="w-[350px] h-[350px] object-contain" /> */}
                <Loader className="animate-spin" />
            </div>
        )
    }

    // If there is no error or loading state, show the children
    return <React.Fragment>{children}</React.Fragment>;
};

export default ErrorPage;