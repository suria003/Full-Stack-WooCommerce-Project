import { useState } from "react";

import { INGEST_PRODUCT_API } from "../API/INGEST_PRODUCT_API";

export default function IngestProduct({ hidePanel }) {
    const [message, setMessage] = useState(null);

    async function ingestsProducts() {
        try {
            const result = await INGEST_PRODUCT_API();
            setMessage(result.message);

            if (result.status === 200 || result.status === 201) {
                setMessage(result.message);
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            };

        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-10">
            <div className="relative bg-[#F8F8F8] rounded-2xl shadow-xl p-6 w-full max-w-sm flex flex-col items-center gap-4">

                <button
                    onClick={() => hidePanel(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition cursor-pointer"
                >
                    ✕
                </button>

                <h2 className="text-lg font-semibold text-gray-800">Ingest Product</h2>

                {message && (
                    <p className="text-center text-green-600 font-bold bg-green-50 border border-green-200 rounded-lg px-3 py-2 w-full">
                        {message}
                    </p>
                )}

                <button
                    onClick={ingestsProducts}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all w-full font-medium cursor-pointer"
                >
                    Ingest Product
                </button>
            </div>
        </div>
    );
}