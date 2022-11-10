import classNames from "classnames";
import Categories from "components/addTransaction/categories";
import { useEffect, useReducer, useState } from "react";
import style from "./Addtransaction.module.scss";
import { FaArrowDown, FaArrowUp, FaPlusCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Accounts from "components/addTransaction/accounts";
import Reccurence from "components/addTransaction/reccurence";
import Description from "components/addTransaction/description";
import Paid from "components/addTransaction/paid";
import DateAdd from "components/addTransaction/date";
import Amount from "components/addTransaction/amount";
import { v4 as uuidv4 } from "uuid";
import dataTransactions from "../../data/transactions.json";

const today = new Date();
const year = today.getFullYear();
const mo = today.getMonth() + 1;
const da = today.getDate();
const month = mo < 10 ? "0" + mo : mo;
const day = da < 10 ? "0" + da : da;
const initialDate = year + "-" + month + "-" + day;

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
};

const initialMessage = {
  message: false,
  messageAmount: true,
  messageDescription: true,
  messageCategory: true,
  messageAccount: true,
  messageReccurence: true,
}

const reducer = (state: any, action: any) => {
  switch (action.type) {

    case "date":
      return { ...state, date: action.payload };

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

    case "reccurence":
      return { ...state, reccurence: action.payload };

    case "reccurenceValue":
      return { ...state, reccurenceValue: action.payload };

    case "amount":
      return { ...state, amount: action.payload };

    case "reset":
      return action.payload;

    default:
      throw new Error();
  }
}


const reducerMessage = (message: any, action: any) => {
  switch (action.type) {

    case "message":
      return { ...message, message: action.payload };

    case "messageAmount":
      return { ...message, messageAmount: action.payload };

    case "messageDescription":
      return { ...message, messageDescription: action.payload };

    case "messageCategory":
      return { ...message, messageCategory: action.payload };

    case "messageAccount":
      return { ...message, messageAccount: action.payload };

    case "messageReccurenceValue":
      return { ...message, messageReccurenceValue: action.payload };

    case "reset":
      return action.payload;

    default:
      throw new Error();
  }
}



