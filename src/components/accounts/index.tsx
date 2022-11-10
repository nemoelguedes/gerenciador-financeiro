import style from "./Accounts.module.scss";
import styleComponents from "../../styles/Components.module.scss";
import classNames from "classnames";
import { FaArrowUp, FaArrowDown, FaDollarSign, FaChartLine, FaDonate, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import dataTransactions from "../../data/transactions.json";


export default function AccountsShow(props: any) {

  const [updateTransactions, setUpdateTransactions] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(true);

  window.addEventListener('storage', () => {
    setUpdateTransactions(!updateTransactions);
  });

  if (!localStorage.transactions) {
    localStorage.transactions = JSON.stringify(dataTransactions);
  }

  const transactions = JSON.parse(localStorage.getItem("transactions") || '{}');

  const accountFiltered = transactions.filter((r: any) => r.account === props.id);


  // PREVIOUS BALANCE

  const previousIncomesFilter = accountFiltered.filter((r: any) => r.transaction === "incomes").filter(
    (r: any) => r.paid === "true").filter(
      (r: any) => "0001-01-01" < r.date && props.initialDate > r.date);
  const previousIncomesMap = previousIncomesFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const previousIncomesSum = previousIncomesMap.reduce((r: number, m: number) => r + m, 0);

  const previousExpenseFilter = accountFiltered.filter((r: any) => r.transaction === "expense").filter(
    (r: any) => r.paid === "true").filter(
      (r: any) => "0001-01-01" < r.date && props.initialDate > r.date);
  const previousExpenseMap = previousExpenseFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const previousExpenseSum = previousExpenseMap.reduce((r: number, m: number) => r + m, 0);

  const previousSum = previousIncomesSum - previousExpenseSum;
  const previousFixed = previousSum.toFixed(2);
  const previousShow = previousFixed.toString().replace(".", ",");

  // INCOMES

  const incomesFilter = accountFiltered.filter((r: any) => r.transaction === "incomes").filter(
    (r: any) => r.paid === "true").filter(
      (r: any) => props.initialDate <= r.date && props.finalDate >= r.date);
  const incomesMap = incomesFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const incomesSum = incomesMap.reduce((r: number, m: number) => r + m, 0);
  const incomesFixed = incomesSum.toFixed(2);
  const incomesShow = incomesFixed.toString().replace(".", ",");

  // EXPENSE

  const expenseFilter = accountFiltered.filter((r: any) => r.transaction === "expense").filter(
    (r: any) => r.paid === "true").filter(
      (r: any) => props.initialDate <= r.date && props.finalDate >= r.date);
  const expenseMap = expenseFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const expenseSum = expenseMap.reduce((r: number, m: number) => r + m, 0);
  const expenseFixed = expenseSum.toFixed(2);
  const expenseShow = expenseFixed.toString().replace(".", ",");

  // BALANCE

  const balanceSum = previousSum + incomesSum - expenseSum;
  const balanceFixed = balanceSum.toFixed(2);
  const balanceShow = balanceFixed.toString().replace(".", ",");


  // FORECAST

  const incomesForecastFilter = accountFiltered.filter((r: any) => r.transaction === "incomes").filter(
    (r: any) => props.initialDate <= r.date && props.finalDate >= r.date);
  const incomesForecastMap = incomesForecastFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const incomesForecastSum = incomesForecastMap.reduce((r: number, m: number) => r + m, 0);

  const expenseForecastFilter = accountFiltered.filter((r: any) => r.transaction === "expense").filter(
    (r: any) => props.initialDate <= r.date && props.finalDate >= r.date);
  const expenseForecastMap = expenseForecastFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const expenseForecastSum = expenseForecastMap.reduce((r: number, m: number) => r + m, 0);

  const forecastSum = incomesForecastSum - expenseForecastSum;
  const forecastFixed = forecastSum.toFixed(2);
  const forecastShow = forecastFixed.toString().replace(".", ",");

  function removeAccountFromLocalStorage (){

    const accountIsEmpty = transactions.filter((r: any) => r.account === props.id);

    console.log(accountIsEmpty);

    if (accountIsEmpty.length === 0) {
      const accounts = JSON.parse(localStorage.getItem("accounts") || '{}');
      const filtered = accounts.filter((r: any) => r.id !== props.id);
      localStorage.setItem("accounts", JSON.stringify(filtered));
      window.dispatchEvent(new Event("storage"));
    } else {
      setDeleteMessage(false);
    }
  }



  return (
    <div className={style.container}>
      <div className={style.title}>{props.account}<FaTrashAlt onClick={removeAccountFromLocalStorage} className={style.icon__action} />
      <span id="messageDescription" className={classNames({
      [styleComponents.message]: true,
      [styleComponents.hidden]: deleteMessage,
    })}>Ainda há transações ligadas a esta conta, para excluir vincule estas transações à outra conta.</span>
      </div>

      <div className={style.info}>

        <div className={classNames({
          [style.cards]: true,
          [style.forecast]: true,
        })}>
          <FaDonate className={style.icon} />
          <div className={style.data}>
            <div className={style.titleCard}>
              Saldo Anterior
            </div>
            <div className={style.value}>
              R$ {previousShow}
            </div>
          </div>
        </div>

        <div className={classNames({
          [style.cards]: true,
          [style.incomes]: true,
        })}>
          <FaArrowUp className={style.icon} />
          <div className={style.data}>
            <div className={style.titleCard}>
              Receitas
            </div>
            <div className={style.value}>
              R$ {incomesShow}
            </div>
          </div>
        </div>

        <div className={classNames({
          [style.cards]: true,
          [style.expense]: true,
        })}>
          <FaArrowDown className={style.icon} />
          <div className={style.data}>
            <div className={style.titleCard}>
              Despesas
            </div>
            <div className={style.value}>
              R$ {expenseShow}
            </div>
          </div>
        </div>

        <div className={classNames({
          [style.cards]: true,
          [style.balance]: true,
        })}>
          <FaDollarSign className={style.icon} />
          <div className={style.data}>
            <div className={style.titleCard}>
              Saldo Atual
            </div>
            <div className={style.value}>
              R$ {balanceShow}
            </div>
          </div>
        </div>

        <div className={classNames({
          [style.cards]: true,
          [style.forecast]: true,
        })}>
          <FaChartLine className={style.icon} />
          <div className={style.data}>
            <div className={style.titleCard}>
              Saldo Previsto
            </div>
            <div className={style.value}>
              R$ {forecastShow}
            </div>
          </div>
        </div>

      </div>
      <hr className={style.hr}></hr>
    </div>
  );
}