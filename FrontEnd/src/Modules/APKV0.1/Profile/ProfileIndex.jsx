import { useEffect, useState } from "react";

import { CHK_PROFILE_API } from "../API/PROFILE_API";

import { PROFILE_OPTIONS } from "../../JSON/APK-V0.1";

import IngestProduct from "../Products/IngestProduct";

export default function ProfileIndex({ hide }) {
    const [profileTkn, setProfileTkn] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        async function sessionProfile() {
            const result = await CHK_PROFILE_API();
            setProfileTkn(result.message);
        }

        sessionProfile();
    }, []);

    if (profileTkn === null) return <p className="text-sm text-gray-400">Session Loading...</p>;

    return (
        <div className="h-full w-[300px] bg-white shadow-2xl absolute right-0 top-0 border-l border-gray-200 flex flex-col">

            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">{profileTkn}</h2>
                <button
                    onClick={() => hide(false)}
                    className="text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-1 transition cursor-pointer"
                >
                    ✕
                </button>
            </div>

            <div className="flex flex-col p-4 gap-2 overflow-y-auto">
                {PROFILE_OPTIONS.map((optionItem, optionIndex) => (
                    <button
                        key={optionIndex}
                        onClick={() => setShow(optionItem.name)}
                        className="text-left w-full px-4 py-2 rounded-lg flex items-center gap-3 bg-gray-50 hover:bg-gray-100 hover:shadow-sm transition-all text-gray-800 font-medium cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                            fill="#808080"
                        >
                            <path d={optionItem.d} />
                        </svg>
                        {optionItem.optionName}
                    </button>
                ))}
            </div>

            {show === "ingests" && (
                <IngestProduct hidePanel={setShow} />
            )}

        </div>
    );
}