# Sistema de Autenticación - Trabajo Tema 7

Sistema completo de autenticación desarrollado con Next.js 16, NextAuth 5, Prisma y PostgreSQL.

## ✨ Características Principales

- ✅ **Autenticación OAuth**: Google, GitHub y Discord
- ✅ **Credenciales Locales**: Email y contraseña
- ✅ **Sistema de Roles**: Usuario y Administrador
- ✅ **Panel Personal**: Gestión de perfil de usuario
- ✅ **Panel de Administración**: CRUD completo de usuarios
- ✅ **Rutas Protegidas**: Middleware de autenticación
- ✅ **Base de Datos**: PostgreSQL con Prisma ORM

## 📋 Requisitos Previos

- Node.js 18 o superior
- Cuenta en [Neon.tech](https://neon.tech) (base de datos PostgreSQL)
- Credenciales OAuth (opcional):
  - [Google Cloud Console](https://console.developers.google.com)
  - [GitHub Developer Settings](https://github.com/settings/developers)
  - [Discord Developer Portal](https://discord.com/developers/applications)

## 🚀 Instalación

### 1. Instalar dependencias

\`\`\`bash
npm install
\`\`\`

### 2. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

\`\`\`bash
cp .env.example .env
\`\`\`

Edita `.env` y completa:

\`\`\`env
# Base de datos (REQUERIDO)
DATABASE_URL="postgresql://usuario:contraseña@host/base_datos"

# Secreto de autenticación (REQUERIDO)
AUTH_SECRET="tu-secreto-aqui"  # Genera con: npx auth secret

# OAuth Google (OPCIONAL)
AUTH_GOOGLE_ID="tu-google-client-id"
AUTH_GOOGLE_SECRET="tu-google-secret"

# OAuth GitHub (OPCIONAL)
AUTH_GITHUB_ID="tu-github-client-id"
AUTH_GITHUB_SECRET="tu-github-secret"

# OAuth Discord (OPCIONAL)
AUTH_DISCORD_ID="tu-discord-client-id"
AUTH_DISCORD_SECRET="tu-discord-secret"
\`\`\`

### 3. Configurar base de datos

\`\`\`bash
# Generar cliente de Prisma
npx prisma generate

# Sincronizar esquema con la base de datos
npx prisma db push
\`\`\`

### 4. Crear usuario administrador

Abre Prisma Studio:

\`\`\`bash
npx prisma studio
\`\`\`

Crea un usuario con:
- **name**: Administrador
- **email**: admin@example.com
- **password**: (hash bcrypt de tu contraseña)
- **role**: ADMIN
- **active**: true

## 🏃‍♂️ Desarrollo

Inicia el servidor de desarrollo:

\`\`\`bash
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000)

## 📂 Estructura del Proyecto

\`\`\`
Trabajo_tema7/
├── src/
│   ├── app/                    # Páginas de la aplicación
│   │   ├── auth/               # Autenticación
│   │   │   └── iniciar-sesion/ # Página de login/registro
│   │   ├── panel/              # Panel personal del usuario
│   │   ├── admin/              # Panel de administración
│   │   └── api/                # API routes
│   ├── components/             # Componentes reutilizables
│   │   ├── auth/               # Componentes de autenticación
│   │   ├── encabezado.jsx      # Barra de navegación
│   │   ├── tabla-usuarios.jsx  # Tabla de gestión
│   │   └── ...
│   ├── lib/                    # Utilidades
│   │   ├── prisma.js           # Cliente Prisma
│   │   ├── data.js             # Consultas a BD
│   │   └── acciones.js         # Server Actions
│   ├── auth.js                 # Configuración NextAuth
│   └── auth.config.js          # Proveedores OAuth
├── prisma/
│   └── schema.prisma           # Esquema de base de datos
├── middleware.js               # Protección de rutas
└── package.json

\`\`\`

## 🎯 Funcionalidades por Rol

### 👤 Usuario (USER)
- Registrarse con OAuth o credenciales
- Iniciar y cerrar sesión
- Ver y editar su perfil personal
- Acceder al panel `/panel`

### 👨‍💼 Administrador (ADMIN)
- Todas las funcionalidades de Usuario
- Acceder al panel de administración `/admin`
- Ver lista completa de usuarios
- Modificar roles de usuarios
- Eliminar usuarios
- Cambiar estado activo/inactivo

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 16, React 19
- **Autenticación**: NextAuth 5 (Auth.js)
- **Base de Datos**: PostgreSQL (Neon.tech)
- **ORM**: Prisma 6
- **Estilos**: Tailwind CSS 4
- **Iconos**: Lucide React
- **Encriptación**: bcryptjs

## 📝 Scripts Disponibles

\`\`\`bash
npm run dev          # Servidor de desarrollo
npm run build        # Compilar para producción
npm run start        # Iniciar servidor de producción
npm run lint         # Verificar código con ESLint
\`\`\`

## 🔒 Seguridad

- Contraseñas encriptadas con bcrypt (10 rounds)
- Sesiones JWT firmadas
- Rutas protegidas con middleware
- Validación de roles en servidor
- Variables de entorno para credenciales

## 📚 Documentación de Referencia

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js (Auth.js)](https://authjs.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 👨‍💻 Autor

**Alex** - Trabajo Tema 7 - DWEC  
Grado Superior - 2026

## 📄 Licencia

Proyecto educativo - Uso libre para fines académicos
