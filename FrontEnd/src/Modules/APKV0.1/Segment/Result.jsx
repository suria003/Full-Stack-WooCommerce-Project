export default function Result({ productDatas, dataCount }) {
    return (
        <div className="flex flex-col gap-2">
            {
                dataCount > 0 ?
                    (
                        productDatas.map(p => (
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
                        ))
                    ) : (
                        <p>No Product's Found.</p>
                    )
            }
        </div>
    );
}