"use server";

import { signIn } from "@/src/auth";
import { db } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function login(prevState, formData) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Credenciales inválidas.";
                default:
                    return "Algo salió mal.";
            }
        }
        throw error;
    }
}

export async function register(prevState, formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!name || !email || !password) {
        return "Todos los campos son obligatorios.";
    }

    try {
        const existingUser = await db.user.findUnique({
            where: { email: email.toString() },
        });

        if (existingUser) {
            return "El correo electrónico ya está registrado.";
        }

        const hashedPassword = await bcrypt.hash(password.toString(), 10);

        await db.user.create({
            data: {
                name: name.toString(),
                email: email.toString(),
                password: hashedPassword,
            },
        });
    } catch (error) {
        return "Error al crear la cuenta.";
    }

    redirect("/auth/login?success=true");
}

export async function socialLogin(provider) {
    await signIn(provider, { redirectTo: "/dashboard" });
}
