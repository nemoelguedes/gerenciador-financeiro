import { IExpense } from "interfaces/expense";
import style from "./Singleexpense.module.scss";
import { FaArrowDown, FaEdit, FaTrashAlt, FaTimesCircle, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import category from "../../data/categories__expenses.json";


export default function SingleExpense(props: IExpense) {

  const [paid, setPaid] = useState(props.paid);


  const preIconCategory = category.filter(r => props.category == r.category);
  const iconCategory = preIconCategory.map(m => [m.category, m.icon]).flat();

  console.log(iconCategory);

  function paying() {
    setPaid(!paid)
  };


  return (
    <div className={style.expense}>

      <div className={style.content__block1}>

      {/* DATE */}
      <div className={style.content__date}>{props.date}</div>

      {/* CATEGORY */}
      <div className={style.content__category}> <><img src={iconCategory[1]} className={style.icon__category} /> {props.category}</></div>


      </div>

      <div className={style.content__block2}>

      {/* DESCRIPTION */}
      <div className={style.content__description}>{props.description}</div>

      {/* ACCOUNT */}
      <div className={style.content__account}>{props.account}</div>

      </div>

      <div className={style.content__block3}>

      {/* AMOUNT */}
      <div className={style.content__amount}>
        <FaArrowDown className={style.icon} /> R$ {props.amount}
      </div>

      {/* TIMES */}
      <div className={style.content__times}>
        {props.times == "0" ? "" : props.times}
      </div>

      </div>

      <div className={style.content__block4}>

      {/* PAID */}
      <div className={style.content__paid}>
        {paid === true
          ? <FaCheckCircle onClick={paying} className={style.icon__paid} />
          : <FaTimesCircle onClick={paying} className={style.icon__notPaid} />}
      </div>

      {/* ACTIONS */}
      <div className={style.content__action}>
        <FaEdit className={style.icon__action} />
        <FaTrashAlt className={style.icon__action} />
      </div>

      </div>


    </div>
  );
}