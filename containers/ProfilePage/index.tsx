'use client';

import * as React from 'react';
import {
    Button,
    Divider,
    FormControl,
    FormLabel,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@mui/material/Card';
import ShowLoading from '@/components/preview/ShowLoading';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSession } from 'next-auth/react';
import useLogout from '@/hooks/useLogout';

export default function ProfilePage() {
    const { data: profile, status } = useSession();
    const { signout } = useLogout();

    return (
        <MainLayout>
            <div className='p-4 w-full items-center'>
                <Card
                    className='max-w-md mx-auto mt-4 px-4 py-6 bg-transparent-75 rounded-lg'
                    elevation={10}
                >
                    <Stack spacing={2}>
                        <Typography
                            component='h1'
                            variant='h4'
                            sx={{
                                width: '100%',
                                textAlign: 'center',
                            }}
                        >
                            Profil
                        </Typography>
                        <Divider />
                        <ShowLoading show={status === 'loading'} />
                        <Stack spacing={1}>
                            <FormControl>
                                <FormLabel htmlFor='nama'>Nama</FormLabel>
                                <TextField
                                    value={profile?.name || ''}
                                    id='nama'
                                    type='text'
                                    name='nama'
                                    autoFocus
                                    required
                                    fullWidth
                                    variant='outlined'
                                    disabled
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <TextField
                                    value={profile?.email || ''}
                                    id='email'
                                    type='email'
                                    name='email'
                                    autoComplete='email'
                                    autoFocus
                                    required
                                    fullWidth
                                    variant='outlined'
                                    disabled
                                />
                            </FormControl>
                        </Stack>

                        <Button
                            fullWidth
                            variant='contained'
                            onClick={signout}
                            color='error'
                            startIcon={<LogoutIcon />}
                        >
                            Keluar
                        </Button>
                    </Stack>
                </Card>
            </div>
        </MainLayout>
    );
}
