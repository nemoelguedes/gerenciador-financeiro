import SingleTransaction from "components/singleTransaction";
import { useReducer, useState } from "react";
import style from "./Transaction.module.scss";
import styleSingle from "../../components/singleTransaction/Singletransaction.module.scss";
import FiltersTransactions from "components/filters";
import AddTransaction from "components/addTransaction";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";


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

export default function Transactions() {

  const [state, dispatch] = useReducer(filtersStates, initialFilters)
  const [updateTransactions, setUpdateTransactions] = useState(false);
  const [order, setOrder] = useState(false);


  window.addEventListener('storage', () => {
    console.log("change to local storage!");
    setUpdateTransactions(!updateTransactions);
  });

  const transaction = JSON.parse(localStorage.getItem("transactions") || '{}');

  const transactionFiltered = transaction.filter(
    (r: any) => state.initialDate <= r.date && state.finalDate >= r.date).filter(
      (r: any) => state.paid !== "todos" ? r.paid === state.paid : r).filter(
        (r: any) => state.category !== "todas" ? r.category === state.category : r).filter(
          (r: any) => state.account !== "todas" ? r.account === state.account : r).filter(
            (r: any) => state.transaction !== "todas" ? r.transaction === state.transaction : r);

  const listOfTransactions = order === false ? transactionFiltered.sort(function (a:any, b:any) {
    if (a.date > b.date) {return 1;} if (a.date < b.date) {return -1;} return 0;})
    : transactionFiltered.sort(function (a:any, b:any) {
      if (a.date > b.date) {return 1;} if (a.date < b.date) {return -1;} return 0;}).reverse();


  const stylingHeader = {
    "color": "#000",
    "fontSize": "12px",
    "fontWeight": "600",
  }

  return (
    <>

      <div className={style.actionsOnTransactions}>
      <div className={style.filters}><FiltersTransactions initialDate={state.initialDate}
        handleInitialDate={(e: any) => dispatch({ type: "initialDate", payload: e.target.value })}
        finalDate={state.finalDate}
        handleFinalDate={(e: any) => dispatch({ type: "finalDate", payload: e.target.value })}
        paid={state.paid}
        handlePaid={(e: any) => dispatch({ type: "paid", payload: e.target.value })}
        category={state.category}
        handleCategory={(e: any) => dispatch({ type: "category", payload: e.target.value })} 
        account={state.account}
        handleAccount={(e: any) => dispatch({ type: "account", payload: e.target.value })} 
        transaction={state.transaction}
        handleTransaction={(e: any) => dispatch({ type: "transaction", payload: e.target.value })} /></div>

        <div className={style.buttonAddTransaction}><AddTransaction /></div>
        </div>



      {/* ///////////////////// */}
      <div className={style.transactions}>
        <div className={styleSingle.transaction}>
          <div className={styleSingle.content__block1}>
            <div className={styleSingle.content__date} style={stylingHeader} >DATA 
            {order === false ? <FaArrowDown className={style.icon__order} onClick={(r:any) => setOrder(true)} /> : <FaArrowUp  className={style.icon__order}  onClick={(r:any) => setOrder(false)} />}
            </div>
            <div className={styleSingle.content__category} style={stylingHeader} >CATEGORIA</div>
          </div>
          <div className={styleSingle.content__block2}>
            <div className={styleSingle.content__description} style={stylingHeader} >DESCRIÇÃO</div>
            <div className={styleSingle.content__account} style={stylingHeader} >CONTA</div>
          </div>
          <div className={styleSingle.content__block3}>
            <div className={styleSingle.content__amount} style={stylingHeader} >VALOR</div>
            <div className={styleSingle.content__reccurence} style={stylingHeader} >PARC.</div>
          </div>
          <div className={styleSingle.content__block4}>
            <div className={styleSingle.content__paid} style={stylingHeader} >PAGO</div>
            <div className={styleSingle.content__action} style={stylingHeader} >AÇÕES</div>
          </div>
        </div>
        {listOfTransactions.map(
          (m: any, index: any) => <SingleTransaction key={index} id={m.id} date={m.date} description={m.description} amount={m.amount} category={m.category} account={m.account} paid={m.paid} reccurence={m.reccurence} reccurenceValue={m.reccurenceValue} transaction={m.transaction} />

        )}
      </div ></>
  );
}