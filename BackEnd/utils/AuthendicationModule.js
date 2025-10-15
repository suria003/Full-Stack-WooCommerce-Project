const connections = require("../config/db");

async function checkUsername(username){

    try{
        const [rows] = await connections.execute('SELECT username FROM users WHERE username = ?', [username]);

        //TRUE OR FALSE
        if (rows.length > 0){
            return { qs: true, qo: rows[0].username };
        } else {
            return { qs: false, qo: "User not found." };
        };

    } catch(err) {
        return { qs: false, qo: err.message };
    }
};

async function checkUserPass(username, password) {
    
    try{
        const [rows] = await connections.execute('SELECT username FROM users WHERE username = ? AND password = ?', [username, password]);

        //TRUE OR FALSE
        if (rows.length > 0){
            return { qs: true, qo: rows[0].username };
        } else {
            return { qs: false, qo: "Wrong Password." };
        }

    } catch(err) {
        return { qs: false, qo: err.message };
    }
};

async function newUserEntry(username, password){

    try{
        const [newUser] = await connections.execute('INSERT INTO users ( username, password) VALUES (?, ?)', [username, password]);

        if (newUser.affectedRows === 1){
            return { qs: true, qo: "User create Successfully." }
        } else {
            return { qs: false, qo: "User creation failed." };
        }

    } catch(err) {

        return { qs: false, qo: err.message };

    }
};


module.exports = { checkUsername, checkUserPass, newUserEntry };
