import CreateAccount from "./Modules/Authendications/CreateAccountV0.1";
import Login from "./Modules/Authendications/LoginV0.1";

import Dashboard from "./Modules/APKV0.1/Dashboard";

export const MODULE_ROUTERS_JSON = [
    { path: "/", element: Dashboard },
];

export const ACCOUNT_ROUTERS_JSON = [
    { path: "/register", element: CreateAccount },
    { path: "/login", element: Login },
];

export default { MODULE_ROUTERS_JSON, ACCOUNT_ROUTERS_JSON };