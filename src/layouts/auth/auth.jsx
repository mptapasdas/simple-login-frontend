import React, { useState } from "react";
import CustomInput from "../../components/custom-input/CustomInput";
import { useAuthContext } from "../../context-provider/context-provider";
import "./auth.css";
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const {
        login,
        register,
        errorText,
        setErrorText,
        authLoading,
        operation,
        setOperation,
    } = useAuthContext();

    const toggleOperation = () => {
        setErrorText("");
        if (operation === "login") {
            setOperation("register");
        } else if (operation === "register") {
            setOperation("login");
        }
    };
    const authButtonHandler = () => {
        if (!authLoading) {
            if (operation === "login") {
                login(email, password);
            } else if (operation === "register") {
                register(name, email, password);
            }
        }
    };
    return (
        <div className='d-flex flex-row justify-content-center text-align-center'>
            <div className='container-fluid auth-container'>
                <div className='row sign-container justify-content-center mt-5'>
                    <div className='input_container col-12 col-md-6'>
                        {operation === "register" && (
                            <CustomInput
                                hasError={false}
                                label='Name'
                                onChangeHandler={(e) => setName(e.target.value)}
                                type='text'
                            />
                        )}
                        <CustomInput
                            hasError={false}
                            label='Email'
                            onChangeHandler={(e) => setEmail(e.target.value)}
                            type='text'
                        />
                        <CustomInput
                            hasError={false}
                            label='Password'
                            onChangeHandler={(e) => setPassword(e.target.value)}
                            type='password'
                        />
                        <p className='error-text'>{errorText}</p>
                        <button
                            className='operation-button'
                            disabled={authLoading}
                            onClick={authButtonHandler}>
                            {authLoading
                                ? "Loading..."
                                : operation === "login"
                                ? "Login"
                                : operation === "register"
                                ? "Register"
                                : "Logout"}
                        </button>
                        <button
                            className='register-prompt col-12'
                            disabled={authLoading}
                            onClick={toggleOperation}>
                            {operation === "login"
                                ? "Not a user yet? Register"
                                : "Already a user? Login"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
