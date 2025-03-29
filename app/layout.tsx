import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme, { COLOR } from './theme';
import { METADATA } from './metadata';
import { Toaster } from 'react-hot-toast';
import LocalizationContext from '@/contexts/LocalizationContext';
import NextAuthProvider from '@/contexts/NextAuthContext';

export const metadata: Metadata = {
    applicationName: METADATA.TITLE,
    title: METADATA.TITLE,
    description: METADATA.SHORT_DESCRIPTION,
    icons: '/favicon.ico',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: METADATA.TITLE,
    },
};

export const viewport: Viewport = {
    themeColor: COLOR.PRIMARY,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='id'>
            <body>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <LocalizationContext>
                        <NextAuthProvider>{children}</NextAuthProvider>
                    </LocalizationContext>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
