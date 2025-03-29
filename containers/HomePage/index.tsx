'use client';

import { Button, Paper, Stack, Typography } from '@mui/material';
import MainLayout from '@/components/layout/MainLayout';
import { METADATA } from '@/app/metadata';
import Img from '@/components/preview/Img';
import { useRouter } from 'next/navigation';
import { ROUTE } from '@/utils/constant';
import { signIn, useSession } from 'next-auth/react';
export default function HomePage() {
    const { status } = useSession();
    const router = useRouter();

    function onClickMulai() {
        if (status === 'unauthenticated') {
            signIn('keycloak');
        } else if (status === 'authenticated') {
            router.push(ROUTE.FORM.URL);
        }
    }
    return (
        <MainLayout>
            <Paper className='p-4 bg-transparent-50 mx-auto max-w-4xl'>
                <Stack spacing={2}>
                    <Typography variant='h6' gutterBottom>
                        Selamat Datang di {METADATA.SHORT_NAME}
                    </Typography>
                    <Typography
                        variant='body1'
                        gutterBottom
                        className='text-justify'
                    >
                        <b>{METADATA.LONG_NAME}</b> merupakan{' '}
                        {METADATA.LONG_DESCRIPTION}
                    </Typography>

                    <div className='flex items-center'>
                        <Img
                            src='/img/logo.png'
                            height={120}
                            alt='logo'
                            className='rounded-sm'
                        />
                        <Stack spacing={2} className='w-full max-w-xs'>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={onClickMulai}
                            >
                                Mulai
                            </Button>
                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={() => router.push(ROUTE.DASHBOARD.URL)}
                            >
                                {ROUTE.DASHBOARD.TITLE}
                            </Button>
                        </Stack>
                    </div>
                </Stack>
            </Paper>
        </MainLayout>
    );
}
