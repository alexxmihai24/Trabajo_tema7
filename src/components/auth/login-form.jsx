"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/src/actions/auth-actions";
import { CardWrapper } from "@/src/components/auth/card-wrapper";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending} type="submit" className="w-full">
            {pending ? "Entrando..." : "Iniciar sesión"}
        </Button>
    );
}

export const LoginForm = () => {
    const [error, setError] = useState("");

    async function handleSubmit(formData) {
        const result = await login(null, formData);
        if (result?.error) {
            setError(result.error);
        }
    }

    return (
        <CardWrapper
            headerLabel="Bienvenido de nuevo"
            backButtonLabel="¿No tienes una cuenta?"
            backButtonHref="/auth/register"
            showSocial
        >
            <form action={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="ejemplo@correo.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="******"
                            required
                        />
                    </div>
                </div>
                {error && (
                    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                        <p>{error}</p>
                    </div>
                )}
                <SubmitButton />
            </form>
        </CardWrapper>
    );
};
