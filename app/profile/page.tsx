'use client';

import ProfilePage from '@/containers/ProfilePage';
import { AuthComponent } from '@/contexts/NextAuthContext';

export default function Home() {
    return (
        <AuthComponent needAuth>
            <ProfilePage />
        </AuthComponent>
    );
}
