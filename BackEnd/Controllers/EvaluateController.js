const connections = require("../config/db");

async function EvaluateController(req, res) {

    const { rules, tkn } = req.body;

    if (!rules) {
        return res.status(400).json({
            status: 400,
            message: "Text Box not to be Empty."
        });
    } else if (!tkn) {
        return res.status(402).json({
            status: 402,
            message: "User not Found."
        });
    }

    try {

        const allowedFields = ["price", "stock_status", "stock_quantity", "category", "tags"];
        const allowedOperators = [">", "<", ">=", "<=", "=", "!="];

        const parts = rules.split(" ");
        if (parts.length !== 3) {
            return res.status(400).json({ status: 400, message: "Invalid formate." });
        };

        const [field, operator, value] = parts;

        if (!allowedFields.includes(field)) {
            return res.status(400).json({ status: 400, message: `Invalid name, ${field}` });
        };

        if (!allowedOperators.includes(operator)) {
            return res.status(400).json({ status: 400, message: `Invalid operator. ${operator}` })
        };

        if (
            (field === "stock_status" || field === "category" || field === "tags") &&
            !["=", "!="].includes(operator)
        ) {
            return res.status(400).json({
                status: 400,
                message: `Operator "${operator}" is not allowed for field "${field}"`
            });
        };

        const executeQuery = `SELECT * FROM products WHERE ${field} ${operator} ? AND tkn = ?`;

        const [datas] = await connections.execute(executeQuery, [value, tkn]);

        return res.status(200).json({ status: 200, count: datas.length, message: datas, });

    } catch (error) {

        return res.status(500).json({
            status: 500,
            message: error.message
        });

    }
};

module.exports = { EvaluateController };