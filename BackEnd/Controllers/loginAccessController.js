const { checkUsername, checkUserPass } = require("../utils/AuthendicationModule.js");
const { sessionToken } = require("../utils/Tokens.js");
const { entrySession } = require("./Session.js");

async function loginAccessController(req, res) {
    const { username, password } = req.body;

    if (!username) {
        return res.status(400).json({
            status: 400, message: "Username Field Required.",
        });
    } else if (!password) {
        return res.status(400).json({
            status: 400, message: "Password Field Required."
        });
    }

    try {

        // CHECK USENAME FROM DB
        const user = await checkUsername(username);
        if (user.qs === false){
            return res.status(404).json({
                status: 404,
                message: user.qo,
            })
        };

        // CHECK USENAME && PASSWORD FROM DB
        const pass = await checkUserPass(username, password);
        if (pass.qs === false){
            return res.status(409).json({
                status: 409,
                message: pass.qo
            })
        };

        // PREVENT's DATA
        //---- CREATE TOKEN'S ----
        let tkn = null;

        try{
            tkn = sessionToken(username);
        } catch(error) {
            console.error('Error get session token:', error.message);
            return tkn;
        }

        //---- ENTRY THE TOKEN WHEN IT'S LOGIN ----
        let result;

        try{
            result = entrySession(tkn, username);

            if (result.chkStatus === false){
                return res.status(401).json({
                    status: 401,
                    message: 'Login failed, pls try again.'
                })
            };

        } catch(error){
            return res.status(500).json({
                status: 500,
                message: `Session Login failed. ${username}`
            });
        }

        // LOGIN FUNCTIONALITY
        //---- RAISED THE TOKEN SEND TO FRONT-END ----
        return res.status(200).json({
            status: 200,
            message: `Login Successfully.`,
            sessiontkn: tkn,
        });

    } catch (error) {
        return res.status(500).json({ status: 500, message: `(500) error : ${error.message}` });
    }

}

module.exports = { loginAccessController };