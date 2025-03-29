'use client';

import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Skeleton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
    getStatusDataColor,
    STATUS_DATA,
    STATUS_DATA_LIST,
} from '@/ref/status';
import dayjs from 'dayjs';
import { errorResponse, searchArray } from '@/utils';
import { useRouter } from 'next/navigation';
import { ROUTE } from '@/utils/constant';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SimpleDialog from '@/components/dialog/SimpleDialog';
import toast from 'react-hot-toast';
import { useContext, useEffect, useState } from 'react';
import { API } from '@/utils/api';
import useAPI from '@/hooks/useAPI';
import { ObjectLiteral } from '@/types/object-literal.interface';
import { LaporanResponseType } from '@/types/responses/laporan.interface';
import Markdown from 'react-markdown';
import { RefreshContext } from '@/contexts/RefreshContext';
import ImgViewer from '@/components/preview/ImgViewer';

function DataCard({ laporan }: { laporan: LaporanResponseType }) {
    const router = useRouter();
    const { setRefresh } = useContext(RefreshContext);
    function onClickView() {
        router.push(ROUTE.FORM.VIEW.setURL(laporan.id));
    }
    function onClickDelete() {
        API.deleteFormLaporan(laporan.id)
            .then(() => {
                toast.success('Laporan berhasil dihapus!');
                setRefresh();
            })
            .catch((err) => {
                toast.error(errorResponse(err));
            });
    }

    return (
        <Card className='bg-transparent-25' elevation={4}>
            <CardContent className='relative pb-2'>
                <div className='absolute right-2 top-2 flex gap-1'>
                    <Chip
                        label={laporan?.status}
                        size='small'
                        variant='outlined'
                        color={getStatusDataColor(laporan?.status)}
                    />
                </div>
                <Typography
                    gutterBottom
                    sx={{ color: 'text.secondary', fontSize: 14 }}
                >
                    {laporan.user_name}
                </Typography>
                <Typography variant='h5' component='div'>
                    {laporan.judul}
                </Typography>
                <Typography variant='body2'>{laporan.deskripsi}</Typography>
                {laporan.photo && (
                    <ImgViewer
                        src={laporan.photo}
                        width='100%'
                        className='max-w-60'
                    />
                )}
                <Typography sx={{ color: 'text.secondary', marginY: '8px' }}>
                    Instansi Terkait : {laporan.instansi.join(', ')}
                </Typography>

                <Alert severity='success'>
                    Tanggapan:
                    <Markdown>{laporan.tanggapan}</Markdown>
                </Alert>

                <Typography
                    variant='caption'
                    component='div'
                    textAlign='end'
                    className='-mt-4'
                >
                    {dayjs(laporan.updated_at).format('YYYY-MM-DD HH:mm')}
                </Typography>
            </CardContent>
            <CardActions className='px-4'>
                <Button
                    size='small'
                    color='primary'
                    variant='contained'
                    onClick={onClickView}
                    startIcon={<VisibilityIcon />}
                    sx={{ textTranslaporan: 'none' }}
                >
                    Lihat
                </Button>

                {laporan.status === STATUS_DATA.DITERUSKAN.key && (
                    <SimpleDialog
                        title='Hapus Laporan?'
                        triggerButton={
                            <IconButton color='error'>
                                <DeleteIcon />
                            </IconButton>
                        }
                        okColor='error'
                        okLabel='Hapus'
                        maxWidth='lg'
                        onOk={onClickDelete}
                    >
                        <Typography variant='body1'>
                            Anda yakin untuk menghapus laporan{' '}
                            <b>{laporan.judul}</b>?
                        </Typography>
                    </SimpleDialog>
                )}
            </CardActions>
        </Card>
    );
}

export default function DataSection() {
    const [listData, setListData] = useState<LaporanResponseType[]>([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [searchTxt, setSearchTxt] = useState('');
    const { refresh } = useContext(RefreshContext);

    const apiListLaporan = useAPI<
        ObjectLiteral,
        undefined,
        LaporanResponseType[]
    >(API.getMyFormLaporan, {
        listkey: 'data',
        onError: (err) => toast.error(errorResponse(err)),
    });

    useEffect(() => {
        apiListLaporan.call();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    useEffect(() => {
        if (apiListLaporan.list?.length) {
            let eLaporan = apiListLaporan.list;
            if (selectedStatus) {
                eLaporan = eLaporan.filter(
                    (item) => item.status === selectedStatus
                );
            }
            if (searchTxt) {
                eLaporan = searchArray(searchTxt, eLaporan, [
                    'judul',
                    'deskripsi',
                    'tanggapan',
                ]);
            }
            setListData(eLaporan);
        } else {
            setListData([]);
        }
    }, [apiListLaporan.list, searchTxt, selectedStatus]);

    return (
        <Paper className='p-4 pt-6 bg-transparent-50'>
            <Stack
                direction={{
                    xs: 'column',
                    sm: 'row',
                    md: 'row',
                    lg: 'row',
                }}
                spacing={1}
                className='bg-transparent-50'
            >
                <TextField
                    label='Cari'
                    variant='outlined'
                    fullWidth
                    size='small'
                    value={searchTxt}
                    onChange={(e) => setSearchTxt(e.target.value)}
                />
                <Select
                    size='small'
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    displayEmpty
                    fullWidth
                >
                    <MenuItem value=''>--- Semua Status ---</MenuItem>
                    {STATUS_DATA_LIST.map((item, idx) => (
                        <MenuItem key={idx} value={item.key}>
                            {item.key}
                        </MenuItem>
                    ))}
                </Select>
            </Stack>
            {listData.length === 0 && !apiListLaporan.loading && (
                <Alert
                    severity='info'
                    variant='outlined'
                    sx={{ marginTop: '1rem' }}
                >
                    Laporan tidak ditemukan!
                </Alert>
            )}
            {apiListLaporan.loading && (
                <Skeleton
                    variant='rounded'
                    width='100%'
                    height={150}
                    className='my-8'
                />
            )}
            <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
                {listData.map((item, idx) => {
                    return (
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} key={idx}>
                            <DataCard laporan={item} />
                        </Grid>
                    );
                })}
            </Grid>
        </Paper>
    );
}
