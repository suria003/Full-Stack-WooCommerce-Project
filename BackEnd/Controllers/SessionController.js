// SESSION STORAGE
const sessionStorage = [];

console.log("session init", sessionStorage);

async function entrySession(tkn, username) {
    try {

        if (!tkn || !username) {
            throw new Error("Token or username missing");
        }

        sessionStorage.push({ token: tkn, username });

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
};

async function chkSession(tkn) {
    try {
        if (!tkn) throw new Error("Token missing");

        const exists = sessionStorage.some(session => session.token === tkn);

        return { chkStatus: exists }; // TRUE OR FALSE STATE
    } catch (error) {
        return {
            chkStatus: false,
            message: error.message
        };
    }
};

async function removeSession(tkn) {
    try {
        if (!tkn) throw new Error("Token missing");

        const index = sessionStorage.findIndex(session => session.token === tkn);

        if (index !== -1) {
            const removed = sessionStorage.splice(index, 1)[0];
            return {
                chkStatus: true,
                message: "Logout Successfully.",
                removed
            };
        } else {
            return {
                chkStatus: false,
                message: "User not logged in."
            };
        };

    } catch (error) {
        return {
            chkStatus: false,
            message: error.message
        };
    }
}

async function sessionLogout(req, res) {

    const { authToken } = req.body;

    if (!authToken) {
        return res.status(400).json({
            status: 400,
            message: "Logout Successfully."
        });
    }

    try {

        // CHECK SESSION
        const chkTkn = await chkSession(authToken);

        if (chkTkn.chkStatus === false) {
            return res.staus(404).json({
                status: 404,
                message: "Logout Successfully."
            });
        };

        // REMOVE SESSION
        const removeTkn = await removeSession(authToken);

        if (removeTkn.chkStatus === false) {
            return res.status(404).json({
                status: 404,
                message: "Logout Successfully."
            });
        };

        return res.status(200).json({
            status: 200,
            message: "Logout Successfully."
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Logout Successfully."
        });
    }
}

module.exports = { entrySession, sessionLogout, chkSession, removeSession };