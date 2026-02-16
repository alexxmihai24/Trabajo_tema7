"use client";

import { Github } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { socialLogin } from "@/src/actions/auth-actions";

export const Social = () => {

    return (
        <div className="flex w-full items-center gap-x-2">
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => socialLogin("google")}
            >
                <span className="mr-2">G</span>
                Google
            </Button>
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => socialLogin("github")}
            >
                <Github className="h-5 w-5 mr-2" />
                Github
            </Button>
        </div>
    );
};
