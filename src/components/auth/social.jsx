"use client";

import { useTransition } from "react";
import { Github } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { socialLogin } from "@/src/actions/auth-actions";

export const Social = () => {
    const [isPending, startTransition] = useTransition();

    const handleSocialLogin = (provider) => {
        startTransition(() => {
            socialLogin(provider);
        });
    };

    return (
        <div className="flex w-full items-center gap-x-2">
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => handleSocialLogin("google")}
                disabled={isPending}
            >
                <span className="mr-2">G</span>
                Google
            </Button>
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => handleSocialLogin("github")}
                disabled={isPending}
            >
                <Github className="h-5 w-5 mr-2" />
                Github
            </Button>
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => handleSocialLogin("discord")}
                disabled={isPending}
            >
                <span className="mr-2">D</span>
                Discord
            </Button>
        </div>
    );
};
