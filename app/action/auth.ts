import { AUTH_COOKIE_NAMES, COOKIE_OPTIONS } from "@/lib/cookie";
import { createInsforgeServerClient } from "@/lib/insforge-server";
import { clear, error } from "console";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function setCookie(tokens: {
    accessToken: string;
    refreshToken?: string | null;
}) {
    const store = await cookies();

    store.set(
        AUTH_COOKIE_NAMES.accessToken,
        tokens.accessToken,
        COOKIE_OPTIONS.accessToken,
    );

    if (tokens.refreshToken) {
        store.set(
            AUTH_COOKIE_NAMES.refreshToken,
            tokens.refreshToken,
            COOKIE_OPTIONS.refreshToken,
        );
    }
}

async function readAuthCookies() {
    const store = await cookies();

    return {
        accessToken: store.get(AUTH_COOKIE_NAMES.accessToken)?.value ?? null,
        refreshToken: store.get(AUTH_COOKIE_NAMES.refreshToken)?.value ?? null,
    };
}

async function clearCookies() {
    const store = await cookies();
    store.delete(AUTH_COOKIE_NAMES.accessToken)
    store.delete(AUTH_COOKIE_NAMES.refreshToken)
}

export async function signInWithEmail(email: string, password: string) {
    if (!email || !password) {
        return { error: "Email/password is required" }
    }

    const insforge = createInsforgeServerClient();
    const { data, error } = await insforge.auth.signInWithPassword({ email, password })

    if (error) {
        return { error: error.statusCode === 401 ? "Invalid email or password." : "Unable to sign in right now" }
    }

    if (!data?.accessToken || !data.refreshToken) {
        return { error: "Session tokens missing" }
    }

    await setCookie({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
    })

    return { success: true, error: null }
}

export async function signUp(name: string, email: string, password: string) {
    if (!name || !email || !password) {
        return { error: "All fields are required." }
    }

    const insforge = createInsforgeServerClient();
    const { data, error } = await insforge.auth.signUp({ name, email, password })

    if (error) {
        return { error: error.statusCode === 403 ? "Email already in use." : "Unable to register right now." }
    }

    console.log(data, "data")

    if (!data?.accessToken || !data.refreshToken) {
        return { error: "Session tokens missing" }
    }

    await setCookie({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
    })

    return { success: true, error: null }
}

export async function verifyEmail(email: string, otp: string, type: "verify" | "resend") {
    if (!email) {
        return { error: "Email field is required." }
    }
    const insforge = createInsforgeServerClient();

    if (type === "resend") {
        const { data, error } = await insforge.auth.resendVerificationEmail({ email })

        if (error) {
            return { error: "Unable to resend verification" }
        }

        return { success: true, error: null }
    }

    if (!otp) {
        return { error: "OTP is required " }
    }

    const { data, error } = await insforge.auth.verifyEmail({ email, otp })

    if (error) {
        return { error: error.statusCode === 403 ? "Email already in use" : "Unable to verify email" }
    }
    console.log(data, "data")

    if (!data?.accessToken || !data.refreshToken) {
        return { error: "Session tokens missing" }
    }

    await setCookie({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
    })

    return { success: true, error: null }
}

export async function signOut (){
    const {accessToken} = await readAuthCookies()

    try{
        const insforge = createInsforgeServerClient(accessToken ?? undefined);
        await insforge.auth.signOut()
    } finally{
        await clearCookies()
    }

    redirect("/")
}
