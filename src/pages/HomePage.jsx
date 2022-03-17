import React from "react";

import { useAuthContext } from "../context-provider/context-provider";
import Auth from "../layouts/auth/auth";
import DashBoard from "../layouts/dash-board/DashBoard";

const HomePage = () => {
    const { authLoading, isLoggedIn } = useAuthContext();
    if (authLoading) return "Loading";
    return (
        <div className='d-flex flex-column justify-content-center h-100'>
            <div className='d-flex flex-row justify-content-center'>
                {!isLoggedIn && <Auth />}
                {isLoggedIn && <DashBoard />}
            </div>
        </div>
    );
};

export default HomePage;
