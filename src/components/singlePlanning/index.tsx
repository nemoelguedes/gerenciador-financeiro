import { useState } from "react";
import style from "./Singleplanning.module.scss";
import dataTransactions from "../../data/transactions.json";

export default function SinglePlanning(props: any) {

  const [updateTransactions, setUpdateTransactions] = useState(false);


  window.addEventListener('storage', () => {
    setUpdateTransactions(!updateTransactions);
  });

  if (!localStorage.transactions) {
    localStorage.transactions = JSON.stringify(dataTransactions);
  }

  const transactions = JSON.parse(localStorage.getItem("transactions") || '{}');

  const categoryFiltered = transactions.filter((r: any) => r.category === props.category).filter((r: any) => r.transaction === "expense");

  const categoryFilter = categoryFiltered.filter((r: any) => r.paid === "true").filter(
    (r: any) => props.initialDate <= r.date && props.finalDate >= r.date);
  const categoryMap = categoryFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const categorySum = categoryMap.reduce((r: number, m: number) => r + m, 0);

  const categoryPercentage = categorySum !== 0 ? (categorySum / props.balance) * 100 : 0;
  const categoryFinal = categorySum !== 0 ? categoryPercentage.toFixed(0) : 0;

  const categoryFixed = categorySum.toFixed(2);
  const categoryShow = categoryFixed.toString().replace(".", ",");

  const categoryForecastFilter = categoryFiltered.filter(
    (r: any) => props.initialDate <= r.date && props.finalDate >= r.date);
  const categoryForecastMap = categoryForecastFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const categoryForecastSum = categoryForecastMap.reduce((r: number, m: number) => r + m, 0);

  const categoryForecastPercentage = categoryForecastSum !== 0 ? (categoryForecastSum / props.forecast) * 100 : 0;
  const categoryForecastFinal = categoryForecastSum !== 0 ? categoryForecastPercentage.toFixed(0) : 0;

  const categoryForecastFixed = categoryForecastSum.toFixed(2);
  const categoryForecastShow = categoryForecastFixed.toString().replace(".", ",");

  return (
    <> 
    {categoryFiltered.length === 0 ? "" : <>
     
    <div className={style.container}>
      <div className={style.category}>
      <img className={style.icon} src={props.icon} alt={props.category} /> {props.category}
      </div>

      <div className={style.graphic}>
        <div className={style.bar} style={{borderColor: `${props.color}`}}>
          <div className={style.percentage} style={{width: `${categoryFinal}%`, backgroundColor: `${props.color}`}}></div>
        </div>
        <div className={style.legend}>{"R$ " + categoryShow + " - " + categoryFinal + "%"}</div>

      </div>

      <div className={style.graphic}>
        <div className={style.bar}>
          <div className={style.percentage__forecast} style={{width: `${categoryForecastFinal}%`}}></div>
        </div>
        <div className={style.legend}>{"R$ " + categoryForecastShow + " - " + categoryForecastFinal + "%"}</div>
      </div>


    </div>
    <hr className={style.hr}></hr>
    </>}
    </>
  );
}