import AccountsShow from "components/accounts";
import { useReducer, useState } from "react";
import styleFilter from "../../components/filters/Filters.module.scss";
import styleTransaction from "../../pages/transactions/Transaction.module.scss";
import CalculateDash from "components/Dashboard/functionDash";
import AddAccount from "components/addAccount";
import dataAccounts from "../../data/accounts.json";

const today = new Date();
const year = today.getFullYear();
const mo = today.getMonth() + 1;

const day = new Date(year, mo, 0).getDate();
const month = mo < 10 ? "0" + mo : mo;
const initialDate = year + "-" + month + "-01";
const finalDate = year + "-" + month + "-" + day;

const initialFilters = {
  initialDate: initialDate,
  finalDate: finalDate,
};

const filtersStates = (state: any, action: any) => {
  switch (action.type) {

    case "initialDate":
      return { ...state, initialDate: action.payload };

    case "finalDate":
      return { ...state, finalDate: action.payload };

    case "previousShow":
      return { ...state, previousShow: action.payload };

    case "incomesShow":
      return { ...state, incomesShow: action.payload };

    case "expenseShow":
      return { ...state, expenseShow: action.payload };

    case "balanceShow":
      return { ...state, balanceShow: action.payload };

    case "forecastShow":
      return { ...state, forecastShow: action.payload };

    case "reset":
      return action.payload;

    default:
      throw new Error();

  }
}

export default function Contas() {

  const [state, dispatch] = useReducer(filtersStates, initialFilters);
  const [updateTransactions, setUpdateTransactions] = useState(false);

  window.addEventListener('storage', () => {
    setUpdateTransactions(!updateTransactions);
  });

  if (!localStorage.accounts) {
    localStorage.accounts = JSON.stringify(dataAccounts);
  }

  const accounts = JSON.parse(localStorage.getItem("accounts") || '{}');

  return (
    <>

      <CalculateDash initialDate={state.initialDate} finalDate={state.finalDate} list={accounts} />

      <div className={styleTransaction.actionsOnTransactions}>
        <div className={styleFilter.containerFilters__date}>
          <div className={styleFilter.filter__data}>
            <input className={styleFilter.input__data} type="date" name="initialDate" value={state.initialDate} onChange={(e: any) => dispatch({ type: "initialDate", payload: e.target.value })} />
          </div>

          <div className={styleFilter.filter__data}>
            <input className={styleFilter.input__data} type="date" name="finalDate" min={state.initialDate} value={state.finalDate} onChange={(e: any) => dispatch({ type: "finalDate", payload: e.target.value })} />
          </div>
        </div>
        <div className={styleTransaction.buttonAddFilters}><AddAccount /></div>
      </div>


      {accounts.map((r: any, index: any) => <AccountsShow key={index} account={r.account} id={r.id} initialDate={state.initialDate} finalDate={state.finalDate} />)}
    </>
  );
}