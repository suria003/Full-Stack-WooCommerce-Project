// SESSION STORAGE
const sessionStorage = [];

async function entrySession(tkn, username) {
    try {

        if (!tkn || !username) {
            throw new Error("Token or username missing");
        }

        console.log('Before', sessionStorage);

        sessionStorage.push({ token: tkn, username });

        console.log('After', sessionStorage);

        return {
            chkStatus: true,
            sessiontoken: tkn
        };

    } catch (error) {
        return {
            chkStatus: false,
            message: error.message
        };
    }
}

async function chkSession(tkn) {

    try {

        if (!tkn) throw new Error("Token missing");
        const exists = !!sessionStorage[tkn];

        return { chkStatus: exists }; // TURE OR FALSE

    } catch (error) {
        return {
            chkStatus: false,
            message: error.message
        };
    }
}

async function removeSession(tkn) {

    try {
        if (!tkn) throw new Error("Token missing");

        if (sessionStorage[tkn]) {
            const removed = sessionStorage[tkn];
            delete sessionStorage[tkn];
            return {
                chkStatus: true,
                message: "Logout Successfully.",
                removed
            };
        } else {
            return {
                chkStatus: false,
                message: "User not Login."
            };
        }

    } catch (error) {
        return {
            chkStatus: false,
            message: error.message
        };
    }
}

module.exports = { entrySession, chkSession, removeSession };