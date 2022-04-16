import React, { useState, useEffect } from "react";
import useHttp from "../hooks/httpHook";
import useMessage from "../hooks/messageHook";

const AuthPage = () => {
    const message = useMessage();
    const { loading, error, request, clearError } = useHttp();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
		message(error);
		clearError()
    }, [error, message, clearError]);

    const changeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleRegister = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {
                ...form,
            });
			message(data.message);
        } catch (e) {}
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>URL shortener</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div class="input-field">
                                <input
                                    className="yellow-input"
                                    placeholder="Enter your email"
                                    id="email"
                                    name="email"
                                    type="text"
                                    onChange={changeHandler}
                                />
                                <label
                                    className="active"
                                    htmlFor="email"
                                    id="1"
                                >
                                    Email
                                </label>
                            </div>
                            <div class="input-field">
                                <input
                                    className="yellow-input"
                                    placeholder="Enter your password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={changeHandler}
                                />
                                <label className="active" htmlFor="password">
                                    Password
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{ marginRight: "10px" }}
                            disabled={loading}
                        >
                            Login
                        </button>
                        <button
                            className="btn cyan lighten-5 black-text"
                            onClick={handleRegister}
                            disabled={loading}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