export default function AddTransaction() {

  const [state, dispatch] = useReducer(reducer, transactionState);
  const [message, dispatchMessage] = useReducer(reducerMessage, initialMessage);
  const [openPopup, setOpenPopup] = useState(false);

  if (!localStorage.transactions) {
    localStorage.transactions = JSON.stringify(dataTransactions);
  }

  // TYPE OF TRANSACTION
  function selectTransaction(e: any) {
    dispatch({ type: "reset", payload: transactionState });
    dispatchMessage({ type: "reset", payload: initialMessage });
    dispatch({ type: "transaction", payload: e.target.name });
  }

  function close(e: any) {
    dispatch({ type: "reset", payload: transactionState });
    dispatchMessage({ type: "reset", payload: initialMessage });
    setOpenPopup(false);
    document.body.style.overflowY = 'unset';

  }

  //MESSAGE
  useEffect(() => {
    if (state.amount === transactionState.amount) {
      dispatchMessage({ type: "messageAmount", payload: true })
    } else {
      dispatchMessage({ type: "messageAmount", payload: false })
    }

    if (state.description === transactionState.description) {
      dispatchMessage({ type: "messageDescription", payload: true })
    } else {
      dispatchMessage({ type: "messageDescription", payload: false })
    }

    if (state.category === transactionState.category) {
      dispatchMessage({ type: "messageCategory", payload: true })
    } else {
      dispatchMessage({ type: "messageCategory", payload: false })
    }

    if (state.account === transactionState.account) {
      dispatchMessage({ type: "messageAccount", payload: true })
    } else {
      dispatchMessage({ type: "messageAccount", payload: false })
    }

    if (state.reccurenceValue === transactionState.reccurenceValue) {
      dispatchMessage({ type: "messageReccurenceValue", payload: true })
    } else {
      dispatchMessage({ type: "messageReccurenceValue", payload: false })
    }
  }, [state]);


  // RECCURENCE
  const quantasParcelas = parseInt(state.reccurenceValue);

  const scoreMin = Math.ceil(10000000);
  const scoreMax = Math.floor(99999999);
  const random = Math.floor(Math.random() * (scoreMax - scoreMin + 1)) + scoreMin;

  //SUBMIT
  function submitTransaction(r: any) {
    r.preventDefault();

    if (state.amount === "0,00" || state.description === "" || state.category === "" || state.account === "") {
      dispatchMessage({ type: "message", payload: true });
      return;
    } else {
      for (let i = 0; i < quantasParcelas; i++) {

        // GET DATE FROM LOCALSTORAGE
        const dataLocalStorage = JSON.parse(localStorage.transactions);

        const firstDate = state.date;
        const createDate= new Date(firstDate);
        const addingMonth = new Date(createDate.setMonth(createDate.getMonth() + i));
        const newDate = new Date(addingMonth.setDate(addingMonth.getDate() + 1));

        const newYear = newDate.getFullYear();
        const newMo = newDate.getMonth() + 1;
        const newDa = newDate.getDate();
        const newMonth = newMo < 10 ? "0" + newMo : newMo;
        const newDay = newDa < 10 ? "0" + newDa : newDa;
        const dateReccurence = newYear + "-" + newMonth + "-" + newDay;

        // DATA TO LOCALSTORAGE
        const dataTransactionToSave = {
          "date": dateReccurence,
          "description": state.description,
          "amount": state.amount,
          "category": state.category,
          "account": state.account,
          "paid": `${state.paid}`,
          "id": uuidv4() + i + random,
          "reccurence": state.reccurence,
          "reccurenceValue": `${i + 1}/${quantasParcelas}`,
          "transaction": state.transaction,
        }

        const saveOnLocalStorage = [...dataLocalStorage, dataTransactionToSave];
        localStorage.setItem("transactions", JSON.stringify(saveOnLocalStorage));
      };

      window.dispatchEvent(new Event("storage"));
      dispatch({ type: "reset", payload: transactionState });
      dispatchMessage({ type: "reset", payload: initialMessage });
      setOpenPopup(false);
      document.body.style.overflowY = 'unset';
    }



  }

  function openModal() {
    document.body.style.overflowY = 'hidden';
    setOpenPopup(true);
  }


  return (
    <div>
      <div className={style.addTransaction__div}>
        <button className={style.addTransaction__button} type="button" onClick={openModal}><FaPlusCircle className={style.icon__addTransaction} /> Adicionar Transação</button>
      </div>

      {openPopup === true ?

        <div className={style.containerPopup}>

          <form className={style.form} onSubmit={submitTransaction}>



            {/* TITLE */}
            <div className={style.title}>
              Adicionar {state.transaction === "expense" ? "Despesa" : "Renda"}
            </div>

            <div className={style.close}><IoMdClose className={style.icon__close} onClick={close} /></div>

            <div className={style.description}>
              Preencha os campos abaixo para adicionar uma nova {state.transaction === "expense" ? "Despesa" : "Renda"}.
            </div>



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

            {/* AMOUNT */}
            <Amount amount={state.amount} transaction={state.transaction} handleAmount={(e: any) => dispatch({ type: "amount", payload: e })} message={message.message} messageAmount={message.messageAmount} />

            {/* DATE */}
            <DateAdd date={state.date} label={"Data:"} handleDate={(e: any) => dispatch({ type: "date", payload: e.target.value })} />


            {/* PAID */}
            <Paid paid={state.paid} transaction={state.transaction} handlePaid={(e: any) => dispatch({ type: "paid", payload: e})} />


            {/* DESCRIPTION */}
            <Description description={state.description} transaction={state.transaction} handleDescription={(e: any) => dispatch({ type: "description", payload: e.target.value })} message={message.message} messageDescription={message.messageDescription} />


            {/* CATEGORY */}
            <Categories category={state.category} transaction={state.transaction} handleCategory={(e: any) => dispatch({ type: "category", payload: e.target.name })} message={message.message} messageCategory={message.messageCategory} />


            {/* ACCOUNT */}
            <Accounts account={state.account} handleAccount={(e: any) => dispatch({ type: "account", payload: e.target.name })} message={message.message} messageAccount={message.messageAccount} />


            {/* RECCURENCE */}
            {state.transaction === "expense" ?
              <Reccurence reccurence={state.reccurence} reccurenceValue={state.reccurenceValue} handleReccurence={(e: any) => dispatch({ type: "reccurence", payload: e.target.name })} handleReccurenceValue={(e: any) => dispatch({ type: "reccurenceValue", payload: e })} message={message.message} messageReccurenceValue={message.messageReccurenceValue} />
              : ""}


            {/* SUBMIT */}

            <button type="submit" name="valor" className={classNames({
              [style.button__submit]: true,
              [state.transaction === "expense" ? style["button__submit--expense"] : style["button__submit--incomes"]]: true,
            })}><FaPlusCircle className={style.icon} /> Adicionar {state.transaction === "expense" ? "Despesa" : "Renda"}</button>

          </form>

        </div>

        : ""}

    </div>
  );
}