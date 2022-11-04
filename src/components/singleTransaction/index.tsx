import ITransaction from "interfaces/transaction";
import style from "./Singletransaction.module.scss";
import { FaArrowDown, FaArrowUp, FaEdit, FaTrashAlt, FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import category from "../../data/categories.json";


export default function SingleTransaction(props: ITransaction) {

  const preIconCategory = category.filter(r => props.category === r.category);
  const iconCategory = preIconCategory.map(m => [m.category, m.icon]).flat();

  function removeFromLocalStorage() {
    const transaction = JSON.parse(localStorage.getItem("transactions") || '{}');
    const filtered = transaction.filter((e:any) => e.id !== props.id);
    localStorage.setItem("transactions", JSON.stringify(filtered));
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <div className={style.transaction}>

      <div className={style.content__block1}>

        {/* DATE */}
        <div className={style.content__date}>{props.date}</div>

        {/* CATEGORY */}
        <div className={style.content__category}> <><img src={iconCategory[1]} className={style.icon__category} alt={props.category} /> {props.category}</></div>


      </div>

      <div className={style.content__block2}>

        {/* DESCRIPTION */}
        <div className={style.content__description}>{props.description}</div>

        {/* ACCOUNT */}
        <div className={style.content__account}>{props.account}</div>

      </div>

      <div className={style.content__block3}>

        {/* AMOUNT */}
        {props.transaction === "expense"
        ?<div className={style.content__amountexpense}> <FaArrowDown className={style.icon__expense} /> R$ {props.amount}</div>
        :<div className={style.content__amountincomes}> <FaArrowUp className={style.icon__incomes} /> R$ {props.amount}</div>}
        

        {/* RECURRENCE */}
        <div className={style.content__reccurence}>
          {props.reccurence === "não" ? "" : props.reccurenceValue}
        </div>

      </div>

      <div className={style.content__block4}>

        {/* PAID */}
        <div className={style.content__paid}>
          {props.paid === "true"
            ? <FaCheckCircle className={style.icon__paid} />
            : <FaTimesCircle className={style.icon__notPaid} />}
        </div>

        {/* ACTIONS */}
        <div className={style.content__action}>
          <FaEdit className={style.icon__action} />
          <FaTrashAlt onClick={removeFromLocalStorage} className={style.icon__action} />
        </div>

      </div>


    </div>
  );
}