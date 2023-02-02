import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; //for using react hashroute
import App from "./App"; //import that contain routes and
import "./index.css"; //custom style data
import { MantineProvider } from "@mantine/core"; // For mantine core import
import { ModalsProvider } from "@mantine/modals"; // For import mantine modals

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* app is closed with hash router */}
    <HashRouter>
      {/* App close with manitine provider and modal */}
      <MantineProvider>
        <ModalsProvider>
          <App />
        </ModalsProvider>
      </MantineProvider>
    </HashRouter>
  </React.StrictMode>
);
