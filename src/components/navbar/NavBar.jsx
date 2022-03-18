import * as React from "react";

import { useAuthContext } from "../../context-provider/context-provider";

export default function NavBar() {
    const { isLoggedIn, logout, authLoading } = useAuthContext();
    return (
        <nav class='navbar navbar-light bg-light'>
            <form class='form-inline'>
                {isLoggedIn && (
                    <button
                        class='btn btn-sm btn-outline-secondary'
                        type='button'
                        onClick={() => logout()}>
                        {authLoading ? "Loading" : "Logout"}
                    </button>
                )}
                {!isLoggedIn && (
                    <h1>{authLoading ? "Loading" : "Please Login"}</h1>
                )}
            </form>
        </nav>
    );
}
