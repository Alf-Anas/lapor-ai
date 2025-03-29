export interface LaporanResponseType {
    id: number
    judul: string
    deskripsi: string
    photo?: string
    valid: boolean
    tanggapan: string
    instansi: string[]
    status: string
    user_id: string
    user_name: string
    created_at: string
    updated_at: string
}
