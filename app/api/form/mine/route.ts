import { NextResponse } from 'next/server'
import { prisma } from '../../prisma'
import { getUserFromToken } from '../../secret'

export async function GET(request: Request) {
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
        const laporan = await prisma.laporan.findMany({
            where: {
                user_id: user.userId,
            },
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
