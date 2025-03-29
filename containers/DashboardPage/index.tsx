'use client';

import { Paper, Stack } from '@mui/material';
import MainLayout from '@/components/layout/MainLayout';
import { ROUTE } from '@/utils/constant';
import SummaryView from './SummaryView';
import useAPI from '@/hooks/useAPI';
import { ObjectLiteral } from '@/types/object-literal.interface';
import { LaporanResponseType } from '@/types/responses/laporan.interface';
import { API } from '@/utils/api';
import toast from 'react-hot-toast';
import { errorResponse } from '@/utils';
import DataSection from './DataSection';

export default function DashboardPage() {
    const apiListLaporan = useAPI<
        ObjectLiteral,
        undefined,
        LaporanResponseType[]
    >(API.getAllFormLaporan, {
        listkey: 'data',
        onError: (err) => toast.error(errorResponse(err)),
        callOnFirstRender: true,
    });

    return (
        <MainLayout title={ROUTE.DASHBOARD.TITLE}>
            <Paper className='p-4 pt-6 bg-transparent-50 mx-auto max-w-4xl'>
                <Stack spacing={2}>
                    <SummaryView
                        loading={apiListLaporan.loading}
                        list={apiListLaporan.list || []}
                    />
                    <DataSection
                        loading={apiListLaporan.loading}
                        list={apiListLaporan.list || []}
                    />
                </Stack>
            </Paper>
        </MainLayout>
    );
}
