'use server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { signIn, signOut } from '@/auth';
import { getUserByEmail } from '@/lib/data';
import { revalidatePath } from 'next/cache';

// REGISTRAR USUARIO
export async function register(prevState, formData) {
    const name = formData.get('nombre')
    const email = formData.get('email')
    const password = formData.get('contraseña')

    // Comprobamos si el usuario ya está registrado
    const user = await getUserByEmail(email);

    if (user) {
        return {
            error: 'El email ya está registrado',
            fields: Object.fromEntries(formData.entries())
        }
    }

    // Encriptamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Guardamos en la base de datos
    await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
            role: 'USER',
            active: true
        }
    })

    return { success: "Usuario registrado correctamente" }
}

// INICIAR SESIÓN con credenciales
export async function login(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('contraseña')

    // Comprobamos si el usuario existe
    const user = await getUserByEmail(email);

    if (!user) {
        return {
            error: 'Usuario no registrado.',
            fields: Object.fromEntries(formData.entries())
        }
    }

    // Comparamos la contraseña
    const matchPassword = await bcrypt.compare(password, user.password)

    if (user && matchPassword) {
        await signIn('credentials', {
            email,
            password,
            redirectTo: globalThis.callbackUrl || '/dashboard'
        })
        return { success: "Sesión iniciada correctamente" }
    } else {
        return {
            error: 'Credenciales incorrectas.',
            fields: Object.fromEntries(formData.entries())
        }
    }
}

// INICIAR SESIÓN con Google
export async function loginGoogle() {
    try {
        await signIn('google', { redirectTo: globalThis.callbackUrl || '/dashboard' })
    } catch (error) {
        console.log(error);
        throw error
    }
}

// INICIAR SESIÓN con GitHub
export async function loginGithub() {
    try {
        await signIn('github', { redirectTo: globalThis.callbackUrl || '/dashboard' })
    } catch (error) {
        console.log(error);
        throw error
    }
}

// INICIAR SESIÓN con Discord
export async function loginDiscord() {
    try {
        await signIn('discord', { redirectTo: globalThis.callbackUrl || '/dashboard' })
    } catch (error) {
        console.log(error);
        throw error
    }
}

// CERRAR SESIÓN
export async function logout() {
    try {
        await signOut({ redirectTo: '/' })
    } catch (error) {
        throw error
    }
}

// ACTUALIZAR USUARIO (para el dashboard)
export async function updateUser(prevState, formData) {
    const id = formData.get('id')
    const name = formData.get('nombre')
    const email = formData.get('email')

    try {
        await prisma.user.update({
            where: { id },
            data: { name, email }
        })
        revalidatePath('/dashboard')
        return { success: "Datos actualizados correctamente" }
    } catch (error) {
        return { error: error.message }
    }
}

// ELIMINAR USUARIO (solo administradores)
export async function deleteUser(id) {
    try {
        await prisma.user.delete({
            where: { id }
        })
        revalidatePath('/admin')
        return { success: "Usuario eliminado correctamente" }
    } catch (error) {
        return { error: error.message }
    }
}

// ACTUALIZAR ROL DE USUARIO (solo administradores)
export async function updateUserRole(id, role) {
    try {
        await prisma.user.update({
            where: { id },
            data: { role }
        })
        revalidatePath('/admin')
        return { success: "Rol actualizado correctamente" }
    } catch (error) {
        return { error: error.message }
    }
}
