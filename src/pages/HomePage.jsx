import React from "react";

import { useAuthContext } from "../context-provider/context-provider";
import Auth from "../layouts/auth/auth";
import DashBoard from "../layouts/dash-board/DashBoard";

const HomePage = () => {
    const { isLoggedIn } = useAuthContext();

    return (
        <div className='d-flex flex-row justify-content-center h-100'>
            {!isLoggedIn && <Auth />}
            {isLoggedIn && <DashBoard />}
        </div>
    );
};

export default HomePage;
