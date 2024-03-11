import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { pb } from '../../../lib/pb';

interface UserData {
    username: string;
    password: string;
}

export default function CreateAccount() {
    const navigate = useNavigate();

    const createAccountMutation = async (userData: UserData) => {
        await pb.collection("users").create(userData);
    };

    const onSubmit = (data: UserData) => {
        mutate.mutate(data);
        reset();
    };

    const { register, handleSubmit, reset } = useForm<UserData>();

    const mutate = useMutation({
        mutationFn: createAccountMutation,
        onSuccess: () => {
            return navigate("/");
        },
        onError: (error: any) => {
            console.error("Login error:", error);
        },
    }
    );

    return (
        <>
            <div className="flex flex-col lg:flex-row h-auto lg:h-40vh mt-4 mb-4 max-w-3xl mx-auto">
                <div className="lg:flex-1 flex items-center justify-center bg-gray-100 p-8 lg:rounded-l-lg lg:rounded-tl-lg lg:rounded-bl-lg rounded-tl-lg rounded-tr-lg lg:order-first order-last">
                    <div className="max-w-md w-full bg-transparent rounded-lg overflow-hidden">
                        <div className="py-2 px-4">
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-center text-indigo-600">
                                Create your account
                            </h2>
                        </div>

                        <form className="flex flex-col align-start" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mx-4 border-slate-300 border-2 rounded-3xl px-2 py-1">
                                <div>
                                    <input
                                        className="rounded-sm pl-2 bg-transparent focus:outline-none"
                                        placeholder="Username"
                                        type="text"
                                        {...register('username', { required: 'Username is required' })}
                                    />
                                    {mutate.error.username && <p>{mutate.error.username}</p>}
                                </div>

                                <div>
                                    <input
                                        type="password"
                                        className="rounded-sm pl-2 bg-transparent focus:outline-none"
                                        placeholder="Password"
                                        {...register('password', { required: 'Password is required' })}
                                    />
                                    {mutate.error.password && <p>{mutate.error.password.message}</p>}
                                </div>
                            </div>

                            <div className="flex justify-center mt-4">
                                <button className="rounded-xl bg-indigo-600 text-white px-6 py-1" type="submit">
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="lg:flex-1 flex items-center justify-center lg:rounded-r-lg lg:rounded-t-none rounded-br-lg rounded-bl-lg bg-indigo-600 text-white p-8 lg:rounded-tr-lg lg:rounded-br-lg lg:order-last order-last">
                    <div>
                        <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">Welcome to our platform!</h2>
                        <p className="text-lg">Join us and start exploring exciting features.</p>
                    </div>
                </div>
            </div>
        </>
    );
};
