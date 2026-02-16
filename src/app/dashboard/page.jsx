import { auth, signOut } from "@/src/auth";
import { Button } from "@/src/components/ui/button";

const DashboardPage = async () => {
    const session = await auth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
            <div className="bg-white p-10 rounded-lg shadow-md w-[600px] flex flex-col gap-y-4">
                <div className="flex flex-col items-center gap-y-4">
                    <h1 className="text-3xl font-semibold">Dashboard</h1>
                    <p className="text-muted-foreground">Área protegida</p>
                </div>
                <div className="flex flex-col gap-y-2 p-4 border rounded-md bg-slate-50">
                    <div className="flex flex-row justify-between items-center shadow-sm p-3 bg-white rounded-lg">
                        <p className="text-sm font-medium">Nombre</p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                            {session?.user?.name}
                        </p>
                    </div>
                    <div className="flex flex-row justify-between items-center shadow-sm p-3 bg-white rounded-lg">
                        <p className="text-sm font-medium">Email</p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                            {session?.user?.email}
                        </p>
                    </div>
                    <div className="flex flex-row justify-between items-center shadow-sm p-3 bg-white rounded-lg">
                        <p className="text-sm font-medium">Rol</p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                            {session?.user?.role}
                        </p>
                    </div>
                </div>

                <form action={async () => {
                    "use server";
                    await signOut();
                }}>
                    <Button type="submit" variant="destructive" className="w-full">
                        Cerrar Sesión
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default DashboardPage;
