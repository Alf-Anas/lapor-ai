'use client'

import { createTheme } from '@mui/material/styles'

export const COLOR = {
    PRIMARY: '#d4af37', // Gold
    PRIMARY_DARK: '#b88914', // Dark Gold
    SECONDARY: '#ffcc00', // Bright Gold
    GRAY: '#2c2b33', // Dark Gray (unchanged)
}
export const FONT = {
    PRIMARY: 'VAG Rounded BT',
    SECONDARY: 'Segoe UI',
}

const theme = createTheme({
    typography: {
        fontFamily: [FONT.PRIMARY, FONT.SECONDARY].join(', '),
        body1: {
            fontFamily: FONT.SECONDARY,
        },
        body2: {
            fontFamily: FONT.SECONDARY,
        },
        subtitle1: {
            fontFamily: FONT.SECONDARY,
        },
        subtitle2: {
            fontFamily: FONT.SECONDARY,
        },
        caption: {
            fontFamily: FONT.SECONDARY,
        },
        overline: {
            fontFamily: FONT.SECONDARY,
        },
    },

    palette: {
        primary: {
            main: COLOR.PRIMARY,
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: COLOR.SECONDARY,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
})

export default theme
