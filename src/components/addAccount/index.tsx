import classNames from "classnames";
import { useEffect, useReducer, useState } from "react";
import style from "./Addaccount.module.scss";
import styleComponent from "../../styles/Components.module.scss";
import { FaPlusCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

const transactionState = {
  account: "",
};

const initialMessage = {
  message: false,
  messageDescription: true,
}

const reducer = (state: any, action: any) => {
  switch (action.type) {

    case "account":
      return { ...state, account: action.payload };

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

    case "messageDescription":
      return { ...message, messageDescription: action.payload };

    case "reset":
      return action.payload;

    default:
      throw new Error();
  }
}



export default function AddAccount() {

  const [state, dispatch] = useReducer(reducer, transactionState);
  const [message, dispatchMessage] = useReducer(reducerMessage, initialMessage);
  const [openPopup, setOpenPopup] = useState(false);

  function close(e: any) {
    dispatch({ type: "reset", payload: transactionState });
    dispatchMessage({ type: "reset", payload: initialMessage });
    setOpenPopup(false);
    document.body.style.overflowY = 'unset';
  }

  //MESSAGE
  useEffect(() => {
    if (state.account === transactionState.account) {
      dispatchMessage({ type: "messageDescription", payload: true })
    } else {
      dispatchMessage({ type: "messageDescription", payload: false })
    }
  }, [state]);

  //SUBMIT
  function submitTransaction(r: any) {
    r.preventDefault();

    if (state.account === "") {
      dispatchMessage({ type: "message", payload: true });
      return;
    } else {
      // GET DATE FROM LOCALSTORAGE
      const dataLocalStorage = JSON.parse(localStorage.accounts);

      // DATA TO LOCALSTORAGE
      const dataTransactionToSave = {
        "account": state.account,
        "id": uuidv4()
      }

      const saveOnLocalStorage = [...dataLocalStorage, dataTransactionToSave];
      localStorage.setItem("accounts", JSON.stringify(saveOnLocalStorage));
    };

    window.dispatchEvent(new Event("storage"));
    dispatch({ type: "reset", payload: transactionState });
    dispatchMessage({ type: "reset", payload: initialMessage });
    setOpenPopup(false);
    document.body.style.overflowY = 'unset';
  }

  function openModal() {
    document.body.style.overflowY = 'hidden';
    setOpenPopup(true);
  }

  return (
    <div>
      <div className={style.addTransaction__div}>
        <button className={style.addTransaction__button} type="button" onClick={openModal}><FaPlusCircle className={style.icon__addTransaction} /> Adicionar Conta</button>
      </div>

      {openPopup === true ?

        <div className={style.containerPopup}>
          <form className={style.form} onSubmit={submitTransaction}>

            {/* TITLE */}
            <div className={style.title}>
              Adicionar Conta
            </div>
            <div className={style.close}><IoMdClose className={style.icon__close} onClick={close} /></div>
            <div className={style.description}>
              Preencha os campos abaixo para adicionar uma nova conta.
            </div>

            {/* TITLE */}
            <div className={styleComponent.col100}>
              <label className={styleComponent.labelAdd} htmlFor="description">Título da Nova Conta</label>
              <input className={styleComponent.inputAdd} type="text" maxLength={20} name="description" value={state.account} onChange={(e: any) => dispatch({ type: "account", payload: e.target.value })} />
              <span id="messageDescription" className={classNames({
                [styleComponent.message]: true,
                [styleComponent.hidden]: message.message === true && message.messageDescription === true ? false : true,
              })}>Adicione um título curto para a Conta.</span>
            </div>

            {/* SUBMIT */}
            <button type="submit" name="valor" className={classNames({
              [style.button__submit]: true,
              [style["button__submit--incomes"]]: true,
            })}><FaPlusCircle className={style.icon} /> Adicionar Conta</button>

          </form>
        </div>
        : ""}

    </div>
  );
}