"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
    Menu,
    X,
    LayoutDashboard,
    Users,
    BookOpen,
    GraduationCap,
    ShieldCheck,
    LogOut,
} from "lucide-react";

export function SidebarMobile({ isAdmin, userName, userRole }) {
    const [open, setOpen] = useState(false);

    const navLinks = [
        { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
        { href: "/dashboard/grupos", label: "Grupos", icon: Users },
        { href: "/dashboard/estudiantes", label: "Estudiantes", icon: GraduationCap },
        { href: "/dashboard/asignaturas", label: "Asignaturas", icon: BookOpen },
        ...(isAdmin ? [{ href: "/admin", label: "Gestión Usuarios", icon: ShieldCheck }] : []),
    ];

    return (
        <>
            {/* Mobile top bar */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-background sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {userName?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold text-sm truncate max-w-[140px]">{userName}</p>
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${isAdmin ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}>
                            {userRole}
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => setOpen(!open)}
                    className="p-2 rounded-md hover:bg-muted transition-colors"
                    aria-label="Abrir menú"
                >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Mobile overlay menu */}
            {open && (
                <div
                    className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm"
                    style={{ top: "53px" }}
                    onClick={() => setOpen(false)}
                >
                    <nav className="p-3 space-y-1" onClick={(e) => e.stopPropagation()}>
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                {label}
                            </Link>
                        ))}
                        <div className="pt-2 border-t mt-2">
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="flex items-center gap-3 w-full px-3 py-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
                            >
                                <LogOut className="h-4 w-4 shrink-0" />
                                Cerrar Sesión
                            </button>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}
