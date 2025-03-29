import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const theEnv = {
            NODE_ENV: process.env.NODE_ENV,
            HOST_URL: process.env.HOST_URL,
            NEXT_PUBLIC_STAGE: process.env.NEXT_PUBLIC_STAGE,

            // Keycloak SSO
            NEXTAUTH_URL_IAM: process.env.NEXTAUTH_URL_IAM,
            NEXTAUTH_REALM_IAM: process.env.NEXTAUTH_REALM_IAM,
            NEXTAUTH_CLIENT_ID: process.env.NEXTAUTH_CLIENT_ID,
            NEXTAUTH_CLIENT_SECRET: process.env.NEXTAUTH_CLIENT_SECRET,
            NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
            NEXTAUTH_REDIRECT_URI: process.env.NEXTAUTH_REDIRECT_URI,
            NEXTAUTH_URL: process.env.NEXTAUTH_URL,

            // Database
            POSTGRESQL_HOST: process.env.POSTGRESQL_HOST,
            POSTGRESQL_PORT: process.env.POSTGRESQL_PORT,
            POSTGRESQL_USERNAME: process.env.POSTGRESQL_USERNAME,
            POSTGRESQL_PASSWORD: process.env.POSTGRESQL_PASSWORD,
            POSTGRESQL_DATABASE: process.env.POSTGRESQL_DATABASE,
            POSTGRESQL_SCHEMA: process.env.POSTGRESQL_SCHEMA,
            DATABASE_URL: process.env.DATABASE_URL,

            // Gemini AI
            GOOGLE_GEMINI_MODEL: process.env.GOOGLE_GEMINI_MODEL,
            GOOGLE_GEMINI_API_KEY: process.env.GOOGLE_GEMINI_API_KEY,
        }
        return NextResponse.json(
            { data: theEnv, success: true, message: 'OK' },
            { status: 200 }
        )
    } catch (err) {
        return NextResponse.json(
            { success: false, message: JSON.stringify(err) },
            { status: 500 }
        )
    }
}
