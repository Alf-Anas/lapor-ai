'use client';

import { Stack } from '@mui/material';
import MainLayout from '@/components/layout/MainLayout';
import { ROUTE } from '@/utils/constant';
import { RefreshContext } from '@/contexts/RefreshContext';
import useRefresh from '@/hooks/useRefresh';
import DataSection from './DataSection';

export default function MyDataPage() {
    const [refresh, setRefresh] = useRefresh();

    return (
        <MainLayout title={ROUTE.DATA_SAYA.TITLE}>
            <RefreshContext.Provider value={{ refresh, setRefresh }}>
                <Stack spacing={2} className='mx-auto max-w-4xl'>
                    <DataSection />
                </Stack>
            </RefreshContext.Provider>
        </MainLayout>
    );
}
