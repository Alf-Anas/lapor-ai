export const STATUS_DATA = {
    DITERUSKAN: {
        id: 1,
        key: '1:DITERUSKAN',
        label: 'Diteruskan',
        description: 'Laporan telah diteruskan ke instansi terkait',
    },
    DIPROSES: {
        id: 2,
        key: '2:DIPROSES',
        label: 'Diproses',
        description: 'Laporan sudah diproses oleh instansi terkait',
    },
    DITOLAK: {
        id: 3,
        key: '3:DITOLAK',
        label: 'Ditolak',
        description:
            'Setelah dilakukan pengecekan oleh instansi terkait, laporan ditolak',
    },
    SELESAI: {
        id: 4,
        key: '4:SELESAI',
        label: 'Selesai',
        description: 'Laporan telah diselesaikan oleh instansi terkait',
    },
}

export const STATUS_DATA_LIST = Object.values(STATUS_DATA)

export function getStatusDataColor(
    key: string | undefined
):
    | 'error'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning' {
    switch (key) {
        case STATUS_DATA.DITERUSKAN.key:
            return 'warning'
        case STATUS_DATA.DIPROSES.key:
            return 'info'
        case STATUS_DATA.DITOLAK.key:
            return 'error'
        case STATUS_DATA.SELESAI.key:
            return 'primary'
        default:
            return 'default'
    }
}
