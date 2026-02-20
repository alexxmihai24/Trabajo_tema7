"use client";

import { useRef } from "react";
import { Button } from "@/src/components/ui/button";
import { X } from "lucide-react";

export function Modal({ children, trigger }) {
    const dialogRef = useRef(null);
    const open = () => dialogRef.current?.showModal();
    const close = () => dialogRef.current?.close();

    const handleBackdropClick = (e) => {
        if (dialogRef.current) {
            const rect = dialogRef.current.getBoundingClientRect();
            const inside =
                rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                rect.left <= e.clientX && e.clientX <= rect.left + rect.width;
            if (!inside) dialogRef.current.close();
        }
    };

    return (
        <>
            <div onClick={open} className="inline-block cursor-pointer">
                {trigger}
            </div>
            <dialog
                ref={dialogRef}
                onMouseDown={handleBackdropClick}
                className="m-auto w-[90%] max-w-lg rounded-xl p-6 shadow-2xl outline-none backdrop:bg-black/50 backdrop:backdrop-blur-sm"
            >
                <button
                    type="button"
                    onClick={close}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                >
                    <X className="h-5 w-5" />
                </button>
                <div className="space-y-4">{children}</div>
            </dialog>
        </>
    );
}
