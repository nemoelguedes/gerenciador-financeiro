import style from "./Singletransaction.module.scss";
import { FaArrowDown, FaArrowUp, FaEdit, FaTrashAlt, FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import category from "../../data/categories.json";
import { useState } from "react";


export default function SingleTransaction(props: any) {

  const [updateTransactions, setUpdateTransactions] = useState(false);

  const preIconCategory = category.filter(r => props.category === r.category);
  const iconCategory = preIconCategory.map(m => [m.category, m.icon]).flat();

  function removeFromLocalStorage() {
    const transaction = JSON.parse(localStorage.getItem("transactions") || '{}');
    const filtered = transaction.filter((e: any) => e.id !== props.id);
    localStorage.setItem("transactions", JSON.stringify(filtered));
    window.dispatchEvent(new Event("storage"));
  }

  function editTransaction() {
    props.handleIdEdit(props.id);
    props.handleEditTransaction(true);
  }

  function updatePaid() {

    const dataLocalStorage = JSON.parse(localStorage.transactions);
    const lenght = dataLocalStorage.reduce((sum:any) => sum + 1, 0);

    const dataToIndex = dataLocalStorage.slice(0);
    const dataToFilter = dataLocalStorage.slice(0);
    const dataToSplit = dataLocalStorage.slice(0);

    const index = dataToIndex.map((r:any) => r.id).indexOf(props.id);
    const firstPart = dataToFilter.splice(0,index);
    const secondPart = dataToSplit.splice(index + 1, lenght);


    const dataFromThisTransaction = dataLocalStorage.filter((r: any) => r.id == props.id);
    const localStorageTransactionRemoved = dataLocalStorage.filter((r: any) => r.id !== props.id);
    const newArray = dataFromThisTransaction[0];
    const paidTrueOrFalse = newArray.paid
    const changingPaid = paidTrueOrFalse == "true" ? "false" : "true";
    newArray.paid = changingPaid;


    // SAVING ON LOCALSTORAGE
    const saveOnLocalStorage = [...firstPart, newArray, ...secondPart];
    localStorage.setItem("transactions", JSON.stringify(saveOnLocalStorage));
    window.dispatchEvent(new Event("storage"));

  }

  window.addEventListener('storage', () => {
    setUpdateTransactions(!updateTransactions);
  });

  return (
    <div className={style.transaction}>

      {/* DATE */}
      <div className={style.content__date}>{props.date}</div>

      {/* DESCRIPTION */}
      <div className={style.content__description}>{props.description}</div>

      {/* CATEGORY */}
      <div className={style.content__category}> <><img src={iconCategory[1]} className={style.icon__category} alt={props.category} /> {props.category}</></div>


      {/* AMOUNT */}
      {props.transaction === "expense"
        ? <div className={style.content__amountexpense}> <FaArrowDown className={style.icon__expense} /> R$ {props.amount}</div>
        : <div className={style.content__amountincomes}> <FaArrowUp className={style.icon__incomes} /> R$ {props.amount}</div>}

      {/* PAID */}
      <div className={style.content__paid}>
        {props.paid === "true"
          ? <FaCheckCircle onClick={updatePaid} className={style.icon__paid} />
          : <FaTimesCircle onClick={updatePaid}  className={style.icon__notPaid} />}
      </div>

      {/* ACCOUNT */}
      <div className={style.content__account}>{props.account}</div>

      {/* RECURRENCE */}
      <div className={style.content__reccurence}>
        {props.reccurence === "não" ? "" : props.reccurenceValue}
      </div>

      {/* ACTIONS */}
      <div className={style.content__action}>
        <FaEdit className={style.icon__action} values={props.id} onClick={editTransaction} />
        <FaTrashAlt onClick={removeFromLocalStorage} className={style.icon__action} />
      </div>



    </div>
  );
}