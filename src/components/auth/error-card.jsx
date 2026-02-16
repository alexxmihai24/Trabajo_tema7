import { CardWrapper } from "@/src/components/auth/card-wrapper";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Algo salió mal."
            backButtonHref="/auth/login"
            backButtonLabel="Volver al inicio de sesión"
        >
            <div className="w-full flex justify-center items-center text-red-500 text-4xl">
                ⚠️
            </div>
        </CardWrapper>
    );
}
