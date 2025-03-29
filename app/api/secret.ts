import { getValObject } from '@/utils'
import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

export const KEYCLOAK_BASE = `${process.env.NEXTAUTH_URL_IAM}realms/${process.env.NEXTAUTH_REALM_IAM}`

const jwksUri = `${KEYCLOAK_BASE}/protocol/openid-connect/certs`
const client = jwksClient({
    jwksUri: jwksUri,
})

const getKey = (header: JwtHeader, callback: SigningKeyCallback): void => {
    if (!header.kid) {
        return callback(new Error('JWT header missing key ID (kid)'))
    }

    client.getSigningKey(header.kid, (err, key) => {
        if (err) {
            console.error('Error fetching signing key:', err)
            return callback(err)
        }
        const signingKey = key?.getPublicKey() // Get the correct public key
        callback(null, signingKey)
    })
}

export const verifyToken = (
    token: string
): Promise<string | jwt.JwtPayload | undefined> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
            if (err) {
                console.error('JWT Verification Failed:', err.message)
                reject(err)
            } else {
                resolve(decoded)
            }
        })
    })
}

export async function decodeToken(token: string) {
    try {
        const decoded = await verifyToken(token)
        return {
            success: true,
            data: decoded,
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}

export async function getUserFromToken(authHeader: string | null) {
    const token = (authHeader || 'Bearer <token>').split(' ')[1]

    const res = await decodeToken(token)
    const userId: string = getValObject(res, 'data.sub', 'X')
    const userName: string = getValObject(res, 'data.name', 'X')

    if (!res.success || !res.data || !userId) {
        return { success: false, message: 'Token Invalid!' }
    } else {
        return { success: true, userId, userName, message: 'OK' }
    }
}

export function censorName(name: string): string {
    if (name.length <= 2) return name // No need to censor very short names

    const firstLetter: string = name[0]
    const lastLetter: string = name[name.length - 1]
    const middleSection: string = '*'.repeat(name.length - 2)

    return `${firstLetter}${middleSection}${lastLetter}`
}
