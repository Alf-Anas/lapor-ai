'use client';

import {
    Alert,
    Button,
    Divider,
    IconButton,
    Paper,
    Stack,
    TextField,
} from '@mui/material';
import MainLayout from '@/components/layout/MainLayout';
import { useState } from 'react';
import { ROUTE } from '@/utils/constant';
import toast from 'react-hot-toast';
import { errorResponse } from '@/utils';
import FileUpload from '@/components/button/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { compressImage } from '@/utils/helper';
import PhotoIcon from '@mui/icons-material/Photo';
import ImgViewer from '@/components/preview/ImgViewer';
import useAPI from '@/hooks/useAPI';
import { RulesSettingType } from '@/types/rules-setting.interface';
import { API } from '@/utils/api';
import { AIResponseType } from '@/types/responses/ai.interface';
import Markdown from 'react-markdown';
import { useRouter } from 'next/navigation';

export default function FormPage() {
    const router = useRouter();
    const [inputData, setInputData] = useState({
        title: '',
        description: '',
        photo: '',
    });

    async function onChangeFiles(files: File[]) {
        if (files.length > 0) {
            compressImage(files[0])
                .then((res) => {
                    setInputData({ ...inputData, photo: res });
                })
                .catch((err) => {
                    setInputData({ ...inputData, photo: '' });
                    toast.error(errorResponse(err));
                });
        } else {
            setInputData({ ...inputData, photo: '' });
        }
    }

    const apiPostForm = useAPI<AIResponseType, RulesSettingType>(
        API.postFormLaporan,
        {
            onError: (err) => toast.error(errorResponse(err)),
            dataKey: 'data',
        }
    );

    function onClickBuatLaporan() {
        apiPostForm.clearData();
        apiPostForm.call({
            judul_laporan: inputData.title,
            deskripsi_laporan: inputData.description,
            photo: inputData.photo,
        });
    }

    const laporanValid = apiPostForm.data?.valid;

    return (
        <MainLayout title={ROUTE.FORM.TITLE}>
            <Paper className='p-4 pt-6 bg-transparent-75 mx-auto max-w-4xl'>
                <Stack spacing={2}>
                    <TextField
                        label='Judul Laporan'
                        value={inputData.title}
                        onChange={(e) =>
                            setInputData({
                                ...inputData,
                                title: e.target.value,
                            })
                        }
                        fullWidth
                        disabled={laporanValid}
                    />
                    <TextField
                        label='Deskripsi Laporan'
                        value={inputData.description}
                        onChange={(e) =>
                            setInputData({
                                ...inputData,
                                description: e.target.value,
                            })
                        }
                        fullWidth
                        minRows={4}
                        maxRows={10}
                        multiline
                        disabled={laporanValid}
                    />

                    {inputData.photo && (
                        <ImgViewer
                            src={inputData.photo}
                            width='100%'
                            className='max-w-60'
                        />
                    )}
                    {!laporanValid && (
                        <div className='flex gap-1 max-w-60'>
                            <FileUpload
                                label='Pilih Foto'
                                acceptType='image'
                                icon={<PhotoIcon />}
                                onChange={onChangeFiles}
                                className='w-full'
                                variant='outlined'
                            />
                            {inputData.photo && (
                                <IconButton
                                    color='error'
                                    onClick={() =>
                                        setInputData({
                                            ...inputData,
                                            photo: '',
                                        })
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </div>
                    )}

                    <Divider />
                    {apiPostForm.data?.valid === false && (
                        <Alert severity='error'>
                            Error
                            <Markdown>{apiPostForm.data?.tanggapan}</Markdown>
                        </Alert>
                    )}

                    {!laporanValid && (
                        <Button
                            fullWidth
                            variant='contained'
                            className='mt-8'
                            onClick={onClickBuatLaporan}
                            disabled={
                                !inputData.title || !inputData.description
                            }
                            loading={apiPostForm.loading}
                        >
                            Buat Laporan
                        </Button>
                    )}

                    {laporanValid && (
                        <>
                            <Alert severity='success'>
                                Tanggapan:
                                <Markdown>
                                    {apiPostForm.data?.tanggapan}
                                </Markdown>
                            </Alert>

                            <Button
                                fullWidth
                                variant='contained'
                                className='mt-8'
                                onClick={() => {
                                    router.push(ROUTE.DATA_SAYA.URL);
                                }}
                            >
                                Tutup
                            </Button>
                        </>
                    )}
                </Stack>
            </Paper>
        </MainLayout>
    );
}
