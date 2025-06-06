"use client"

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const LoginForm = () => {
    const router = useRouter();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [emailErr, setEmailErr] = useState("");
    // console.log(emailErr);

    async function onSubmit(data) {

        try {
            setLoading(true);
            console.log(data.email, data.password, data.companyName);
            const loginData = await signIn("credentials", {
                ...data,
                redirect: false,
            });
            console.log("Login Response:", loginData); // Debugging


            if (loginData) {
                setLoading(false);
                setEmailErr("");
                toast.success("Login Successfully");
                router.push("/dashboard/home/overview");
            }
        } catch (error) {
            setLoading(false);
            console.log("Network Error", error);
            toast.error("Something Went wrong, Please Try again");
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"

        >

            <div>
                <label htmlFor="email"
                    className="block mb-2 text-sm font-medium text-violetRed dark:text-white"
                >
                    Your Email
                </label>
                <input
                    // {...register("email", { required: true })}
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email format"
                        }
                    })}

                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                focus:ring-violetRed focus:border-violetRed block w-full p-2.5 dark:bg-gray-700 
                dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark: focus: ring-violetRed 
                dark:focus:border-violetRed"
                    placeholder="name@company.com"
                    // required
                    onChange={() => setEmailErr("")}
                />
                {/* {
                    errors.email && <small className="text-red-600 text-sm">{errors.email.message}</small>
                } */}
                {(errors.email || emailErr) && (<small className="text-red-600 text-sm">{errors.email?.message || emailErr}</small>)}

                {/* <small className="text-red-600 text-sm">{emailErr}</small> */}
            </div>




            <div>
                <label htmlFor="password"
                    className="block mb-2 text-sm font-medium text-violetRed dark:text-white"
                >
                    Password
                </label>
                <input
                    // {...register("password", { required: true })}
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })}

                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                focus:ring-violetRed focus:border-violetRed block w-full p-2.5 dark:bg-gray-700 
                dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark: focus: ring-violetRed 
                dark:focus:border-violetRed"
                    placeholder="........"
                // required
                />
                {
                    errors.password && <small className="text-red-600 text-sm">{errors.password.message}</small>
                }
                {/* <small className="text-red-600 text-sm">{emailErr}</small> */}
            </div>

            {
                loading ? (
                    <button
                        disabled
                        type="button"
                        className="w-full text-white bg-violetRed hover:bg-violetRed focus:ring-4 focus:outline-none 
                     focus:ring-violetRed font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violetRed 
                    dark:hover:bg-violetRed dark:focus:ring-violetRed">
                        <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 mr-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                            />
                        </svg>
                        Signin you in please wait...
                    </button>

                ) : (

                    <button
                        type="submit"
                        className="w-full text-white bg-violetRed hover:bg-violetRed focus:ring-4 focus:outline-none 
                         focus:ring-violetRed font-medium rounded-lg !important text-sm px-5 py-2.5 text-center dark:bg-violetRed 
                        dark:hover:bg-violetRed dark:focus:ring-violetRed"
                    >
                        Login
                    </button>
                )

            }


            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? {" "}
                <Link href="/register"
                    className="font-medium text-violetRed hover:underline dark:text-violetRed">
                    Signup
                </Link>
            </p>



        </form>

    )
}


export default LoginForm;