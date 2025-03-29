import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../prisma'
import { getUserFromToken } from '../../secret'

async function checkLaporanOwnership(laporanId: number, userId: string) {
    const laporan = await prisma.laporan.findUnique({
        where: {
            id: laporanId,
        },
    })

    if (!laporan) {
        return {
            success: false,
            response: NextResponse.json(
                {
                    success: false,
                    message: 'Laporan not found!',
                },
                { status: 404 }
            ),
        }
    }

    if (laporan.user_id !== userId) {
        return {
            success: false,
            response: NextResponse.json(
                {
                    success: false,
                    message: 'You are not allowed to perform this action!',
                },
                { status: 403 }
            ),
        }
    }
    return { success: true, laporan }
}

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const laporan = await prisma.laporan.findUnique({
            where: {
                id: Number(id),
            },
        })

        if (!laporan) {
            return NextResponse.json(
                { success: false, message: 'Laporan not found!' },
                { status: 404 }
            )
        }

        return NextResponse.json(
            {
                data: laporan,
                success: true,
                message: 'OK',
            },
            { status: 200 }
        )
    } catch (err) {
        return NextResponse.json(
            { success: false, message: JSON.stringify(err) },
            { status: 500 }
        )
    }
}
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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
    const { id } = await params
    const ownershipResult = await checkLaporanOwnership(Number(id), user.userId)
    if (!ownershipResult.success) {
        return ownershipResult.response
    }

    try {
        const laporan = await prisma.laporan.delete({
            where: {
                id: Number(id),
                user_id: user.userId,
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
