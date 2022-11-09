import { useReducer, useState } from "react";
import style from "./Dashboardinicial.module.scss";
import styleFilter from "../../components/filters/Filters.module.scss";
import { FaArrowDown, FaArrowUp, FaDollarSign } from "react-icons/fa";
import classNames from "classnames";
import SinglePlanning from "components/singlePlanning";
import styleDash from "../../components/singlePlanning/Singleplanning.module.scss";

const today = new Date();
const year = today.getFullYear();
const mo = today.getMonth() + 1;

const day = new Date(year, mo, 0).getDate();
const month = mo < 10 ? "0" + mo : mo;
const initialDate = year + "-" + month + "-01";
const finalDate = year + "-" + month + "-" + day;

const initialFilters = {
  initialDate: initialDate,
  finalDate: finalDate,
};


const filtersStates = (state: any, action: any) => {
  switch (action.type) {

    case "initialDate":
      return { ...state, initialDate: action.payload };

    case "finalDate":
      return { ...state, finalDate: action.payload };

    case "reset":
      return action.payload;

    default:
      throw new Error();

  }
}


export default function DashboardInicial() {

  const [state, dispatch] = useReducer(filtersStates, initialFilters);
  const [updateTransactions, setUpdateTransactions] = useState(false);

  window.addEventListener('storage', () => {
    setUpdateTransactions(!updateTransactions);
  });

  const transaction = JSON.parse(localStorage.getItem("transactions") || '{}');

  const transactionDateFilter = transaction.filter(
    (r: any) => state.initialDate <= r.date && state.finalDate >= r.date);

  // PREVIOUS BALANCE

  const previousIncomesFilter = transaction.filter((r: any) => r.transaction === "incomes").filter(
    (r: any) => r.paid === "true").filter(
      (r: any) => "0001-01-01" < r.date && state.initialDate > r.date);
  const previousIncomesMap = previousIncomesFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const previousIncomesSum = previousIncomesMap.reduce((r: number, m: number) => r + m, 0);

  const previousExpenseFilter = transaction.filter((r: any) => r.transaction === "expense").filter(
    (r: any) => r.paid === "true").filter(
      (r: any) => "0001-01-01" < r.date && state.initialDate > r.date);
  const previousExpenseMap = previousExpenseFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const previousExpenseSum = previousExpenseMap.reduce((r: number, m: number) => r + m, 0);

  const previousSum = previousIncomesSum - previousExpenseSum;
  const previousFixed = previousSum.toFixed(2);
  const previousShow = previousFixed.toString().replace(".", ",");

  // INCOMES

  const incomesPreFilter = transactionDateFilter.filter((r: any) => r.transaction === "incomes");
  const incomesPreMap = incomesPreFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const incomesPreSum = incomesPreMap.reduce((r: number, m: number) => r + m, 0);
  const incomesPreFixed = incomesPreSum.toFixed(2);
  const incomesPreShow = incomesPreFixed.toString().replace(".", ",");

  const incomesFilter = incomesPreFilter.filter((r: any) => r.paid === "true");
  const incomesMap = incomesFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const incomesSum = incomesMap.reduce((r: number, m: number) => r + m, 0);
  const incomesFixed = incomesSum.toFixed(2);
  const incomesShow = incomesFixed.toString().replace(".", ",");

  // EXPENSE

  const expensePreFilter = transactionDateFilter.filter((r: any) => r.transaction === "expense");
  const expensePreMap = expensePreFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const expensePreSum = expensePreMap.reduce((r: number, m: number) => r + m, 0);
  const expensePreFixed = expensePreSum.toFixed(2);
  const expensePreShow = expensePreFixed.toString().replace(".", ",");

  const expenseFilter = expensePreFilter.filter((r: any) => r.paid === "true");
  const expenseMap = expenseFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const expenseSum = expenseMap.reduce((r: number, m: number) => r + m, 0);
  const expenseFixed = expenseSum.toFixed(2);
  const expenseShow = expenseFixed.toString().replace(".", ",");

  // BALANCE

  const resultsSum = previousSum + incomesSum - expenseSum;
  const resultsFixed = resultsSum.toFixed(2);
  const resultsShow = resultsFixed.toString().replace(".", ",");

  // FORECAST

  const incomesForecastFilter = transactionDateFilter.filter((r: any) => r.transaction === "incomes");
  const incomesForecastMap = incomesForecastFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const incomesForecastSum = incomesForecastMap.reduce((r: number, m: number) => r + m, 0);

  const expenseForecastFilter = transactionDateFilter.filter((r: any) => r.transaction === "expense");
  const expenseForecastMap = expenseForecastFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const expenseForecastSum = expenseForecastMap.reduce((r: number, m: number) => r + m, 0);

  const forecastSum = previousSum + incomesForecastSum - expenseForecastSum;
  const forecastFixed = forecastSum.toFixed(2);
  const forecastShow = forecastFixed.toString().replace(".", ",");

  const categories = JSON.parse(localStorage.getItem("categories") || '{}');

  const categoriesFilter = categories.filter(
    (r: any) => r.transaction === "expense");

  return (
    <>
      <section className={style.section}>

        <div className={style.actionsOnTransactions}>
          <div className={styleFilter.containerFilters__date}>
            <div className={styleFilter.filter__data}>
              <input className={styleFilter.input__data} type="date" name="initialDate" value={state.initialDate} onChange={(e: any) => dispatch({ type: "initialDate", payload: e.target.value })} />
            </div>
            <div className={styleFilter.filter__data}>
              <input className={styleFilter.input__data} type="date" name="finalDate" min={state.initialDate} value={state.finalDate} onChange={(e: any) => dispatch({ type: "finalDate", payload: e.target.value })} />
            </div>
          </div>
        </div>
      </section>

      <section className={style.section}>

        <div className={classNames({
          [style.container]: true,
          [style.incomes]: true,
        })}>
          <FaArrowUp className={style.icon} />
          <div className={style.data}>
            <div className={style.title}>
              Receitas
            </div>
            <div className={style.value}>
              R$ {incomesShow}
            </div>
            <hr className={style.hr}></hr>

            <div className={style.title__forecast}>
              Previsto
            </div>
            <div className={style.value__forecast}>
              R$ {incomesPreShow}
            </div>
          </div>

        </div>

        <div className={classNames({
          [style.container]: true,
          [style.expenses]: true,
        })}>
          <FaArrowDown className={style.icon} />
          <div className={style.data}>
            <div className={style.title}>
              Despesas
            </div>
            <div className={style.value}>
              R$ {expenseShow}
            </div>
            <hr className={style.hr}></hr>

            <div className={style.title__forecast}>
              Previsto
            </div>
            <div className={style.value__forecast}>
              R$ {expensePreShow}
            </div>
          </div>

        </div>

        <div className={classNames({
          [style.container]: true,
          [style.balance]: true,
        })}>
          <FaDollarSign className={style.icon} />
          <div className={style.data}>
            <div className={style.title__forecast}>
              Saldo Anterior
            </div>
            <div className={style.value__forecast}>
              R$ {previousShow}
            </div>
            <hr className={style.hr}></hr>
            <div className={style.title}>
              Saldo Atual
            </div>
            <div className={style.value}>
              R$ {resultsShow}
            </div>
            <hr className={style.hr}></hr>
            <div className={style.title__forecast}>
              Saldo Previsto
            </div>
            <div className={style.value__forecast}>
              R$ {forecastShow}
            </div>
          </div>

        </div>


      </section>
      <section className={style.section__categories}>

        <div className={styleDash.container}>
          <div className={styleDash.img}>
          </div>
          <div className={styleDash.category}>
            CATEGORIA
          </div>

          <div className={styleDash.graphic}>
            <div className={styleDash.legend}>% REALIZADOS</div>
          </div>

          <div className={styleDash.graphic}>
            <div className={styleDash.legend}>% PREVISTO</div>
          </div>


        </div>
        <hr className={styleDash.hr}></hr>

        {categoriesFilter.map((r: any, index: any) => <SinglePlanning key={index} icon={r.icon} color={r.color} category={r.category} balance={expenseSum} forecast={expensePreSum} initialDate={state.initialDate} finalDate={state.finalDate} />)}



      </section>
    </>
  );
}