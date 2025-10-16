import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MODULE_ROUTERS_JSON, ACCOUNT_ROUTERS_JSON } from "./router";

import ProducteRouter from "./Modules/Authendications/SessionRouter/ProductRouter";
import PrivateRouter from "./Modules/Authendications/SessionRouter/PrivateRouter";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {ACCOUNT_ROUTERS_JSON.map((authenItem, authenIndex) => (
          <Route key={authenIndex} path={authenItem.path} element={<ProducteRouter> < authenItem.element /> </ProducteRouter>} />
        ))}

        {MODULE_ROUTERS_JSON.map((moduleItem, moduleIndex) => (
          <Route key={moduleIndex} path={moduleItem.path} element={<PrivateRouter> < moduleItem.element /> </PrivateRouter>} />
        ))}

        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
      
    </BrowserRouter>
  );
}
