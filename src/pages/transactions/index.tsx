import SingleTransaction from "components/singleTransaction";
import { useReducer, useState } from "react";
import style from "./Transaction.module.scss";
import styleSingle from "../../components/singleTransaction/Singletransaction.module.scss";
import FiltersTransactions from "components/filters";
import AddTransaction from "components/addTransaction";
import { FaArrowDown, FaArrowUp, FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import styleFilter from "../../components/filters/Filters.module.scss";
import EditTransaction from "components/editTransaction";
import Dashboard from "components/Dashboard";
import dataAccounts from "../../data/accounts.json";
import dataCategories from "../../data/categories.json";
import dataTransactions from "../../data/transactions.json";

const today = new Date();
const year = today.getFullYear();
const mo = today.getMonth() + 1;

const day = new Date(year, mo, 0).getDate();
const month = mo < 10 ? "0" + mo : mo;
const initialDate = year + "-" + month + "-01";
const finalDate = year + "-" + month + "-" + day;

const initialFilters = {
  paid: "todos",
  category: "todas",
  account: "todas",
  initialDate: initialDate,
  finalDate: finalDate,
  transaction: "todas"
};

const filtersStates = (state: any, action: any) => {
  switch (action.type) {

    case "paid":
      return { ...state, paid: action.payload };

    case "category":
      return { ...state, category: action.payload };

    case "account":
      return { ...state, account: action.payload };

    case "initialDate":
      return { ...state, initialDate: action.payload };

    case "finalDate":
      return { ...state, finalDate: action.payload };

    case "transaction":
      return { ...state, transaction: action.payload };

    case "reset":
      return action.payload;

    default:
      throw new Error();

  }
}

const initialPopUps = {
  filters: false,
  editTransaction: false,
};


const openPopUps = (statePopUps: any, action: any) => {
  switch (action.type) {

    case "filters":
      return { ...statePopUps, filters: !statePopUps.filters };

    case "editTransaction":
      return { ...statePopUps, editTransaction: !statePopUps.editTransaction };

    case "idEdit":
      return { ...statePopUps, idEdit: action.payload }

    case "reset":
      return action.payload;

    default:
      throw new Error();

  }
}

export default function Transactions() {

  const [state, dispatch] = useReducer(filtersStates, initialFilters)
  const [updateTransactions, setUpdateTransactions] = useState(false);
  const [order, setOrder] = useState(false);
  const [statePopUps, dispatchPopUps] = useReducer(openPopUps, initialPopUps);


  window.addEventListener('storage', () => {
    setUpdateTransactions(!updateTransactions);
  });

  if (!localStorage.categories) {
    localStorage.categories = JSON.stringify(dataCategories);
  }

  if (!localStorage.accounts) {
    localStorage.accounts = JSON.stringify(dataAccounts);
  }

  if (!localStorage.transactions) {
    localStorage.transactions = JSON.stringify(dataTransactions);
  }
  
  const transaction = JSON.parse(localStorage.getItem("transactions") || '{}');

  const transactionFilteredOffDate = transaction.filter(
    (r: any) => state.paid !== "todos" ? r.paid === state.paid : r).filter(
      (r: any) => state.category !== "todas" ? r.category === state.category : r).filter(
        (r: any) => state.account !== "todas" ? r.account === state.account : r).filter(
          (r: any) => state.transaction !== "todas" ? r.transaction === state.transaction : r);

  const transactionFiltered = transactionFilteredOffDate.filter(
    (r: any) => state.initialDate <= r.date && state.finalDate >= r.date);

  const listOfTransactions = order === false ? transactionFiltered.sort(function (a: any, b: any) {
    if (a.date > b.date) { return 1; } if (a.date < b.date) { return -1; } return 0;
  })
    : transactionFiltered.sort(function (a: any, b: any) {
      if (a.date > b.date) { return 1; } if (a.date < b.date) { return -1; } return 0;
    }).reverse();

  const sumOfTransactions = listOfTransactions;

  // PREVIOUS BALANCE

  const previousIncomesFilter = transactionFilteredOffDate.filter((r: any) => r.transaction === "incomes").filter(
    (r: any) => r.paid === "true").filter(
      (r: any) => "0001-01-01" < r.date && state.initialDate > r.date);
  const previousIncomesMap = previousIncomesFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const previousIncomesSum = previousIncomesMap.reduce((r: number, m: number) => r + m, 0);

  const previousExpenseFilter = transactionFilteredOffDate.filter((r: any) => r.transaction === "expense").filter(
    (r: any) => r.paid === "true").filter(
      (r: any) => "0001-01-01" < r.date && state.initialDate > r.date);
  const previousExpenseMap = previousExpenseFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const previousExpenseSum = previousExpenseMap.reduce((r: number, m: number) => r + m, 0);

  const previousSum = previousIncomesSum - previousExpenseSum;
  const previousFixed = previousSum.toFixed(2);
  const previousShow = previousFixed.toString().replace(".", ",");


  // INCOMES

  const incomesFilter = sumOfTransactions.filter((r: any) => r.transaction === "incomes").filter(
    (r: any) => r.paid === "true");
  const incomesMap = incomesFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const incomesSum = incomesMap.reduce((r: number, m: number) => r + m, 0);
  const incomesFixed = incomesSum.toFixed(2);
  const incomesShow = incomesFixed.toString().replace(".", ",");

  // EXPENSE

  const expenseFilter = sumOfTransactions.filter((r: any) => r.transaction === "expense").filter(
    (r: any) => r.paid === "true");
  const expenseMap = expenseFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const expenseSum = expenseMap.reduce((r: number, m: number) => r + m, 0);
  const expenseFixed = expenseSum.toFixed(2);
  const expenseShow = expenseFixed.toString().replace(".", ",");

  // BALANCE

  const resultsSum = previousSum + incomesSum - expenseSum;
  const resultsFixed = resultsSum.toFixed(2);
  const resultsShow = resultsFixed.toString().replace(".", ",");

  // FORECAST

  const incomesForecastFilter = sumOfTransactions.filter((r: any) => r.transaction === "incomes");
  const incomesForecastMap = incomesForecastFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const incomesForecastSum = incomesForecastMap.reduce((r: number, m: number) => r + m, 0);

  const expenseForecastFilter = sumOfTransactions.filter((r: any) => r.transaction === "expense");
  const expenseForecastMap = expenseForecastFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const expenseForecastSum = expenseForecastMap.reduce((r: number, m: number) => r + m, 0);

  const forecastSum = previousSum + incomesForecastSum - expenseForecastSum;
  const forecastFixed = forecastSum.toFixed(2);
  const forecastShow = forecastFixed.toString().replace(".", ",");


  const stylingHeader = {
    "color": "#000",
    "fontSize": "10px",
    "fontWeight": "600",
  }

  function closeFilters(e: any) {
    dispatchPopUps({ type: "filters", payload: e });
    dispatch({ type: "reset", payload: initialFilters });

  }

  return (
    <>

      <Dashboard previous={previousShow} incomes={incomesShow} expense={expenseShow} sumResults={resultsShow} forecastResults={forecastShow} />

      {statePopUps.editTransaction === true ? <EditTransaction idEdit={statePopUps.idEdit} handleEditTransaction={(e: any) => dispatchPopUps({ type: "editTransaction", payload: e })} /> : ""}

      <div className={style.actionsOnTransactions}>
        <div className={styleFilter.containerFilters__date}>
          <div className={styleFilter.filter__data}>
            <input className={styleFilter.input__data} type="date" name="initialDate" value={state.initialDate} onChange={(e: any) => dispatch({ type: "initialDate", payload: e.target.value })} />
          </div>

          <div className={styleFilter.filter__data}>
            <input className={styleFilter.input__data} type="date" name="finalDate" min={state.initialDate} value={state.finalDate} onChange={(e: any) => dispatch({ type: "finalDate", payload: e.target.value })} />
          </div>
        </div>

        <div className={style.buttonAddTransaction}><AddTransaction /></div>
        <div className={style.filters}><div className={style.addFilters__div}>

          {statePopUps.filters === true
            ? <button className={style.addFilters__button} type="button" onClick={closeFilters}><IoMdClose className={style.icon__closeFilters} /> Fechar Filtros </button>
            : <button className={style.addFilters__button} type="button" onClick={(e: any) => dispatchPopUps({ type: "filters", payload: e })}><FaFilter className={style.icon__addFilters} /> Filtros</button>}
        </div>

        </div>

        {statePopUps.filters === true ?

          <div className={style.actionsOnTransactions}>

            <FiltersTransactions paid={state.paid}
              handlePaid={(e: any) => dispatch({ type: "paid", payload: e.target.value })}
              category={state.category}
              handleCategory={(e: any) => dispatch({ type: "category", payload: e.target.value })}
              account={state.account}
              handleAccount={(e: any) => dispatch({ type: "account", payload: e.target.value })}
              transaction={state.transaction}
              handleTransaction={(e: any) => dispatch({ type: "transaction", payload: e.target.value })} /></div>
          : ""}

      </div>




      {/* ///////////////////// */}
      <div className={style.transactions}>
        <div className={styleSingle.transaction}>


          <div className={styleSingle.content__date} style={stylingHeader} >DATA
            {order === false ? <FaArrowDown className={style.icon__order} onClick={(r: any) => setOrder(true)} /> : <FaArrowUp className={style.icon__order} onClick={(r: any) => setOrder(false)} />}
          </div>

          <div className={styleSingle.content__description} style={stylingHeader} >DESCRI????O</div>

          <div className={styleSingle.content__category} style={stylingHeader} >CATEGORIA</div>

          <div className={styleSingle.content__amountexpense} style={stylingHeader} >VALOR</div>

          <div className={styleSingle.content__paid} style={stylingHeader} >PAGO</div>

          <div className={styleSingle.content__account} style={stylingHeader} >CONTA</div>

          <div className={styleSingle.content__reccurence} style={stylingHeader} >PARC.</div>

          <div className={styleSingle.content__action} style={stylingHeader} >A????ES</div>

        </div>
        {listOfTransactions.map(
          (m: any, index: any) => <SingleTransaction key={index} id={m.id} date={m.date} description={m.description} amount={m.amount} category={m.category} account={m.account} paid={m.paid} reccurence={m.reccurence} reccurenceValue={m.reccurenceValue} transaction={m.transaction} handleEditTransaction={(e: any) => dispatchPopUps({ type: "editTransaction", payload: e })} handleIdEdit={(e: any) => dispatchPopUps({ type: "idEdit", payload: e })} />

        )}
      </div ></>
  );
}