import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "../src/styles/Index.module.scss";
// import Transactions from "pages/transactions";
import AddTransaction from "components/addTransaction";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    {/* <Transactions /> */}
    <AddTransaction />
  </>
);