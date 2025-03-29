'use client';

import {
    Alert,
    Chip,
    Divider,
    Paper,
    Stack,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from '@mui/material';
import MainLayout from '@/components/layout/MainLayout';
import { useEffect } from 'react';
import { ROUTE } from '@/utils/constant';
import toast from 'react-hot-toast';
import { errorResponse } from '@/utils';
import useAPI from '@/hooks/useAPI';
import { API } from '@/utils/api';
import Markdown from 'react-markdown';
import { useSearchParams } from 'next/navigation';
import { LaporanResponseType } from '@/types/responses/laporan.interface';
import ShowLoading from '@/components/preview/ShowLoading';
import { getStatusDataColor, STATUS_DATA } from '@/ref/status';
import dayjs from 'dayjs';
import Img from '@/components/preview/Img';

const steps = [
    STATUS_DATA.DITERUSKAN.key,
    STATUS_DATA.DIPROSES.key,
    STATUS_DATA.DITOLAK.key,
    STATUS_DATA.SELESAI.key,
];

export default function FormViewPage() {
    const searchParams = useSearchParams();
    const paramsId = searchParams.get('id') || '';

    const { data: laporan, ...apiGetLaporan } = useAPI<
        LaporanResponseType,
        number
    >(API.getFormLaporanById, {
        onError: (err) => toast.error(errorResponse(err)),
        dataKey: 'data',
    });

    useEffect(() => {
        if (paramsId) {
            apiGetLaporan.call(Number(paramsId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsId]);

    const activeStep = steps.findIndex((item) => item === laporan?.status);

    return (
        <MainLayout title={ROUTE.FORM.TITLE}>
            <Paper className='p-4 pt-6 bg-transparent-75 mx-auto max-w-4xl'>
                <Stack spacing={2}>
                    <ShowLoading show={apiGetLaporan.loading} />
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div className='flex justify-between'>
                        <Typography
                            gutterBottom
                            sx={{ color: 'text.secondary', fontSize: 14 }}
                        >
                            {laporan?.user_name}
                        </Typography>
                        <Chip
                            label={laporan?.status}
                            size='small'
                            variant='outlined'
                            color={getStatusDataColor(laporan?.status)}
                        />
                    </div>
                    <TextField
                        label='Judul Laporan'
                        value={laporan?.judul || ''}
                        fullWidth
                    />
                    <TextField
                        label='Deskripsi Laporan'
                        value={laporan?.deskripsi || ''}
                        fullWidth
                        minRows={4}
                        multiline
                    />
                    {laporan?.photo && (
                        <Img
                            src={laporan.photo}
                            width='100%'
                            className='max-w-60'
                        />
                    )}

                    <Divider />

                    <Typography
                        sx={{ color: 'text.secondary', marginY: '8px' }}
                    >
                        Instansi Terkait : {laporan?.instansi.join(', ')}
                    </Typography>
                    <Alert severity='success'>
                        Tanggapan:
                        <Markdown>{laporan?.tanggapan}</Markdown>
                    </Alert>

                    <Typography
                        variant='caption'
                        component='div'
                        textAlign='end'
                        className='-mt-4'
                    >
                        {dayjs(laporan?.updated_at).format('YYYY-MM-DD HH:mm')}
                    </Typography>
                </Stack>
            </Paper>
        </MainLayout>
    );
}
