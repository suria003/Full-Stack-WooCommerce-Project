const { checkUsername, newUserEntry } = require("../utils/AuthendicationModule");

async function registerAccessController(req, res) {
 
    const { username, password } = req.body;

    if (!username){
        return res.status(400).json({
            status: 400,
            message: "Username is Required."
        });
    } else if (!password){
        return res.status(400).json({
            status: 400,
            message: "Password is Required."
        })
    };

    try{

        // CHECK USERNAME ARE EXISTS
        const checkUser = await checkUsername(username);

        if (checkUser.qs === true){
            return res.status(409).json({
                status: 409,
                message: `${username} already have an account, please login.`
            });
        };

        // CREATE A NEW USER
        const newUser = await newUserEntry(username, password);

        if(newUser.qs === false){
            return res.status(424).json({
                status: 424,
                message: "User created failed."
            });
        };

        return res.status(201).json({
            status: 201,
            message: newUser.qo
        });

    } catch(error) {
        return res.status(500).json({
            status: 500,
            message: `(500) error: ${error.message}`
        });
    }

}

module.exports = { registerAccessController };