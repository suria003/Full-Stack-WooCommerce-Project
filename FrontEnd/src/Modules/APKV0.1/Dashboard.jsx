import { useState } from "react";

import ErrorMessage from "../../Container/ErrorMessage";
import LogoutAccount from "../Authendications/LogoutAccountV0.1";

export default function Dashboard(){
    const [error, setError] = useState(null);

    return(
        <main className="bg-black h-screen w-full overflow-hidden flex items-center">

            <LogoutAccount quickmsg={setError} />
            <ErrorMessage error={error} />

        </main>
    );
}