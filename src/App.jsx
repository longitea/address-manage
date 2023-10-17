import "./App.css";
import Home from "./pages/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "./pages/address/edit";
import AddressPage from "./pages/address/addressPage";
import New from "./pages/address/new";
import Error from "./pages/error";
import {
  ADDRESS_EDIT_PATH,
  ADDRESS_NEW_PATH,
  ADDRESS_PATH,
  HOME_PATH,
} from "./constants/PATH";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_PATH} element={<Home />} />
        {/* Nested Route */}
        <Route path={ADDRESS_PATH}>
          <Route path={ADDRESS_PATH} element={<AddressPage />} />
          <Route path={ADDRESS_NEW_PATH} element={<New />} />
          <Route path={ADDRESS_EDIT_PATH} element={<Edit />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
