import Transactions from "pages/transactions";
import dataAccounts from "../data/accounts.json";
import dataCategories from "../data/categories.json";
import dataTransactions from "../data/transactions.json";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import style from "./App.module.scss";
import Home from "./home";
import Orcamento from "./orcamento";
import DashboardInicial from "./dashboard";
import Contas from "./contas";
import {FaChartBar} from "react-icons/fa";

export default function App() {

  useEffect(() => {

    if (!localStorage.categories) {
      localStorage.categories = JSON.stringify(dataCategories);
    }

    if (!localStorage.accounts) {
      localStorage.accounts = JSON.stringify(dataAccounts);
    }

    if (!localStorage.transactions) {
      localStorage.transactions = JSON.stringify(dataTransactions);
    }


  },);

  return (
    <>
      <Router>
        <section className={style.section}>
        <div className={style.container__nav}>
          <img src="" />
          <nav>
            <ul>
              <li>
                <Link to="/">Início</Link>
              </li>
              <li>
                <Link to="/dashboard"><FaChartBar className={style.nav__icon} />Dashboard</Link>
              </li>
              <li>
                <Link to="/transacoes">Transações</Link>
              </li>
              <li>
                <Link to="/contas">Contas</Link>
              </li>
              <li>
                <Link to="/orcamento">Orçamento</Link>
              </li>
            </ul>
          </nav>

          Este webapp foi desenvolvido por ...
        </div>

        <div className={style.container__pages}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transacoes" element={<Transactions />} />
          <Route path="/orcamento" element={<Orcamento />} />
          <Route path="/dashboard" element={<DashboardInicial />} />
          <Route path="/contas" element={<Contas />} />
        </Routes>
        </div>
        </section>
      </Router>
    </>
  );
}