import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import { useAuthContext } from "../../context-provider/context-provider";

export default function NavBar() {
    const { isLoggedIn, logout } = useAuthContext();
    return (
        <Box sx={{ flexGrow: 0 }}>
            <AppBar position='static'>
                {!isLoggedIn && <h2>Please Login</h2>}
                {isLoggedIn && (
                    <button className='w-1' onClick={() => logout()}>
                        Logout
                    </button>
                )}
            </AppBar>
        </Box>
    );
}
