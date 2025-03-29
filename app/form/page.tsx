import FormPage from '@/containers/FormPage';
import { AuthComponent } from '@/contexts/NextAuthContext';

export default function Home() {
    return (
        <AuthComponent needAuth>
            <FormPage />
        </AuthComponent>
    );
}
