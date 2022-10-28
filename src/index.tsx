import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "../src/styles/Index.module.scss";
import Transactions from "pages/transactions";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Transactions />
  </React.StrictMode>
);