"use client";

import { useTransition, useState, useActionState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
    deleteUser,
    toggleUserActive,
    createUser,
    changeUserRole,
} from "@/src/actions/admin-actions";

// Subcomponente: formulario de creación de usuario
function CreateUserForm({ onSuccess }) {
    const [state, formAction, isPending] = useActionState(createUser, null);

    return (
        <div className="bg-slate-50 rounded-lg p-4 border space-y-3">
            <h3 className="font-semibold text-sm">Crear nuevo usuario</h3>
            <form action={formAction} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label htmlFor="new-name" className="text-xs">Nombre</Label>
                    <Input id="new-name" name="name" placeholder="Nombre completo" required className="h-8 text-sm" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="new-email" className="text-xs">Email</Label>
                    <Input id="new-email" name="email" type="email" placeholder="email@ejemplo.com" required className="h-8 text-sm" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="new-password" className="text-xs">Contraseña</Label>
                    <Input id="new-password" name="password" type="password" placeholder="••••••" required className="h-8 text-sm" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="new-role" className="text-xs">Rol</Label>
                    <select
                        id="new-role"
                        name="role"
                        className="h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                        defaultValue="USER"
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>
                <div className="sm:col-span-2 flex items-center gap-3">
                    <Button type="submit" size="sm" disabled={isPending} className="h-8">
                        {isPending ? "Creando..." : "Crear usuario"}
                    </Button>
                    {state?.error && <p className="text-xs text-destructive">{state.error}</p>}
                    {state?.success && <p className="text-xs text-green-600">{state.success}</p>}
                </div>
            </form>
        </div>
    );
}

// Subcomponente: fila de acciones del usuario
function UserRow({ user }) {
    const [isPending, startTransition] = useTransition();

    const handleToggle = () =>
        startTransition(() => toggleUserActive(user.id, user.active));

    const handleDelete = () => {
        if (confirm(`¿Eliminar a ${user.name}?`))
            startTransition(() => deleteUser(user.id));
    };

    const handleRoleChange = (e) => {
        const newRole = e.target.value;
        startTransition(() => changeUserRole(user.id, newRole));
    };

    return (
        <tr className="border-b last:border-0 hover:bg-slate-50 transition-colors">
            <td className="px-4 py-3 font-medium">{user.name || "—"}</td>
            <td className="px-4 py-3 text-sm">{user.email}</td>
            <td className="px-4 py-3">
                <select
                    defaultValue={user.role}
                    onChange={handleRoleChange}
                    disabled={isPending}
                    className="rounded border border-input bg-background px-2 py-1 text-xs"
                >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </td>
            <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {user.active ? "Activo" : "Inactivo"}
                </span>
            </td>
            <td className="px-4 py-3 flex gap-2">
                <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    disabled={isPending}
                    onClick={handleToggle}
                >
                    {user.active ? "Desactivar" : "Activar"}
                </Button>
                <Button
                    size="sm"
                    variant="destructive"
                    className="h-7 text-xs"
                    disabled={isPending}
                    onClick={handleDelete}
                >
                    Eliminar
                </Button>
            </td>
        </tr>
    );
}

// Panel principal de administración
export function AdminPanel({ users }) {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6 w-full">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Panel de Administración</h2>
                <Button size="sm" onClick={() => setShowForm((v) => !v)} variant="outline">
                    {showForm ? "Cancelar" : "+ Nuevo usuario"}
                </Button>
            </div>

            {showForm && <CreateUserForm onSuccess={() => setShowForm(false)} />}

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
                            <UserRow key={user.id} user={user} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

