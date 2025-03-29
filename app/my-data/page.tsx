import MyDataPage from '@/containers/MyDataPage';
import { AuthComponent } from '@/contexts/NextAuthContext';

export default function Home() {
    return (
        <AuthComponent needAuth>
            <MyDataPage />
        </AuthComponent>
    );
}
