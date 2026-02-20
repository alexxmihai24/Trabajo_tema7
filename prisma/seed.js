const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Limpiar datos previos
    await db.estudiante.deleteMany();
    await db.asignatura.deleteMany();
    await db.grupo.deleteMany();

    // ── ASIGNATURAS ──────────────────────────────────────
    const asignaturas = await Promise.all([
        db.asignatura.create({ data: { nombre: "Matemáticas", profesor: "Carlos Ruiz", horasSemana: 4 } }),
        db.asignatura.create({ data: { nombre: "Lengua y Literatura", profesor: "Ana Pérez", horasSemana: 4 } }),
        db.asignatura.create({ data: { nombre: "Historia", profesor: "Luis García", horasSemana: 3 } }),
        db.asignatura.create({ data: { nombre: "Inglés", profesor: "Sarah Johnson", horasSemana: 4 } }),
        db.asignatura.create({ data: { nombre: "Física", profesor: "Miguel Torres", horasSemana: 3 } }),
        db.asignatura.create({ data: { nombre: "Educación Física", profesor: "David Morales", horasSemana: 2 } }),
        db.asignatura.create({ data: { nombre: "Programación Web", profesor: "Elena Sánchez", horasSemana: 5 } }),
        db.asignatura.create({ data: { nombre: "Bases de Datos", profesor: "Raúl Ortega", horasSemana: 4 } }),
    ]);

    console.log(`✅ ${asignaturas.length} asignaturas creadas`);

    // ── GRUPOS ───────────────────────────────────────────
    const g1 = await db.grupo.create({ data: { nombre: "1º DAW", tutor: "Elena Sánchez", aula: "Aula 12" } });
    const g2 = await db.grupo.create({ data: { nombre: "2º DAW", tutor: "Raúl Ortega", aula: "Aula 8" } });
    const g3 = await db.grupo.create({ data: { nombre: "1º ESO A", tutor: "Ana Pérez", aula: "Aula 3" } });
    const g4 = await db.grupo.create({ data: { nombre: "2º ESO B", tutor: "Carlos Ruiz", aula: "Aula 5" } });
    const g5 = await db.grupo.create({ data: { nombre: "Bachillerato Ciencias", tutor: "Miguel Torres", aula: "Aula 15" } });

    console.log("✅ 5 grupos creados");

    // ── ESTUDIANTES ──────────────────────────────────────
    const estudiantesData = [
        // 1º DAW
        { nombre: "Alejandro Martínez", tutorLegal: "Pedro Martínez", fechaNacimiento: new Date("2003-04-12"), grupoId: g1.id, asignaturas: { connect: [{ id: asignaturas[6].id }, { id: asignaturas[7].id }, { id: asignaturas[3].id }] } },
        { nombre: "Sofía López", tutorLegal: "Carmen López", fechaNacimiento: new Date("2003-07-22"), grupoId: g1.id, asignaturas: { connect: [{ id: asignaturas[6].id }, { id: asignaturas[7].id }] } },
        { nombre: "Daniel Rodríguez", tutorLegal: "Marta Rodríguez", fechaNacimiento: new Date("2002-11-15"), grupoId: g1.id, asignaturas: { connect: [{ id: asignaturas[6].id }, { id: asignaturas[3].id }] } },
        { nombre: "Laura Gómez", tutorLegal: "José Gómez", fechaNacimiento: new Date("2003-02-28"), grupoId: g1.id, asignaturas: { connect: [{ id: asignaturas[6].id }, { id: asignaturas[7].id }, { id: asignaturas[5].id }] } },

        // 2º DAW
        { nombre: "Carlos Fernández", tutorLegal: "Isabel Fernández", fechaNacimiento: new Date("2002-06-08"), grupoId: g2.id, asignaturas: { connect: [{ id: asignaturas[6].id }, { id: asignaturas[7].id }, { id: asignaturas[3].id }] } },
        { nombre: "María Jiménez", tutorLegal: "Antonio Jiménez", fechaNacimiento: new Date("2001-09-14"), grupoId: g2.id, asignaturas: { connect: [{ id: asignaturas[6].id }, { id: asignaturas[7].id }] } },
        { nombre: "Pablo Díaz", tutorLegal: "Rosario Díaz", fechaNacimiento: new Date("2002-01-30"), grupoId: g2.id, asignaturas: { connect: [{ id: asignaturas[6].id }] } },

        // 1º ESO A
        { nombre: "Lucía Hernández", tutorLegal: "Fernando Hernández", fechaNacimiento: new Date("2011-03-05"), grupoId: g3.id, asignaturas: { connect: [{ id: asignaturas[0].id }, { id: asignaturas[1].id }, { id: asignaturas[2].id }, { id: asignaturas[3].id }] } },
        { nombre: "Miguel Muñoz", tutorLegal: "Elena Muñoz", fechaNacimiento: new Date("2011-08-17"), grupoId: g3.id, asignaturas: { connect: [{ id: asignaturas[0].id }, { id: asignaturas[1].id }, { id: asignaturas[5].id }] } },
        { nombre: "Elena Alonso", tutorLegal: "Jorge Alonso", fechaNacimiento: new Date("2010-12-25"), grupoId: g3.id, asignaturas: { connect: [{ id: asignaturas[0].id }, { id: asignaturas[2].id }, { id: asignaturas[3].id }] } },

        // 2º ESO B
        { nombre: "Adrián Moreno", tutorLegal: "Pilar Moreno", fechaNacimiento: new Date("2010-05-19"), grupoId: g4.id, asignaturas: { connect: [{ id: asignaturas[0].id }, { id: asignaturas[1].id }, { id: asignaturas[5].id }] } },
        { nombre: "Natalia Romero", tutorLegal: "Víctor Romero", fechaNacimiento: new Date("2010-10-11"), grupoId: g4.id, asignaturas: { connect: [{ id: asignaturas[0].id }, { id: asignaturas[3].id }] } },
        { nombre: "Javier Navarro", tutorLegal: "Concepción Navarro", fechaNacimiento: new Date("2009-07-23"), grupoId: g4.id, asignaturas: { connect: [{ id: asignaturas[1].id }, { id: asignaturas[2].id }] } },

        // Bachillerato
        { nombre: "Cristina Torres", tutorLegal: "Paco Torres", fechaNacimiento: new Date("2007-01-04"), grupoId: g5.id, asignaturas: { connect: [{ id: asignaturas[0].id }, { id: asignaturas[4].id }, { id: asignaturas[3].id }] } },
        { nombre: "Sergio Vega", tutorLegal: "Beatriz Vega", fechaNacimiento: new Date("2007-06-30"), grupoId: g5.id, asignaturas: { connect: [{ id: asignaturas[0].id }, { id: asignaturas[4].id }] } },
        { nombre: "Patricia Iglesias", tutorLegal: "Manuel Iglesias", fechaNacimiento: new Date("2006-11-09"), grupoId: g5.id, asignaturas: { connect: [{ id: asignaturas[0].id }, { id: asignaturas[4].id }, { id: asignaturas[5].id }] } },
    ];

    for (const data of estudiantesData) {
        await db.estudiante.create({ data });
    }

    console.log(`✅ ${estudiantesData.length} estudiantes creados`);
    console.log("🎉 Seed completado!");
}

main()
    .catch((e) => {
        console.error("❌ Error en seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
