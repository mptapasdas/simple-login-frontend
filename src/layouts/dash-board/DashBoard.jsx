import React from "react";

import { useAuthContext } from "../../context-provider/context-provider";

import "./DashBoard.css";

const DashBoard = () => {
    const { user } = useAuthContext();
    return (
        <div className='justify-content-center mt-5 bg-secondary dashboard'>
            <h2 className='col-12 bg-dark dashboard-title'>Dashboard</h2>
            <h3 className='col-12'> name : {user.name}</h3>
            <h4 className='col-12'> email : {user.email}</h4>
        </div>
    );
};

export default DashBoard;
