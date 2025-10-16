import { useState } from "react";
import { Suspense, lazy } from "react";

import ErrorMessage from "../../Container/ErrorMessage";
import LogoutAccount from "../Authendications/LogoutAccountV0.1";

import ProfileIndex from "./Profile/ProfileIndex";
import Editor from "./Segment/Editor";

import { DASHBOARD_NAV_JSON } from "../JSON/APK-V0.1";

const ProductModule = lazy(() => import("./Products/Product"));

export default function Dashboard() {
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);

    return (
        <main className="bg-transparent h-screen w-full overflow-hidden flex items-center">

            <div className="fixed right-5 top-3 flex justify-center items-center gap-5">

                {DASHBOARD_NAV_JSON.map((optionItem, optionIndex) => (

                    <button
                        key={optionIndex}
                        title={optionItem.name}

                        onClick={() => setShow(optionItem.name)}

                        className="bg-transparent cursor-pointer flex justify-center items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="30"
                            viewBox="0 -960 960 960"
                            width="30"
                            fill="#000"
                        >
                            <path d={optionItem.d} />
                        </svg>
                        <span>{optionItem.optionName}</span>
                    </button>

                ))}

            </div>

            {show === "filter" && ( <Editor hide={setShow} /> )}
            {show === "profile" && ( <ProfileIndex hide={setShow} /> )}

            <LogoutAccount quickmsg={setError} />
            <ErrorMessage error={error} />

            <Suspense fallback={<p className="text-md relative left-1/2 -translate-y-1/2 text-gray-700">Loading...</p>}>
                <ProductModule />
            </Suspense>

        </main>
    );
}