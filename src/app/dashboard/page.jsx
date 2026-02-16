import { auth, signOut } from "@/src/auth";
import { Button } from "@/src/components/ui/button";
import { UserInfo } from "@/src/components/dashboard/user-info";
import { AdminPanel } from "@/src/components/dashboard/admin-panel";

const DashboardPage = async () => {
    const session = await auth();

    return (
        <div className="flex flex-col items-center min-h-screen bg-slate-100 py-10">
            <div className="w-full max-w-4xl space-y-8 px-4">
                {/* Header */}
                <div className="bg-white p-6 rounded-lg shadow-sm border flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                        <p className="text-muted-foreground">{session?.user?.role === "ADMIN" ? "Panel de Administrador" : "Panel de Usuario"}</p>
                    </div>
                    <form action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/" });
                    }}>
                        <Button type="submit" variant="destructive">
                            Cerrar Sesión
                        </Button>
                    </form>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-6">
                    {/* User Info (Visible for ALL) */}
                    <UserInfo user={session?.user} />

                    {/* Admin Panel (Visible ONLY for ADMIN) */}
                    {session?.user?.role === "ADMIN" && (
                        <AdminPanel />
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
