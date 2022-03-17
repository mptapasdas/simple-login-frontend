import React from "react";

import { useAuthContext } from "../../context-provider/context-provider";

const DashBoard = () => {
    const { user } = useAuthContext();
    return (
        <div className='d-flex flex-column justify-content-center'>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
        </div>
    );
};

export default DashBoard;
