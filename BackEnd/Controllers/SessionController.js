// SESSION STORAGE
const sessionStorage = [];

async function entrySession(tkn, userTkn) {
    try {

        if (!tkn || !userTkn) {
            throw new Error("Token or username missing");
        }

        sessionStorage.push({ token: tkn, userTkn });

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

        const found = sessionStorage.find(sess => sess.token === tkn);

        if (!found) return { chkStatus: false };

        return { chkStatus: true, userTkn: found.userTkn };
    } catch (error) {
        return { chkStatus: false, message: error.message };
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

async function sessionChk(req, res) {

    const authToken = req.headers['authorization'];

    if (!authToken) {
        return res.status(400).json({
            status: 400,
            message: "User not found, login again."
        });
    }

    try {

        const resultTkn = await chkSession(authToken);

        if (resultTkn.chkStatus === false) {
            return res.status(404).json({
                status: 404,
                message: "User not Found."
            });
        }

        return res.status(200).json({
            status: 200,
            message: resultTkn.userTkn
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

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

module.exports = { entrySession, sessionLogout, chkSession, sessionChk, removeSession };