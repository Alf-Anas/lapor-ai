import { RulesSettingType } from '@/types/rules-setting.interface'
import {
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory,
} from '@google/generative-ai'
import { NextResponse } from 'next/server'
import { prisma } from '../prisma'
import { censorName, getUserFromToken } from '../secret'

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY || ''

type AIDataType = RulesSettingType

async function runAI({ judul_laporan, deskripsi_laporan }: AIDataType) {
    const MODEL_NAME = process.env.GOOGLE_GEMINI_MODEL || ''
    if (!API_KEY) {
        console.error('Please provide the API Key.')
        return
    }

    const genAI = new GoogleGenerativeAI(API_KEY)
    const model = genAI.getGenerativeModel({ model: MODEL_NAME })
    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
        responseMimeType: 'application/json',
    }

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ]

    const parts = [
        {
            text: `Anda adalah seorang admin pelaporan. Tugas Anda adalah:
            1. Memeriksa validitas laporan berdasarkan kelengkapan informasi dan kejelasan isi.
            2. Jika laporan tidak valid, jelaskan alasan mengapa tidak valid.
            3. Jika laporan kurang informasi, minta pengguna untuk melengkapi dengan pertanyaan yang spesifik.
            4. Jika laporan valid, identifikasi instansi terkait yang harus menerima laporan (bisa lebih dari satu).
            5. Buat tanggapan resmi atas laporan tersebut dalam format markdown, tidak perlu memberikan jangka waktu dan kontak yang dapat dihubungi, cukup dengan menjelaskan bahwa laporan tersebut sudah diteruskan ke instansi terkait.

            Berikut inputan dari user:
            Judul Laporan:
            ${judul_laporan}
            Deskripsi Laporan:
            ${deskripsi_laporan}

            Berikan respons dalam format JSON berikut:
            {
                "valid": boolean,
                "instansi_terkait": string[],
                "tanggapan": string
            }`,
        },
    ]

    const result = await model.generateContent({
        contents: [{ role: 'user', parts }],
        generationConfig,
        safetySettings,
    })

    const { response } = result
    return response.text()
}

export async function POST(request: Request) {
    const { judul_laporan, deskripsi_laporan, photo } = await request.json()

    if (!judul_laporan || !deskripsi_laporan) {
        return NextResponse.json(
            {
                error: true,
                message: 'Judul dan deskripsi laporan wajib diisi!',
            },
            { status: 422 }
        )
    }

    const authHeader = request.headers.get('Authorization')
    const user = await getUserFromToken(authHeader)

    if (!user.success || !user.userId) {
        return NextResponse.json(
            {
                success: false,
                message: 'Token Invalid!',
            },
            { status: 403 }
        )
    }

    try {
        const res = await runAI({
            judul_laporan,
            deskripsi_laporan,
        })
        const resData: {
            valid: boolean
            instansi_terkait: string[]
            tanggapan: string
        } = JSON.parse(res || '')

        if (resData.valid) {
            await prisma.laporan.create({
                data: {
                    judul: judul_laporan,
                    deskripsi: deskripsi_laporan,
                    photo: photo,
                    user_id: user.userId,
                    user_name: censorName(user.userName),
                    valid: resData.valid,
                    tanggapan: resData.tanggapan,
                    instansi: resData.instansi_terkait,
                },
            })
        }

        return NextResponse.json(
            { success: true, data: resData },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function GET() {
    try {
        const laporan = await prisma.laporan.findMany({
            orderBy: {
                updated_at: 'desc',
            },
        })

        return NextResponse.json(
            { data: laporan, success: true, message: 'OK' },
            { status: 200 }
        )
    } catch (err) {
        return NextResponse.json(
            { success: false, message: JSON.stringify(err) },
            { status: 500 }
        )
    }
}
