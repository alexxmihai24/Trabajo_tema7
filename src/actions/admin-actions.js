"use server";

import { db } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/src/auth";
import bcrypt from "bcryptjs";

// Helper: verificar que el usuario sea ADMIN
async function checkAdmin() {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
        throw new Error("No autorizado");
    }
    return session;
}

// Eliminar usuario
export async function deleteUser(userId) {
    try {
        await checkAdmin();
        await db.user.delete({ where: { id: userId } });
        revalidatePath("/dashboard");
        revalidatePath("/admin");
        return { success: "Usuario eliminado" };
    } catch (error) {
        return { error: "Error al eliminar usuario" };
    }
}

// Activar / Desactivar usuario
export async function toggleUserActive(userId, currentStatus) {
    try {
        await checkAdmin();
        await db.user.update({
            where: { id: userId },
            data: { active: !currentStatus },
        });
        revalidatePath("/dashboard");
        revalidatePath("/admin");
        return { success: "Estado actualizado" };
    } catch (error) {
        return { error: "Error al actualizar estado" };
    }
}

// Crear usuario desde el panel admin
export async function createUser(prevState, formData) {
    try {
        await checkAdmin();

        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const role = formData.get("role") || "USER";

        if (!name || !email || !password) {
            return { error: "Todos los campos son obligatorios" };
        }

        const existing = await db.user.findUnique({ where: { email } });
        if (existing) {
            return { error: "El email ya está registrado" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });

        revalidatePath("/dashboard");
        revalidatePath("/admin");
        return { success: "Usuario creado correctamente" };
    } catch (error) {
        return { error: "Error al crear el usuario" };
    }
}

// Cambiar rol de usuario
export async function changeUserRole(userId, newRole) {
    try {
        await checkAdmin();
        await db.user.update({
            where: { id: userId },
            data: { role: newRole },
        });
        revalidatePath("/dashboard");
        revalidatePath("/admin");
        return { success: "Rol actualizado" };
    } catch (error) {
        return { error: "Error al cambiar el rol" };
    }
}

