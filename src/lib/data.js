import prisma from '@/lib/prisma'

// Obtener usuario por ID
export async function obtenerUsuarioPorId(id) {
    const usuario = await prisma.user.findUnique({
        where: { id }
    });
    return usuario
}

// Obtener usuario por email
export async function obtenerUsuarioPorEmail(email) {
    const usuario = await prisma.user.findUnique({
        where: { email }
    });
    return usuario
}

// Obtener todos los usuarios (ordenados por nombre)
export async function obtenerUsuarios() {
    const usuarios = await prisma.user.findMany({
        orderBy: { name: 'asc' }
    });
    return usuarios
}
