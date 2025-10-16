const connections = require("../config/db");
const axios = require('axios');

async function IngestsController(req, res) {

    const authToken = req.headers["authorization"];

    if (!authToken){
        return res.status(400).json({
            status: 400,
            message: "User not found."
        });
    }

    try {

        const url = "https://wp-multisite.convertcart.com/wp-json/wc/v3/products?consumer_key=ck_af82ae325fbee1c13f31eb26148f4dea473b0f77&consumer_secret=cs_2d8cc467c5b91a80f5ed18dd3c282ee8299c9445";

        const response = await axios.get(url);
        const products = Array.isArray(response.data) ? response.data : response.data.products;

        if (!products || products.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "No product from woo commerce"
            });
        }

        await connections.query('DELETE FROM products WHERE tkn = ?', [authToken]);

        const insertProduct = `INSERT INTO products (id, title, price, stock_status, stock_quantity, category, tags, on_sale, created_at, tkn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        for (const p of products) {
            await connections.query(insertProduct, [
                p.id,
                p.name,
                p.price ? parseFloat(p.price) : 0,
                p.stock_status,
                p.stock_quantity != null ? p.stock_quantity : 0,
                p.categories[0]?.name || null,
                p.tags.map(t => t.name).join(", "),
                p.on_sale ? 1 : 0,
                p.date_created,
                authToken
            ]);
        }

        return res.status(201).json({
            status: 201,
            message: "Ingest all product."
        });

    } catch (error) {
        return res.status(500).json({ status: 500, message: `Error ingesting products, ${error.message}`});
    }

};

module.exports = { IngestsController };