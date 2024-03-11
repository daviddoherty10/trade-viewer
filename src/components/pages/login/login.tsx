import Login from "../../authentication/login/login";

export default function LoginPage() {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(https://source.unsplash.com/red-and-blue-light-streaks-fiXLQXAhCfk/2400x1600)`,
                        width: "100vw",
                        height: "100vh",
                    }}
                ></div>
                <div className="w-full m-8 relative z-10">
                    <Login />
                </div>
            </div>
        </>
    );
}