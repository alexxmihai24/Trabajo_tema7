const AuthLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[80px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[80px]" />
            </div>

            <div className="relative z-10 w-full flex justify-center p-4">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
