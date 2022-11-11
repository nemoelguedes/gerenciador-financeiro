import Transactions from "pages/transactions";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import style from "./App.module.scss";
import DashboardInicial from "./dashboard";
import Contas from "./contas";
import { FaChartBar, FaList, FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";
import classNames from "classnames";
import dataAccounts from "../data/accounts.json";
import dataCategories from "../data/categories.json";
import dataTransactions from "../data/transactions.json";
import ScrollToTop from "components/scrolltotop";

export default function App() {

  const [navState, setNavState] = useState(true);

  if (!localStorage.categories) {
    localStorage.categories = JSON.stringify(dataCategories);
  }

  if (!localStorage.accounts) {
    localStorage.accounts = JSON.stringify(dataAccounts);
  }

  if (!localStorage.transactions) {
    localStorage.transactions = JSON.stringify(dataTransactions);
  }

  return (
    <>
      <Router>
        <section className={style.section}>
          <div className={classNames({
            [style.container__nav]: true,
            [navState === true ? style["container__nav--statea"] : style["container__nav--stateb"]]: true,
          })}>
            {navState === true
              ? <FaArrowAltCircleRight className={classNames({
                [style.container__icon]: true,
                [style["container__icon--statea"]]: true,
              })} onClick={() => setNavState(!navState)} />
              : <FaArrowAltCircleLeft className={classNames({
                [style.container__icon]: true,
                [style["container__icon--stateb"]]: true,
              })} onClick={() => setNavState(!navState)} />}
            <nav>
              <ul>

                <Link to="/">
                  <div className={style.divlogo}>
                    <img src="assets/finans.png" className={style.logo} alt="logo" />
                  </div></Link>




                <li>
                  <Link to="/">
                    <FaChartBar className={style.nav__icon} />
                    <div className={classNames({
                      [navState === true ? style["nav__title--close"] : style.nav__title]: true,
                    })}>
                      Dashboard
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/transacoes">
                    <FaList className={style.nav__icon} />
                    <div className={classNames({
                      [navState === true ? style["nav__title--close"] : style.nav__title]: true,
                    })}>
                      Transações
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/contas">
                    <RiBankFill className={style.nav__icon} />
                    <div className={classNames({
                      [navState === true ? style["nav__title--close"] : style.nav__title]: true,
                    })}>
                      Contas
                    </div>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className={classNames({
            [style.container__pages]: true,
            [navState === true ? style["container__pages--statea"] : style["container__pages--stateb"]]: true,
          })}>
            <Routes>
              <Route path="/transacoes" element={<><ScrollToTop /><Transactions /></>} />
              <Route path="/" element={<><ScrollToTop /><DashboardInicial /></>} />
              <Route path="/contas" element={<><ScrollToTop /><Contas /></>} />
            </Routes>
          </div>
        </section>
      </Router>
    </>
  );
}