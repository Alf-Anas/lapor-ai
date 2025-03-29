import ShowLoading from '@/components/preview/ShowLoading';
import { STATUS_DATA } from '@/ref/status';
import { LaporanResponseType } from '@/types/responses/laporan.interface';
import { formatDecimalNumber } from '@/utils/helper';
import { Card, CardContent, Grid2 as Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const summaryData = [
    {
        key: 'total_reports_received',
        label: 'Jumlah Laporan Diterima',
        value: 0,
        description: 'Jumlah total laporan yang telah diterima oleh sistem.',
    },
    {
        key: 'total_reports_in_progress',
        label: 'Jumlah Laporan Diproses',
        value: 0,
        description: 'Jumlah laporan yang sedang dalam proses penanganan.',
    },
    {
        key: 'total_reports_rejected',
        label: 'Jumlah Laporan Ditolak',
        value: 0,
        description: 'Jumlah laporan yang ditolak karena alasan tertentu.',
    },
    {
        key: 'total_reports_completed',
        label: 'Jumlah Laporan Selesai',
        value: 0,
        description: 'Jumlah laporan yang telah selesai ditangani.',
    },
    {
        key: 'percentage_reports_completed',
        label: 'Persentase Laporan Selesai',
        value: 0,
        satuan: '%',
        description:
            'Persentase laporan yang telah selesai ditangani dibandingkan dengan total laporan yang diterima.',
    },
];

type SummaryType = {
    total_reports_received: number;
    total_reports_in_progress: number;
    total_reports_rejected: number;
    total_reports_completed: number;
    percentage_reports_completed: number;
};

export default function SummaryView({
    list,
    loading,
}: {
    loading: boolean;
    list: LaporanResponseType[];
}) {
    const [dataSummary, setDataSummary] = useState<SummaryType>({
        total_reports_received: 0,
        total_reports_in_progress: 0,
        total_reports_rejected: 0,
        total_reports_completed: 0,
        percentage_reports_completed: 0,
    });

    useEffect(() => {
        if (list.length) {
            const totalReceived = list.length;
            const totalInProgress = list.filter(
                (item) => item.status === STATUS_DATA.DIPROSES.key
            ).length;
            const totalRejected = list.filter(
                (item) => item.status === STATUS_DATA.DITOLAK.key
            ).length;
            const totalCompleted = list.filter(
                (item) => item.status === STATUS_DATA.SELESAI.key
            ).length;

            const percentageCompleted =
                totalReceived > 0
                    ? ((totalCompleted / totalReceived) * 100).toFixed(2)
                    : 0;

            setDataSummary({
                total_reports_received: totalReceived,
                total_reports_in_progress: totalInProgress,
                total_reports_rejected: totalRejected,
                total_reports_completed: totalCompleted,
                percentage_reports_completed: Number(percentageCompleted),
            });
        }
    }, [list]);
    return (
        <>
            <Grid container spacing={2}>
                <ShowLoading show={loading} />
                {summaryData.map((item) => (
                    <Grid size={{ xs: 12, md: 6 }} key={item.key}>
                        <Card variant='outlined' sx={{ borderRadius: 4 }}>
                            <CardContent>
                                <Typography
                                    variant='h6'
                                    fontWeight='bold'
                                    gutterBottom
                                >
                                    {item.label}
                                </Typography>
                                <Typography
                                    variant='h4'
                                    color='primary'
                                    gutterBottom
                                >
                                    {dataSummary
                                        ? formatDecimalNumber(
                                              dataSummary[
                                                  item.key as keyof SummaryType
                                              ]
                                          )
                                        : 0}{' '}
                                    {item.satuan}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                >
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
