import Transactions from "pages/transactions";
import dataAccounts from "../data/accounts.json";
import dataCategories from "../data/categories.json";
import dataTransactions from "../data/transactions.json";
import { useEffect } from "react";

export default function App() {

  useEffect(() => {

    if(!localStorage.categories){
      localStorage.categories = JSON.stringify(dataCategories);
    }

    if(!localStorage.accounts){
      localStorage.accounts = JSON.stringify(dataAccounts);
    }

    if(!localStorage.transactions){
      localStorage.transactions = JSON.stringify(dataTransactions);
    }


  },)



  return (
    <>
      <Transactions />
    </>
  );
}