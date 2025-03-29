import axios from 'axios'
import { getCookie } from 'cookies-next'
import { COOKIES } from './constant'
import { RulesSettingType } from '@/types/rules-setting.interface'

const HOST = axios.create({})

HOST.interceptors.request.use(
    (config) => {
        const tokenCookie = getCookie(COOKIES.TOKEN)
        if (tokenCookie) {
            config.headers['Authorization'] = 'Bearer ' + tokenCookie
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

export const API = {
    postFormLaporan: ({
        judul_laporan,
        deskripsi_laporan,
        photo,
    }: RulesSettingType) => {
        return HOST.post(`/api/form`, {
            judul_laporan,
            deskripsi_laporan,
            photo,
        })
    },
    getAllFormLaporan: () => HOST.get(`/api/form`),
    getMyFormLaporan: () => HOST.get(`/api/form/mine`),
    deleteFormLaporan: (id: number) => HOST.delete(`/api/form/${id}`),
    getFormLaporanById: (id: number) => HOST.get(`/api/form/${id}`),
}
