import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ACCOUNT_ROUTERS_JSON } from "./router";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {ACCOUNT_ROUTERS_JSON.map((item, index) => (
          <Route key={index} path={item.path} element={< item.element />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
