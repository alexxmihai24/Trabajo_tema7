import { db } from "@/src/lib/prisma";
import { auth } from "@/src/auth";
import { Button } from "@/src/components/ui/button";
import { Modal } from "@/src/components/ui/modal";
import { PlusIcon, Trash2 } from "lucide-react";
import { crearEstudiante, eliminarEstudiante } from "@/src/actions/escuela-actions";

export const metadata = { title: "Estudiantes" };

async function EstudianteForm() {
    const grupos = await db.grupo.findMany({ select: { id: true, nombre: true } });
    const asignaturas = await db.asignatura.findMany({ select: { id: true, nombre: true } });

    return (
        <form action={crearEstudiante} className="space-y-4">
            <h2 className="text-lg font-bold">Nuevo Estudiante</h2>
            <div className="space-y-2">
                <label className="text-sm font-medium">Nombre completo</label>
                <input name="nombre" required placeholder="ej: Ana García" className="w-full rounded-md border px-3 py-2 text-sm" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Tutor legal</label>
                <input name="tutorLegal" required placeholder="Nombre del padre/madre/tutor" className="w-full rounded-md border px-3 py-2 text-sm" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Fecha de nacimiento</label>
                <input name="fechaNacimiento" type="date" required className="w-full rounded-md border px-3 py-2 text-sm" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Grupo</label>
                <select name="grupoId" className="w-full rounded-md border px-3 py-2 text-sm">
                    <option value="">Sin grupo</option>
                    {grupos.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
                </select>
            </div>
            {asignaturas.length > 0 && (
                <div className="space-y-2">
                    <label className="text-sm font-medium">Asignaturas</label>
                    <div className="rounded-md border p-3 space-y-1 max-h-36 overflow-y-auto">
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

export default async function EstudiantesPage() {
    const session = await auth();
    const isAdmin = session?.user?.role === "ADMIN";

    const estudiantes = await db.estudiante.findMany({
        include: {
            grupo: { select: { nombre: true } },
            asignaturas: { select: { nombre: true } },
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
                        <EstudianteForm />
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
                                        {e.grupo ? (
                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-medium">{e.grupo.nombre}</span>
                                        ) : (
                                            <span className="text-muted-foreground text-xs">Sin grupo</span>
                                        )}
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
                                            <form action={async () => {
                                                "use server";
                                                await eliminarEstudiante(e.id);
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
