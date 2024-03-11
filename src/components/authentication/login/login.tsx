import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { pb } from "../../../lib/pb";
import "../../../index.css";

type FormData = {
    username: string;
    password: string;
};

export default function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm<FormData>();

    const login = async (data: FormData) => {
        await pb.collection("users").authWithPassword(data.username, data.password);
    };

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            return navigate("/");
        },
        onError: (error: any) => {
            console.error("Login error:", error);
        },
    }
    );

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        try {
            await mutation.mutate(data);
            reset();
        } catch (error) { }
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row h-auto lg:h-40vh mt-4 mb-4 max-w-3xl mx-auto">
                <div className="lg:flex-1 flex items-center justify-center bg-indigo-600 text-white p-8 lg:rounded-l-lg lg:rounded-tl-lg lg:rounded-bl-lg rounded-tl-lg rounded-tr-lg lg:order-first order-first">
                    <div>
                        <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">Sign in to your account</h2>
                        <p className="text-lg">Welcome back! Please sign in to continue.</p>
                    </div>
                </div>

                <div className="lg:flex-1 flex items-center justify-center lg:rounded-r-lg lg:rounded-t-none rounded-br-lg rounded-bl-lg bg-gray-100 p-8 lg:rounded-tr-lg lg:rounded-br-lg lg:order-last order-last">
                    <div className="max-w-md w-full bg-transparent rounded-lg overflow-hidden">
                        <div className="py-2 px-4">
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-center text-indigo-600">
                                Sign in to your account
                            </h2>
                        </div>

                        {mutation.error && (
                            <div className="bg-red-100 border-t-4 border-red-500 rounded-b px-4 py-3 shadow-md my-3 mx-4" role="alert">
                                <p className="text-red-700 font-bold">Error!</p>
                                <p className="text-red-500">{mutation.error.message}</p>
                            </div>
                        )}

                        <form className="flex flex-col align-start" onSubmit={handleSubmit(onSubmit)}>

                            <div className="mx-4 border-slate-300 border-2 rounded-3xl px-2 py-1">
                                <div>
                                    <input className="rounded-sm pl-2 bg-transparent focus:outline-none" required placeholder="Username" type="text" {...register("username")} />
                                    {errors.username && <p>{errors.username.message}</p>}
                                </div>

                                <div>
                                    <input type="password" className="rounded-sm pl-2 bg-transparent focus:outline-none" required placeholder="Password" {...register("password")} />
                                    {errors.password && <p>{errors.password.message}</p>}
                                </div>
                            </div>

                            <div className="flex justify-center mt-4">
                                <input className="rounded-xl bg-indigo-600 text-white px-6 py-1" disabled={false} type="submit" />
                            </div>
                        </form>

                        <div className="text-center text-gray-600 text-sm mt-4">
                            Don't have an account?{" "}
                            <a href="/create-account" className="text-indigo-600 hover:underline">
                                Create one here.
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
