import { useState } from "react";
import { CREATE_ACCOUNT_JSON } from "../JSON/Authendication";
import { CREATE_ACCOUNT_API } from "./APIs/CREATE_ACCOUNT_API";

export default function CreateAccount() {
    const [apiData, setApiData] = useState({
        username: "", password: "",
    });

    const [showPassword, setShowPassword] = useState({});

    const [error, setError] = useState("");

    const togglePassword = (name) => {
        setShowPassword((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    const onSubmtiFunc = async (e) => {
        e.preventDefault();

        if (!apiData.username || !apiData.password || !apiData.confirmpassword) {
            setError({ text: "All fields are required.", type: "error" });
            return;
        }

        if (apiData.password !== apiData.confirmpassword) {
            setError({ text: "Passwords do not match.", type: "error" });
            return;
        }

        try {
            const result = await CREATE_ACCOUNT_API({
                username: apiData.username,
                password: apiData.password,
            });

            if (result.status) {
                setError({
                    text: result.message,
                    type: "success",
                });
            } else {
                setError({
                    text: result.message,
                    type: "error",
                });
            }
        } catch (error) {
            setError({
                text: error.message,
                type: "error",
            });
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <form onSubmit={onSubmtiFunc} className="w-full max-w-md bg-white rounded-lg shadow border p-6 sm:p-8 space-y-6">
                <p className="text-center text-2xl font-bold text-gray-900">
                    Create an account
                </p>

                {CREATE_ACCOUNT_JSON.map((item, index) => (
                    <div key={index}>
                        <label
                            htmlFor={item.name}
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            {item.label}
                        </label>

                        <div className="flex items-center relative w-full">
                            <input
                                id={item.name}
                                type={
                                    item.type === "password"
                                        ? showPassword[item.name]
                                            ? "text"
                                            : "password"
                                        : item.type
                                }
                                name={item.name}
                                value={apiData[item.name]}
                                onChange={(e) => setApiData({ ...apiData, [item.name]: e.target.value })}
                                placeholder={item.placeHolder}
                                className="w-full p-2.5 pr-10 border border-gray-300 rounded-lg text-gray-900 sm:text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                readOnly={item.readOnly}
                                required={item.requiredOnly}
                            />

                            {item.type === "password" && (
                                <button
                                    type="button"
                                    onClick={() => togglePassword(item.name)}
                                    className="absolute right-3 text-gray-600 hover:text-gray-800 focus:outline-none transition-transform duration-200 active:scale-90 cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="22px"
                                        viewBox="0 -960 960 960"
                                        width="22px"
                                        fill="currentColor"
                                    >
                                        <path d={showPassword[item.name] ? item.d : item.fill} />
                                    </svg>
                                </button>
                            )}
                        </div>

                    </div>
                ))}

                {error.text && (
                    <p
                        className={`text-sm text-center ${error.type === "error" ? "text-red-500" : "text-green-600"
                            }`}
                    >
                        {error.text}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full py-2.5 px-5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all cursor-pointer"
                >
                    Create an account
                </button>
                <p className="text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
                    >
                        Login
                    </a>
                </p>
            </form>
        </section>
    );
};