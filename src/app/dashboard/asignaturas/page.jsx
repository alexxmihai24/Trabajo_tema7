import { db } from "@/src/lib/prisma";
import { auth } from "@/src/auth";
import { Button } from "@/src/components/ui/button";
import { Modal } from "@/src/components/ui/modal";
import { PlusIcon, Trash2, Pencil } from "lucide-react";
import { crearAsignatura, eliminarAsignatura, editarAsignatura } from "@/src/actions/escuela-actions";

export const metadata = { title: "Asignaturas" };

function AsignaturaFormCreate() {
    return (
        <form action={crearAsignatura} className="space-y-4">
            <h2 className="text-lg font-bold">Nueva Asignatura</h2>
            <div className="space-y-2">
                <label className="text-sm font-medium">Nombre</label>
                <input name="nombre" required placeholder="ej: Matemáticas" className="w-full rounded-md border px-3 py-2 text-sm" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Profesor</label>
                <input name="profesor" placeholder="Nombre del profesor" className="w-full rounded-md border px-3 py-2 text-sm" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Horas / semana</label>
                <input name="horasSemana" type="number" required min="1" max="30" placeholder="4" className="w-full rounded-md border px-3 py-2 text-sm" />
            </div>
            <Button type="submit" className="w-full">Crear asignatura</Button>
        </form>
    );
}

function AsignaturaFormEdit({ asignatura }) {
    return (
        <form action={editarAsignatura} className="space-y-4">
            <h2 className="text-lg font-bold">Editar Asignatura</h2>
            <input type="hidden" name="id" value={asignatura.id} />
            <div className="space-y-2">
                <label className="text-sm font-medium">Nombre</label>
                <input name="nombre" required defaultValue={asignatura.nombre} className="w-full rounded-md border px-3 py-2 text-sm" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Profesor</label>
                <input name="profesor" defaultValue={asignatura.profesor ?? ""} placeholder="Sin asignar" className="w-full rounded-md border px-3 py-2 text-sm" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Horas / semana</label>
                <input name="horasSemana" type="number" required min="1" max="30" defaultValue={asignatura.horasSemana} className="w-full rounded-md border px-3 py-2 text-sm" />
            </div>
            <Button type="submit" className="w-full">Guardar cambios</Button>
        </form>
    );
}

export default async function AsignaturasPage() {
    const session = await auth();
    const isAdmin = session?.user?.role === "ADMIN";
    const asignaturas = await db.asignatura.findMany({
        include: { estudiantes: { select: { id: true } } },
        orderBy: { nombre: "asc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Asignaturas</h1>
                    <p className="text-muted-foreground text-sm">Catálogo de asignaturas del centro</p>
                </div>
                {isAdmin && (
                    <Modal trigger={
                        <Button size="sm" className="gap-2">
                            <PlusIcon className="h-4 w-4" /> Nueva asignatura
                        </Button>
                    }>
                        <AsignaturaFormCreate />
                    </Modal>
                )}
            </div>

            {asignaturas.length === 0 ? (
                <div className="rounded-xl border bg-card p-12 text-center text-muted-foreground">
                    No hay asignaturas registradas aún.
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {asignaturas.map((a) => (
                        <div key={a.id} className="rounded-xl border bg-card p-5 space-y-3">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-semibold">{a.nombre}</h3>
                                {isAdmin && (
                                    <div className="flex gap-1 shrink-0">
                                        <Modal trigger={
                                            <Button size="icon" variant="outline" className="h-7 w-7">
                                                <Pencil className="h-3.5 w-3.5" />
                                            </Button>
                                        }>
                                            <AsignaturaFormEdit asignatura={a} />
                                        </Modal>
                                        <form action={async () => {
                                            "use server";
                                            await eliminarAsignatura(a.id);
                                        }}>
                                            <Button size="icon" variant="destructive" className="h-7 w-7" type="submit">
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        </form>
                                    </div>
                                )}
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                                <p>👨‍🏫 {a.profesor || "Sin asignar"}</p>
                                <p>⏱️ {a.horasSemana} horas/semana</p>
                                <p>👨‍🎓 {a.estudiantes.length} estudiantes</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
