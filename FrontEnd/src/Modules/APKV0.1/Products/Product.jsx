import { useEffect, useState } from "react";
import { CHK_PROFILE_API } from "../API/PROFILE_API";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://woo-commerce-backend.vercel.app/api/v0.1/products");

                if (!response.ok) {
                    setError('No product.')
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        async function seeId() {
            const result = await CHK_PROFILE_API();
            setUserId(result.message);
        }

        seeId();
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-6 h-full w-full object-contain overflow-y-scroll">
            <h2 className="text-2xl font-bold mb-6">All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products
                    .filter(p => p.tkn === userId)
                    .map(p => (
                        <div
                            key={p.id}
                            className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{p.title}</h3>
                            <p className="text-sm text-gray-600"><span className="font-medium">Price:</span> ₹{p.price}</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">Stock:</span> {p.stock_status} ({p.stock_quantity})</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">Category:</span> {p.category}</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">Tags:</span> {p.tags}</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">On Sale:</span> {p.on_sale ? "Yes" : "No"}</p>
                            <p className="text-xs text-gray-500 mt-2"><span className="font-medium">Created:</span> {new Date(p.created_at).toLocaleString()}</p>
                        </div>
                    ))}

                {products.filter(p => p.tkn === userId).length === 0 && (
                    <p className="text-gray-500 text-sm">No Product Found.</p>
                )}
            </div>
        </div>
    );
};