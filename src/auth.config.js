export const authConfig = {
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
            const isOnAdmin = nextUrl.pathname.startsWith("/admin");
            const isAuthPage =
                nextUrl.pathname === "/auth/login" ||
                nextUrl.pathname === "/auth/register";

            // Protect /admin — ADMIN only
            if (isOnAdmin) {
                if (!isLoggedIn) return false;
                if (auth?.user?.role !== "ADMIN")
                    return Response.redirect(new URL("/dashboard", nextUrl));
                return true;
            }

            // Protect /dashboard — any authenticated user
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // redirect to login
            }

            // Redirect logged-in users away from login/register pages
            if (isLoggedIn && isAuthPage) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }

            return true;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        }
    },
    providers: [], // Providers added in auth.js to avoid edge incompatibility
};

