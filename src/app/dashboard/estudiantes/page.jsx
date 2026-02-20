import { db } from "@/src/lib/prisma";
import { auth } from "@/src/auth";
import { Button } from "@/src/components/ui/button";
import { Modal } from "@/src/components/ui/modal";
import { PlusIcon, Trash2, Pencil } from "lucide-react";
import { crearEstudiante, eliminarEstudiante, editarEstudiante } from "@/src/actions/escuela-actions";

export const metadata = { title: "Estudiantes" };

async function EstudianteFormCreate() {
    const grupos = await db.grupo.findMany({ select: { id: true, nombre: true } });
    const asignaturas = await db.asignatura.findMany({ select: { id: true, nombre: true } });
    return (
        <form action={crearEstudiante} className="space-y-4">
            <h2 className="text-lg font-bold">Nuevo Estudiante</h2>
            <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 space-y-1">
                    <label className="text-sm font-medium">Nombre completo</label>
                    <input name="nombre" required placeholder="ej: Ana García" className="w-full rounded-md border px-3 py-2 text-sm" />
                </div>
                <div className="col-span-2 space-y-1">
                    <label className="text-sm font-medium">Tutor legal</label>
                    <input name="tutorLegal" required placeholder="Padre/madre/tutor" className="w-full rounded-md border px-3 py-2 text-sm" />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium">Fecha de nacimiento</label>
                    <input name="fechaNacimiento" type="date" required className="w-full rounded-md border px-3 py-2 text-sm" />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium">Grupo</label>
                    <select name="grupoId" className="w-full rounded-md border px-3 py-2 text-sm">
                        <option value="">Sin grupo</option>
                        {grupos.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
                    </select>
                </div>
            </div>
            {asignaturas.length > 0 && (
                <div className="space-y-1">
                    <label className="text-sm font-medium">Asignaturas</label>
                    <div className="rounded-md border p-3 grid grid-cols-2 gap-1 max-h-36 overflow-y-auto">
                        {asignaturas.map(a => (
                            <label key={a.id} className="flex items-center gap-2 text-sm cursor-pointer">
                                <input type="checkbox" name="asignaturaIds" value={a.id} className="rounded" />
                                {a.nombre}
                            </label>
                        ))}
                    </div>
                </div>
            )}
            <Button type="submit" className="w-full">Crear estudiante</Button>
        </form>
    );
}

async function EstudianteFormEdit({ estudiante }) {
    const grupos = await db.grupo.findMany({ select: { id: true, nombre: true } });
    const asignaturas = await db.asignatura.findMany({ select: { id: true, nombre: true } });
    const assignedIds = new Set(estudiante.asignaturas.map(a => a.id));
    const fechaStr = estudiante.fechaNacimiento
        ? new Date(estudiante.fechaNacimiento).toISOString().split("T")[0]
        : "";

    return (
        <form action={editarEstudiante} className="space-y-4">
            <h2 className="text-lg font-bold">Editar Estudiante</h2>
            <input type="hidden" name="id" value={estudiante.id} />
            <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 space-y-1">
                    <label className="text-sm font-medium">Nombre completo</label>
                    <input name="nombre" required defaultValue={estudiante.nombre} className="w-full rounded-md border px-3 py-2 text-sm" />
                </div>
                <div className="col-span-2 space-y-1">
                    <label className="text-sm font-medium">Tutor legal</label>
                    <input name="tutorLegal" required defaultValue={estudiante.tutorLegal} className="w-full rounded-md border px-3 py-2 text-sm" />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium">Fecha de nacimiento</label>
                    <input name="fechaNacimiento" type="date" required defaultValue={fechaStr} className="w-full rounded-md border px-3 py-2 text-sm" />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium">Grupo</label>
                    <select name="grupoId" defaultValue={estudiante.grupoId ?? ""} className="w-full rounded-md border px-3 py-2 text-sm">
                        <option value="">Sin grupo</option>
                        {grupos.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
                    </select>
                </div>
            </div>
            {asignaturas.length > 0 && (
                <div className="space-y-1">
                    <label className="text-sm font-medium">Asignaturas</label>
                    <div className="rounded-md border p-3 grid grid-cols-2 gap-1 max-h-36 overflow-y-auto">
                        {asignaturas.map(a => (
                            <label key={a.id} className="flex items-center gap-2 text-sm cursor-pointer">
                                <input type="checkbox" name="asignaturaIds" value={a.id} defaultChecked={assignedIds.has(a.id)} className="rounded" />
                                {a.nombre}
                            </label>
                        ))}
                    </div>
                </div>
            )}
            <Button type="submit" className="w-full">Guardar cambios</Button>
        </form>
    );
}

export default async function EstudiantesPage() {
    const session = await auth();
    const isAdmin = session?.user?.role === "ADMIN";

    const estudiantes = await db.estudiante.findMany({
        include: {
            grupo: { select: { nombre: true } },
            asignaturas: { select: { id: true, nombre: true } },
        },
        orderBy: { nombre: "asc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Estudiantes</h1>
                    <p className="text-muted-foreground text-sm">Lista de alumnos matriculados</p>
                </div>
                {isAdmin && (
                    <Modal trigger={
                        <Button size="sm" className="gap-2">
                            <PlusIcon className="h-4 w-4" /> Nuevo estudiante
                        </Button>
                    }>
                        <EstudianteFormCreate />
                    </Modal>
                )}
            </div>

            {estudiantes.length === 0 ? (
                <div className="rounded-xl border bg-card p-12 text-center text-muted-foreground">
                    No hay estudiantes registrados aún.
                </div>
            ) : (
                <div className="rounded-xl border bg-card overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left">Nombre</th>
                                <th className="px-4 py-3 text-left">Tutor legal</th>
                                <th className="px-4 py-3 text-left">Grupo</th>
                                <th className="px-4 py-3 text-left">Asignaturas</th>
                                {isAdmin && <th className="px-4 py-3 text-left">Acciones</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {estudiantes.map((e) => (
                                <tr key={e.id} className="border-t hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3 font-medium">{e.nombre}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{e.tutorLegal}</td>
                                    <td className="px-4 py-3">
                                        {e.grupo
                                            ? <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-medium">{e.grupo.nombre}</span>
                                            : <span className="text-muted-foreground text-xs">Sin grupo</span>}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap gap-1">
                                            {e.asignaturas.length > 0
                                                ? e.asignaturas.map(a => (
                                                    <span key={a.nombre} className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">{a.nombre}</span>
                                                ))
                                                : <span className="text-muted-foreground text-xs">Ninguna</span>
                                            }
                                        </div>
                                    </td>
                                    {isAdmin && (
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <Modal trigger={
                                                    <Button size="icon" variant="outline" className="h-7 w-7">
                                                        <Pencil className="h-3.5 w-3.5" />
                                                    </Button>
                                                }>
                                                    <EstudianteFormEdit estudiante={e} />
                                                </Modal>
                                                <form action={async () => {
                                                    "use server";
                                                    await eliminarEstudiante(e.id);
                                                }}>
                                                    <Button size="icon" variant="destructive" className="h-7 w-7" type="submit">
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Button>
                                                </form>
                                            </div>
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
