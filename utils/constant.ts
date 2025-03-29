export const ROUTE = {
    HOME: {
        URL: '/',
    },
    FORM: {
        URL: '/form',
        TITLE: 'Form Laporan',

        VIEW: {
            setURL: (id_local_form: string | number) =>
                `/form/view?id=${id_local_form}`,
            setTitle: (id_local_form: string | number) =>
                `View Laporan : ${id_local_form}`,
        },
    },
    DATA_SAYA: {
        URL: '/my-data',
        TITLE: 'Laporan Saya',
    },

    DASHBOARD: {
        TITLE: 'Dashboard',
        URL: '/dashboard',
    },
    PROFILE: {
        URL: '/profile',
    },
}

export const COOKIES = {
    TOKEN: 'token',
}

export const KEYCLOAK_BASE = `${process.env.NEXTAUTH_URL_IAM}realms/${process.env.NEXTAUTH_REALM_IAM}`
