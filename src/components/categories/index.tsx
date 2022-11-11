import style from "./Categories.module.scss";
import { useState } from "react";
import { PieChart } from 'react-minimal-pie-chart';
import dataTransactions from "../../data/transactions.json";
import dataCategories from "../../data/categories.json";

export default function CategoriesDash(props: any) {

  const [updateTransactions, setUpdateTransactions] = useState(false);

  window.addEventListener('storage', () => {
    setUpdateTransactions(!updateTransactions);
  });

  if (!localStorage.transactions) {
    localStorage.transactions = JSON.stringify(dataTransactions);
  }

  if (!localStorage.categories) {
    localStorage.categories = JSON.stringify(dataCategories);
  }

  // FILTER EXPENSE CATEGORY
  const categories = JSON.parse(localStorage.getItem("categories") || '{}');
  const categoriesFilter = categories.filter((r: any) => r.transaction === "expense");

  // GET TRANSACTIONS, FILTER EXPENSES AND DATE
  const transactions = JSON.parse(localStorage.getItem("transactions") || '{}');
  const transactionsFiltered = transactions.filter(
    (r: any) => r.transaction === "expense").filter(
      (r: any) => props.initialDate <= r.date && props.finalDate >= r.date);

  // PAID TRANSACTIONS
  const paidTransactions = transactionsFiltered.filter((r: any) => r.paid === "true");
  const categoriesDataPaidCreate = categoriesFilter.map((e: any) => [{
    title: e.category,
    color: e.color,
    icon: e.icon,
    value: paidTransactions.filter((r: any) => r.category === e.category).map(
      (r: any) => parseFloat(r.amount.replace(",", "."))).reduce((r: number, m: number) => r + m, 0),
    price: "R$ " + paidTransactions.filter((r: any) => r.category === e.category).map(
      (r: any) => parseFloat(r.amount.replace(",", "."))).reduce((r: number, m: number) => r + m, 0).toFixed(2).toString().replace(".", ",")
  }]).flat();
  const categoriesPaid = categoriesDataPaidCreate.filter((r: any) => r.value !== 0);


  // NOT PAID TRANSACTIONS

  const categoriesDataNotPaidCreate = categoriesFilter.map((e: any) => [{
    title: e.category,
    color: e.color,
    icon: e.icon,
    value: transactionsFiltered.filter((r: any) => r.category === e.category).map(
      (r: any) => parseFloat(r.amount.replace(",", "."))).reduce((r: number, m: number) => r + m, 0),
    price: "R$ " + transactionsFiltered.filter((r: any) => r.category === e.category).map(
      (r: any) => parseFloat(r.amount.replace(",", "."))).reduce((r: number, m: number) => r + m, 0).toFixed(2).toString().replace(".", ",")
  }]).flat();
  const categoriesNotPaid = categoriesDataNotPaidCreate.filter((r: any) => r.value !== 0);

  return (

    <section className={style.section}>
      <div className={style.container}>

        <div className={style.pie}>
          <div className={style.title}>Despesas Efetuadas</div>

          <PieChart data={categoriesPaid} lineWidth={40} labelPosition={80} label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`} labelStyle={{ fontSize: "5px", fill: "#ffffff" }} animate  paddingAngle={1} />

          <div className={style.legend}>
            {categoriesPaid.map((r: any) => <div className={style.legend__category}><div className={style.legend__color} style={{ backgroundColor: `${r.color}` }}></div>{r.title} - {r.price}</div>)}
          </div>

        </div>

        <hr className={style.hr}></hr>

        <div className={style.pie}>

          <div className={style.title}>Previsão de despesas</div>

          <PieChart data={categoriesNotPaid} lineWidth={40} labelPosition={80} label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`} labelStyle={{ fontSize: "5px", fill: "#ffffff"}} animate paddingAngle={1}/>

          <div className={style.legend}>
            {categoriesNotPaid.map((r: any) => <div className={style.legend__category}><div className={style.legend__color} style={{ backgroundColor: `${r.color}` }}></div>{r.title} - {r.price}</div>)}
          </div>
        
        </div>

      </div>

    </section >

  );
}