import React from "react";

import { useAuthContext } from "../../context-provider/context-provider";

import "./DashBoard.css";

const DashBoard = () => {
    const { user } = useAuthContext();
    return (
        <div className='justify-content-center mt-5 bg-secondary dashboard'>
            <h1 className='col-12'> name : {user.name}</h1>
            <h2 className='col-12'> email : {user.email}</h2>
        </div>
    );
};

export default DashBoard;
