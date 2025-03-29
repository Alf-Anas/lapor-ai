import FormViewPage from '@/containers/FormPage/View';
import { Suspense } from 'react';

export default function Home() {
    return (
        <Suspense>
            <FormViewPage />
        </Suspense>
    );
}
