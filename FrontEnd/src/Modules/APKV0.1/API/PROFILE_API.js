export async function CHK_PROFILE_API() {
    const tkn = sessionStorage.getItem('authToken');

    if (!tkn) return { loggedIn: false };

    try {
        const TARGET_URL = "https://woo-commerce-backend.vercel.app/api/v0.1/session/chk/";
        const response = await fetch(TARGET_URL, {
            method: 'GET',
            "headers": {
                "Content-Type": "application/json",
                "authorization": tkn,
            },
        });

        if (response.status !== 200) {
            sessionStorage.removeItem('authToken');
            window.location.href = "/login";
            return { loggedIn: false }
        }

        const result = await response.json()
        return result;
    } catch (error) {
        return { loggedIn: false };
    }

};