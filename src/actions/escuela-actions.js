"use server";

import { db } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/src/auth";

async function checkAdmin() {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") throw new Error("No autorizado");
}

// ─── GRUPOS ───────────────────────────────────────────

export async function crearGrupo(prevState, formData) {
    try {
        await checkAdmin();
        const nombre = formData.get("nombre");
        const tutor = formData.get("tutor");
        const aula = formData.get("aula");
        if (!nombre || !tutor || !aula) return { error: "Todos los campos son obligatorios" };
        await db.grupo.create({ data: { nombre, tutor, aula } });
        revalidatePath("/dashboard/grupos");
    } catch (e) {
        return { error: e.message || "Error al crear grupo" };
    }
    redirect("/dashboard/grupos");
}

export async function eliminarGrupo(id) {
    try {
        await checkAdmin();
        await db.grupo.delete({ where: { id } });
        revalidatePath("/dashboard/grupos");
    } catch (e) {
        return { error: "Error al eliminar grupo" };
    }
    redirect("/dashboard/grupos");
}

export async function editarGrupo(prevState, formData) {
    try {
        await checkAdmin();
        const id = Number(formData.get("id"));
        const nombre = formData.get("nombre");
        const tutor = formData.get("tutor");
        const aula = formData.get("aula");
        await db.grupo.update({ where: { id }, data: { nombre, tutor, aula } });
        revalidatePath("/dashboard/grupos");
    } catch (e) {
        return { error: "Error al actualizar grupo" };
    }
    redirect("/dashboard/grupos");
}

// ─── ASIGNATURAS ──────────────────────────────────────

export async function crearAsignatura(prevState, formData) {
    try {
        await checkAdmin();
        const nombre = formData.get("nombre");
        const profesor = formData.get("profesor");
        const horasSemana = Number(formData.get("horasSemana"));
        if (!nombre || !horasSemana) return { error: "Nombre y horas son obligatorios" };
        await db.asignatura.create({ data: { nombre, profesor, horasSemana } });
        revalidatePath("/dashboard/asignaturas");
    } catch (e) {
        return { error: "Error al crear asignatura" };
    }
    redirect("/dashboard/asignaturas");
}

export async function eliminarAsignatura(id) {
    try {
        await checkAdmin();
        await db.asignatura.delete({ where: { id } });
        revalidatePath("/dashboard/asignaturas");
    } catch (e) {
        return { error: "Error al eliminar asignatura" };
    }
    redirect("/dashboard/asignaturas");
}

export async function editarAsignatura(prevState, formData) {
    try {
        await checkAdmin();
        const id = Number(formData.get("id"));
        const nombre = formData.get("nombre");
        const profesor = formData.get("profesor");
        const horasSemana = Number(formData.get("horasSemana"));
        await db.asignatura.update({ where: { id }, data: { nombre, profesor, horasSemana } });
        revalidatePath("/dashboard/asignaturas");
    } catch (e) {
        return { error: "Error al actualizar asignatura" };
    }
    redirect("/dashboard/asignaturas");
}

// ─── ESTUDIANTES ──────────────────────────────────────

export async function crearEstudiante(prevState, formData) {
    try {
        await checkAdmin();
        const nombre = formData.get("nombre");
        const tutorLegal = formData.get("tutorLegal");
        const fechaNacimiento = new Date(formData.get("fechaNacimiento"));
        const grupoId = formData.get("grupoId") ? Number(formData.get("grupoId")) : null;
        const asignaturaIds = formData.getAll("asignaturaIds").map(Number).filter(Boolean);
        if (!nombre || !tutorLegal || !fechaNacimiento) return { error: "Campos obligatorios faltantes" };
        await db.estudiante.create({
            data: {
                nombre, tutorLegal, fechaNacimiento,
                grupoId,
                asignaturas: asignaturaIds.length ? { connect: asignaturaIds.map(id => ({ id })) } : undefined,
            },
        });
        revalidatePath("/dashboard/estudiantes");
    } catch (e) {
        return { error: "Error al crear estudiante" };
    }
    redirect("/dashboard/estudiantes");
}

export async function eliminarEstudiante(id) {
    try {
        await checkAdmin();
        await db.estudiante.delete({ where: { id } });
        revalidatePath("/dashboard/estudiantes");
    } catch (e) {
        return { error: "Error al eliminar estudiante" };
    }
    redirect("/dashboard/estudiantes");
}

export async function editarEstudiante(prevState, formData) {
    try {
        await checkAdmin();
        const id = Number(formData.get("id"));
        const nombre = formData.get("nombre");
        const tutorLegal = formData.get("tutorLegal");
        const fechaNacimiento = new Date(formData.get("fechaNacimiento"));
        const grupoId = formData.get("grupoId") ? Number(formData.get("grupoId")) : null;
        const asignaturaIds = formData.getAll("asignaturaIds").map(Number).filter(Boolean);
        await db.estudiante.update({
            where: { id },
            data: {
                nombre, tutorLegal, fechaNacimiento, grupoId,
                asignaturas: { set: asignaturaIds.map((aid) => ({ id: aid })) },
            },
        });
        revalidatePath("/dashboard/estudiantes");
    } catch (e) {
        return { error: "Error al actualizar estudiante" };
    }
    redirect("/dashboard/estudiantes");
}
