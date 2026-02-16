import { Poppins } from "next/font/google"; // or Inter if simpler
import { cn } from "@/src/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export const Header = ({ label }) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn("text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent", font.className)}>
                NextAuth
            </h1>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    );
};
