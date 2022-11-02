import classNames from "classnames";
import Categories from "components/categories";
import { useReducer, useState } from "react";
import style from "./Addtransaction.module.scss";
import { FaArrowDown, FaArrowUp, FaPlusCircle } from "react-icons/fa";
import Accounts from "components/accounts";
import Reccurence from "components/reccurence";
import Description from "components/description";
import Paid from "components/paid";

const today = new Date();
const year = today.getFullYear();
const mo = today.getMonth() + 1;
const da = today.getDate();
const month = mo < 10 ? "0" + mo : mo;
const day = da < 10 ? "0" + da : da;
const initialDate = year + "-" + month + "-" + day;

const initialAmount = "0,00";
const initialMessage = true;

const transactionState = {

  date: initialDate,
  amount: "0,00",
  reccurence: "não",
  reccurenceValue: "1",
  transaction: "expense",
  paid: true,
  category: "",
  account: "",
  description: "",
  message: true,

};

const reducer = (state: any, action: any) => {
  switch (action.type) {

    case "date":
      return { ...state, date: action.payload };

    case "reccurence":
      return { ...state, reccurence: action.payload };

    case "account":
      return { ...state, account: action.payload };

    case "category":
      return { ...state, category: action.payload };

    case "transaction":
      return { ...state, transaction: action.payload };

    case "description":
      return { ...state, description: action.payload };

    case "paid":
      return { ...state, paid: !state.paid };

    case "reccurenceValue":
      return { ...state, reccurenceValue: action.payload };

    default:
      throw new Error();


  }
}


export default function AddTransaction() {

  const [state, dispatch] = useReducer(reducer, transactionState);





  // const [date, setDate] = useState(initialDate);
  const [amount, setAmount] = useState(initialAmount);
  const [message, setMessage] = useState(initialMessage);

  console.log(state);

  // VERIFY MONEY
  function verifyMoney(r: any) {
    const verify = r.replace(/[^\d]/g, "");
    const verifyA = parseFloat(verify).toString();

    if (verifyA.length === 0) {
      const verifyB = "000";
      addMoney(verifyB);
    }
    else if (verifyA.length === 1) {
      const verifyB = "00" + verifyA;
      addMoney(verifyB);
    }
    else if (verifyA.length === 2) {
      const verifyB = "0" + verifyA;
      addMoney(verifyB);
    }
    else {
      const verifyB = verifyA;
      addMoney(verifyB);
    }
  };

  // ADDING MONEY
  function addMoney(r: string) {
    const verifyC = r.slice(0, r.length - 2) + "," + r.slice(r.length - 2, r.length);
    setAmount(verifyC);
  }


  // TYPE OF TRANSACTION
  function selectTransaction(r: any) {
    // setTransaction(r.target.name);
    // setReccurenceValue(initialReccurenceValue);
    // // setReccurence(initialReccurence);
    // setAmount(initialAmount);
    // // setDate(initialDate);
    // setAccount(initialAccount);
    // setCategory(initialCategory);
    // setDescription(initialDescription);
    // setMessage(initialMessage);
  }

  //SUBMIT
  function submitTransaction(r: any) {
    r.preventDefault();

    // if (amount == "0,00" || description == "" || category == "" || account == "") {
    //   setMessage(false);
    //   return;
    // }


  }

  return (
    <div>

      <form className={style.form} onSubmit={submitTransaction}>

        {/* TRANSACTION */}
        <div className={style.selectTransaction__div}>
          <button type="button" name="expense" className={classNames({
            [style.selectTransaction]: true,
            [style.selectTransaction__expense]: true,
            [state.transaction === "expense" ? style.selectTransaction__focusexpense : ""]: true,
          })} onClick={selectTransaction}>
            <FaArrowDown className={style.icon} /> DESPESA
          </button>
          <button type="button" name="incomes" className={classNames({
            [style.selectTransaction]: true,
            [style.selectTransaction__incomes]: true,
            [state.transaction === "incomes" ? style.selectTransaction__focusincomes : ""]: true,
          })} onClick={selectTransaction}>
            <FaArrowUp className={style.icon} /> RENDA
          </button>
        </div>

        {/* TITLE */}
        <div className={style.title}>
          <h1>Adicionar {state.transaction === "expense" ? "Despesa" : "Renda"}</h1>
          <h3>Preencha os campos abaixo para adicionar uma nova {state.transaction === "expense" ? "Despesa" : "Renda"}.</h3>
        </div>

        {/* AMOUNT */}
        <div className={style.col40}>
          <label htmlFor="amount">Valor:</label>
          <input type="text" name="amount" value={"R$ " + amount} onChange={r => verifyMoney(r.target.value)} />
          <span id="messageAmount" className={classNames({
            [style.message]: true,
            [style.hidden]: message,
          })}>Adicione o valor da {state.transaction === "expense" ? "Despesa" : "Renda"}.</span>
        </div>

        {/* DATE */}
        <div className={style.col40}>
          <label htmlFor="date">Data:</label>
          <input type="date" name="date" value={state.date} onChange={r => dispatch({ type: "date", payload: r.target.value })} />
        </div>

        {/* PAID */}
        <Paid paid={state.paid} transaction={state.transaction} handlePaid={(e: any) => dispatch({ type: "paid", payload: e.target.value })} />


        {/* DESCRIPTION */}
        <Description description={state.description} transaction={state.transaction} handleDescription={(e: any) => dispatch({ type: "description", payload: e.target.value })} />


        {/* CATEGORY */}
        <Categories category={state.category} transaction={state.transaction} handleCategory={(e: any) => dispatch({ type: "category", payload: e.target.name })} />


        {/* ACCOUNT */}
        <Accounts account={state.account} handleAccount={(e: any) => dispatch({ type: "account", payload: e.target.name })} />


        {/* RECCURENCE */}
        {state.transaction === "expense" ?
          <Reccurence reccurence={state.reccurence} reccurenceValue={state.reccurenceValue} handleReccurence={(e: any) => dispatch({ type: "reccurence", payload: e.target.name })} handleReccurenceValue={(e: any) => dispatch({ type: "reccurenceValue", payload: e })} />
          : ""}


        {/* SUBMIT */}

        <button type="submit" name="valor" className={classNames({
          [style.button__submit]: true,
          [state.transaction === "expense" ? style["button__submit--expense"] : style["button__submit--incomes"]]: true,
        })}><FaPlusCircle className={style.icon} /> Adicionar {state.transaction === "expense" ? "Despesa" : "Renda"}</button>

      </form>

    </div>
  );
}