import classNames from "classnames";
import Categories from "components/addTransaction/categories";
import { useEffect, useReducer} from "react";
import style from "../addTransaction/Addtransaction.module.scss";
import { FaPlusCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Accounts from "components/addTransaction/accounts";
import Description from "components/addTransaction/description";
import Paid from "components/addTransaction/paid";
import DateAdd from "components/addTransaction/date";
import Amount from "components/addTransaction/amount";

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



export default function EditTransaction(props: any) {

  const transactionList = JSON.parse(localStorage.getItem("transactions") || '{}');

  const transaction = transactionList.filter((r: any) => r.id === props.idEdit);

  console.log("aqui",transaction);

  const transactionState = {
    date: transaction[0].date,
    amount: transaction[0].amount,
    reccurence: transaction[0].reccurence,
    reccurenceValue: transaction[0].reccurenceValue,
    transaction: transaction[0].transaction,
    paid: transaction[0].paid === "true" ? true : false,
    category: transaction[0].category,
    account: transaction[0].account,
    description: transaction[0].description,
  };

  const [state, dispatch] = useReducer(reducer, transactionState);
  const [message, dispatchMessage] = useReducer(reducerMessage, initialMessage);

  // CLOSE 
  function close(e: any) {
    dispatch({ type: "reset", payload: transactionState });
    dispatchMessage({ type: "reset", payload: initialMessage });
    props.handleEditTransaction(false);
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


  //SUBMIT
  function submitTransaction(r: any) {
    r.preventDefault();
    if (state.amount === "0,00" || state.description === "" || state.category === "" || state.account === "") {
      dispatchMessage({ type: "message", payload: true });
      return;
    } else {

      const dataLocalStorage = JSON.parse(localStorage.transactions);
      const localStorageTransactionRemoved = dataLocalStorage.filter((r: any) => r.id !== props.idEdit);

      // DATA TO LOCALSTORAGE
      const dataTransactionToSave = {
        "date": state.date,
        "description": state.description,
        "amount": state.amount,
        "category": state.category,
        "account": state.account,
        "paid": `${state.paid}`,
        "id": state.id,
        "reccurence": state.reccurence,
        "reccurenceValue": state.reccurenceValue,
        "transaction": state.transaction,
      };

      // SAVING ON LOCALSTORAGE
      const saveOnLocalStorage = [...localStorageTransactionRemoved, dataTransactionToSave];
      localStorage.setItem("transactions", JSON.stringify(saveOnLocalStorage));
    };

    window.dispatchEvent(new Event("storage"));
    dispatch({ type: "reset", payload: transactionState });
    dispatchMessage({ type: "reset", payload: initialMessage });
    props.handleEditTransaction(false);
    document.body.style.overflowY = 'unset';
  };


  return (
        <div className={style.containerPopup}>

          <form className={style.form} onSubmit={submitTransaction}>

            {/* TITLE */}
            <div className={style.title}>
             Editar {state.transaction === "expense" ? "Despesa" : "Renda"}
            </div>

            <div className={style.close}><IoMdClose className={style.icon__close} onClick={close} /></div>

            <div className={style.description}>
              Você pode alterar os valores da {state.transaction === "expense" ? "Despesa" : "Renda"}.
            </div>

            {/* AMOUNT */}
            <Amount amount={state.amount} transaction={state.transaction} handleAmount={(e: any) => dispatch({ type: "amount", payload: e })} message={message.message} messageAmount={message.messageAmount} />

            {/* DATE */}
            <DateAdd date={state.date} label={"Data:"} handleDate={(e: any) => dispatch({ type: "date", payload: e.target.value })} />

            {/* PAID */}
            <Paid paid={state.paid} transaction={state.transaction} handlePaid={(e: any) => dispatch({ type: "paid", payload: e })} />

            {/* DESCRIPTION */}
            <Description description={state.description} transaction={state.transaction} handleDescription={(e: any) => dispatch({ type: "description", payload: e.target.value })} message={message.message} messageDescription={message.messageDescription} />

            {/* CATEGORY */}
            <Categories category={state.category} transaction={state.transaction} handleCategory={(e: any) => dispatch({ type: "category", payload: e.target.name })} message={message.message} messageCategory={message.messageCategory} />

            {/* ACCOUNT */}
            <Accounts account={state.account} handleAccount={(e: any) => dispatch({ type: "account", payload: e.target.name })} message={message.message} messageAccount={message.messageAccount} />

            {/* CANCLE */}
            <button  onClick={close} type="button" name="cancel" className={classNames({
              [style.button__submit]: true,
              [style["button__submit--expense"]]: true,
            })}><IoMdClose className={style.icon} /> Cancelar</button>

            {/* SUBMIT */}
            <button type="submit" name="valor" className={classNames({
              [style.button__submit]: true,
              [style["button__submit--incomes"]]: true,
            })}><FaPlusCircle className={style.icon} /> Atualizar</button>

          </form>

        </div>
  );
}