import { db } from "@/src/lib/prisma";
import { Button } from "@/src/components/ui/button";
import { deleteUser, toggleUserActive } from "@/src/actions/admin-actions";

export async function AdminPanel() {
    const users = await db.user.findMany({
        orderBy: { name: 'asc' },
    });

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4 w-full">
            <h2 className="text-xl font-semibold">Panel de Administración</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border rounded-md">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-700">
                        <tr>
                            <th className="px-4 py-3">Nombre</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Rol</th>
                            <th className="px-4 py-3">Estado</th>
                            <th className="px-4 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-3 font-medium">{user.name}</td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">{user.role}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.active ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 flex gap-2">
                                    <form action={async () => {
                                        "use server";
                                        await toggleUserActive(user.id, user.active);
                                    }}>
                                        <Button size="sm" variant="outline" className="h-8 text-xs">
                                            {user.active ? 'Desactivar' : 'Activar'}
                                        </Button>
                                    </form>
                                    <form action={async () => {
                                        "use server";
                                        await deleteUser(user.id);
                                    }}>
                                        <Button size="sm" variant="destructive" className="h-8 text-xs">
                                            Eliminar
                                        </Button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
