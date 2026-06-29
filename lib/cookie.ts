export const AUTH_COOKIE_NAMES = {
    accessToken: "verbally_accesss_token",
    refreshToken: "verbally_refresh_token",
} as const

export const COOKIE_OPTIONS = {
    accessToken: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax" as const,
        path: "/",
        maxAge: 60 * 15
    },
    refreshToken: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax" as const,
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    }
}

