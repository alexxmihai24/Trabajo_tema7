"use server";

import { db } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/src/auth";

// Helper function to check admin role
async function checkAdmin() {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
        throw new Error("No autorizado");
    }
    return session;
}

export async function deleteUser(userId) {
    try {
        await checkAdmin();
        await db.user.delete({ where: { id: userId } });
        revalidatePath("/dashboard");
        return { success: "Usuario eliminado" };
    } catch (error) {
        return { error: "Error al eliminar usuario" };
    }
}

export async function toggleUserActive(userId, currentStatus) {
    try {
        await checkAdmin();
        await db.user.update({
            where: { id: userId },
            data: { active: !currentStatus },
        });
        revalidatePath("/dashboard");
        return { success: "Estado actualizado" };
    } catch (error) {
        return { error: "Error al actualizar estado" };
    }
}
