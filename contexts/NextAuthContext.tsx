'use client';

import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import { setCookie } from 'cookies-next';
import { COOKIES, ROUTE } from '@/utils/constant';
import { useRouter } from 'next/navigation';
import ShowLoading from '@/components/preview/ShowLoading';

export function AuthComponent({
    children,
    needAuth,
}: {
    children: ReactNode;
    needAuth?: boolean;
}) {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (needAuth) {
            if (session.status === 'unauthenticated') {
                router.push(ROUTE.HOME.URL);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [needAuth, session]);
    return (
        <>
            {needAuth ? (
                <>
                    {session.status === 'loading' && <ShowLoading show />}
                    {session.status === 'authenticated' && <>{children}</>}
                </>
            ) : (
                <>{children}</>
            )}
        </>
    );
}

function AuthProvider({ children }: { children: ReactNode }) {
    const session = useSession();

    useEffect(() => {
        if (session?.data?.error === 'RefreshAccessTokenError') {
            // Force sign in to resolve the error
            signIn('keycloak');
        }
        if (session.data?.access_token) {
            setCookie(COOKIES.TOKEN, session.data?.access_token);
        }

        // Update the session when idle or keep use the main app
        let timerId: NodeJS.Timeout | undefined;
        if (session.data?.expires_at) {
            const willExpiresIn = Math.abs(
                session.data?.expires_at - Math.floor(Date.now() / 1000)
            );
            timerId = setTimeout(() => {
                session.update();
            }, willExpiresIn * 1000);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [session]);
    return <>{children}</>;
}

export default function NextAuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <SessionProvider>
            <AuthProvider>{children}</AuthProvider>
        </SessionProvider>
    );
}
