import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../axios";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [authLoading, setAuthLoading] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [operation, setOperation] = useState("login");

    const isEmailValid = (email) => {
        return /\w+@\w+\.\w+/.test(email);
    };
    const isNameValid = (name) => {
        return name.length >= 3;
    };
    const isPasswordValid = (password) => {
        return password.length >= 6;
    };

    const login = async (email, password) => {
        if (!isEmailValid(email)) {
            setErrorText("Please provide valid email");
            return;
        }

        if (!isPasswordValid(password)) {
            setErrorText("Password does not match");
            return;
        }

        setErrorText("");
        setAuthLoading(true);
        try {
            let { data } = await axios.post(`/auth/login`, {
                email,
                password,
            });
            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: data.user.name,
                    email: data.user.email,
                    token: data.token,
                })
            );
            setUser({ name: data.user.name, email: data.user.email });
            setIsLoggedIn(true);
            setErrorText("Login Successful");
            setAuthLoading(false);


        } catch (error) {
            setIsLoggedIn(false);
            setErrorText(error.response.data.msg);
            setAuthLoading(false);
        }
    };

    const register = async (name, email, password) => {
        if (!isNameValid(name)) {
            setErrorText("Name is too short");
            return;
        }
        if (!isEmailValid(email)) {
            setErrorText("Please provide valid email");
            return;
        }

        if (!isPasswordValid(password)) {
            setErrorText("Password length must be more than 6");
            return;
        }
        setErrorText("");
        setAuthLoading(true);
        try {
            const { data } = await axios.post(`/auth/register`, {
                name,
                email,
                password,
            });
            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: data.user.name,
                    email: data.user.email,
                    token: data.token,
                })
            );
            setUser({ name: data.user.name });
            setIsLoggedIn(true);
            setAuthLoading(false);
        } catch (error) {
            setErrorText(JSON.stringify(error.response.data.msg));
            setAuthLoading(false);
        }
    };

    const verify = async () => {
        setErrorText("");
        const localUser = localStorage.getItem("user");
        setAuthLoading(true);
        try {
            const { data } = await axios.get("/verify");
            console.log(data);
            if (data.verified === true) {
                setErrorText("verification successful");
                setUser(JSON.parse(localUser));
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                setErrorText("verification unsuccessful");
            }
            setAuthLoading(false);
        } catch (error) {
            setIsLoggedIn(false);
            setAuthLoading(false);
            setErrorText(JSON.stringify(error.msg));
        }
    };
    const logout = () => {
        setErrorText("");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUser({});
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            verify();
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                setUser,
                login,
                register,
                logout,
                errorText,
                user,
                authLoading,
                isLoggedIn,
                operation,
                setErrorText,
                setOperation,
                verify,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
