import type { Config } from 'tailwindcss'

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './containers/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#d4af37',
                secondary: '#ffcc00',
                'primary-dark': '#b88914',
                'primary-gray': '#2c2b33',
            },
            fontFamily: {
                primary: ['VAG Rounded BT'],
                secondary: ['Segoe UI'],
            },
        },
    },
    plugins: [],
} satisfies Config
