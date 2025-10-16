import { Suspense, lazy } from "react";
import { useState } from "react";

import { CHK_PROFILE_API } from "../API/PROFILE_API";

const ResultContainer = lazy(() => import("./Result"));

export default function Editor({ hide }) {
    const [rules, setRules] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function evaluateSegment() {

        const profileTkn = await CHK_PROFILE_API();
        const tkn = profileTkn.message;

        try {

            setLoading(true);
            setError(null);
            setResult(null);

            const response = await fetch("https://woo-commerce-backend.vercel.app/api/v0.1/segments/evaluate/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rules, tkn }),
            });

            const data = await response.json();

            switch (response.status) {
                case 200:
                case 201:
                    setResult(data);
                    break;

                case 400:
                case 500:
                    setError(data.message);
                    break;

                case 402:
                    sessionStorage.removeItem("authToken");
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 700) //7 MS
                    setError(data.message);

                default:
                    setError(data.message);
                    break;
            };

        } catch (err) {

            setError("Network or server error", err.message);

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-10">
            <div className="relative bg-[#F8F8F8] rounded-2xl shadow-xl p-6 w-full max-w-sm flex flex-col items-center gap-4">

                <button
                    onClick={() => hide(false)}
                    className="text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-1 transition cursor-pointer absolute top-2 right-2"
                >
                    ✕
                </button>

                <div className="bg-transparent rounded-2xl p-6 w-full max-w-md flex flex-col gap-5">
                    <h2 className="text-xl font-semibold text-gray-800 text-center">
                        Segment Editor
                    </h2>

                    <p className="text-sm text-gray-500 text-center">
                        Enter a rule (example: <code>price &gt; 1000</code> or <code>stock_quantity &lt; 50</code>)
                    </p>

                    <textarea
                        value={rules}
                        onChange={(e) => setRules(e.target.value)}
                        rows="4"
                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                        placeholder="Enter your rule here..."
                    />

                    <button
                        onClick={evaluateSegment}
                        disabled={loading || !rules.trim()}
                        className={`w-full py-2 rounded-lg font-medium text-white transition-all ${loading || !rules.trim()
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {loading ? "Evaluating..." : "Evaluate Segment"}
                    </button>

                    {error && (
                        <p className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-lg p-2">
                            {error}
                        </p>
                    )}

                    {result && (

                        <div className="fixed inset-0 flex items-center justify-center bg-white/30 bg-opacity-70  z-20">
                            <div className="bg-white w-full max-w-2xl h-auto border border-gray-200 rounded-2xl shadow-lg p-6 flex flex-col gap-4 animate-fadeIn">

                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        Segment Result
                                    </h2>
                                    <span className="text-sm text-gray-500">
                                        {new Date().toLocaleString()}
                                    </span>
                                    <a href="/" className="text-sm text-white bg-gray-800 py-1 px-2.5 rounded-lg cursor-pointer">Back</a>
                                </div>

                                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                                    <p className="font-semibold text-green-700 text-center">
                                        Found <span className="text-green-800">{result.count}</span> matching products
                                    </p>
                                </div>

                                {/* Product Results */}
                                <div className="bg-gray-50 rounded-lg border border-gray-100 max-h-96 overflow-y-auto p-4">
                                    <Suspense
                                        fallback={<p className="text-center text-gray-600 text-sm">Loading Products...</p>}
                                    >
                                        <ResultContainer
                                            productDatas={result.message}
                                            dataCount={result.count}
                                        />
                                    </Suspense>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}