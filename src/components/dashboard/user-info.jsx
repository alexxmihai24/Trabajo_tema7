"use client";

import { useTransition, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { updateUserInfo } from "@/src/actions/user-actions";

export const UserInfo = ({ user }) => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (formData) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            updateUserInfo(formData)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    }
                    if (data?.success) {
                        setSuccess(data.success);
                    }
                })
                .catch(() => setError("Algo salió mal"));
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <h2 className="text-xl font-semibold">Editar Información</h2>
            <form action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Tu nombre"
                        defaultValue={user?.name}
                        disabled={isPending}
                    />
                </div>
                {/* Email is typically read-only or requires re-verification */}
                <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                        disabled
                        defaultValue={user?.email}
                        className="bg-slate-100"
                    />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}
                {success && <p className="text-sm text-green-600">{success}</p>}

                <Button type="submit" disabled={isPending}>
                    Guardar cambios
                </Button>
            </form>
        </div>
    );
};
