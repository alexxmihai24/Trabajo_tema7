import { db } from "@/src/lib/prisma";
import { auth } from "@/src/auth";
import { Button } from "@/src/components/ui/button";
import { Modal } from "@/src/components/ui/modal";
import { PlusIcon, Trash2, Pencil } from "lucide-react";
import { crearGrupo, eliminarGrupo, editarGrupo } from "@/src/actions/escuela-actions";

export const metadata = { title: "Grupos" };

function GrupoFormCreate() {
    return (
        <form action={crearGrupo} className="space-y-4">
            <h2 className="text-lg font-bold">Nuevo Grupo</h2>
            <div className="space-y-2">
                <label className="text-sm font-medium">Nombre del grupo</label>
                <input name="nombre" required placeholder="ej: 1º DAW" className="w-full rounded-md border px-3 py-2 text-sm" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Tutor</label>
                <input name="tutor" required placeholder="Nombre del tutor" className="w-full rounded-md border px-3 py-2 text-sm" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Aula</label>
                <input name="aula" required placeholder="ej: Aula 12" className="w-full rounded-md border px-3 py-2 text-sm" />
            </div>
            <Button type="submit" className="w-full">Crear grupo</Button>
        </form>
    );
}

function GrupoFormEdit({ grupo }) {
    return (
        <form action={editarGrupo} className="space-y-4">
            <h2 className="text-lg font-bold">Editar Grupo</h2>
            <input type="hidden" name="id" value={grupo.id} />
            <div className="space-y-2">
                <label className="text-sm font-medium">Nombre</label>
                <input name="nombre" required defaultValue={grupo.nombre} className="w-full rounded-md border px-3 py-2 text-sm" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Tutor</label>
                <input name="tutor" required defaultValue={grupo.tutor} className="w-full rounded-md border px-3 py-2 text-sm" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Aula</label>
                <input name="aula" required defaultValue={grupo.aula} className="w-full rounded-md border px-3 py-2 text-sm" />
            </div>
            <Button type="submit" className="w-full">Guardar cambios</Button>
        </form>
    );
}

export default async function GruposPage() {
    const session = await auth();
    const isAdmin = session?.user?.role === "ADMIN";
    const grupos = await db.grupo.findMany({ include: { estudiantes: true }, orderBy: { nombre: "asc" } });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Grupos</h1>
                    <p className="text-muted-foreground text-sm">Lista de grupos escolares</p>
                </div>
                {isAdmin && (
                    <Modal trigger={
                        <Button size="sm" className="gap-2">
                            <PlusIcon className="h-4 w-4" /> Nuevo grupo
                        </Button>
                    }>
                        <GrupoFormCreate />
                    </Modal>
                )}
            </div>

            {grupos.length === 0 ? (
                <div className="rounded-xl border bg-card p-12 text-center text-muted-foreground">
                    No hay grupos registrados aún.
                </div>
            ) : (
                <div className="rounded-xl border bg-card overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left">Nombre</th>
                                <th className="px-4 py-3 text-left">Tutor</th>
                                <th className="px-4 py-3 text-left">Aula</th>
                                <th className="px-4 py-3 text-left">Alumnos</th>
                                {isAdmin && <th className="px-4 py-3 text-left">Acciones</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {grupos.map((g) => (
                                <tr key={g.id} className="border-t hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3 font-medium">{g.nombre}</td>
                                    <td className="px-4 py-3">{g.tutor}</td>
                                    <td className="px-4 py-3">{g.aula}</td>
                                    <td className="px-4 py-3">{g.estudiantes.length}</td>
                                    {isAdmin && (
                                        <td className="px-4 py-3 flex gap-2">
                                            <Modal trigger={
                                                <Button size="icon" variant="outline" className="h-7 w-7">
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                            }>
                                                <GrupoFormEdit grupo={g} />
                                            </Modal>
                                            <form action={async () => {
                                                "use server";
                                                await eliminarGrupo(g.id);
                                            }}>
                                                <Button size="icon" variant="destructive" className="h-7 w-7" type="submit">
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </form>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
