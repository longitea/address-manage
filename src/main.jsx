import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import { RecoilRoot } from "recoil";

const config = {
  // Seed Token
  token: {
    borderRadius: 3,
  },
  // AliasToken
  components: {
    Button: {
      colorTextLightSolid: "black",
      colorPrimary: "#ffd600",
      colorPrimaryHover: "#fbb117",
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  // Configuration Themes of Antd
  <ConfigProvider theme={config}>
    {/* Proviver of Recoil */}
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ConfigProvider>
);
