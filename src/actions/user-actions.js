"use server";

import { auth } from "@/src/auth";
import { db } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserInfo(formData) {
    const session = await auth();

    if (!session) {
        return { error: "No autorizado" };
    }

    const name = formData.get("name");

    if (!name) {
        return { error: "El nombre es obligatorio" };
    }

    try {
        await db.user.update({
            where: { id: session.user.id },
            data: { name },
        });

        revalidatePath("/dashboard");
        return { success: "Información actualizada" };
    } catch (error) {
        return { error: "Error al actualizar la información" };
    }
}
