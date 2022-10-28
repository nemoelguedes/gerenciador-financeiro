import SingleExpense from "components/singleExpense";
import expenses from "../../data/expenses.json";
import style from "./Expenses.module.scss";

export default function Transactions() {

  return (
    <div>
      <table className={style.expenses}>
        {expenses.map(
          m => <SingleExpense date={m.date} description={m.description} amount={m.amount} category={m.category} account={m.account} paid={m.paid} id={m.id} times={m.times} />

        )}
      </table>
    </div >
  );
}