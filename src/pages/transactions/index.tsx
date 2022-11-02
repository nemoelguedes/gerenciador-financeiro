import SingleTransaction from "components/singleTransaction";
import expenses from "../../data/expenses.json";
import style from "./Transaction.module.scss";

export default function Transactions() {

  return (
    <div>
      <table className={style.expenses}>
        {expenses.map(
          m => <SingleTransaction date={m.date} description={m.description} amount={m.amount} category={m.category} account={m.account} paid={m.paid} id={m.id} reccurence={m.reccurence} transaction={m.transaction} />

        )}
      </table>
    </div >
  );
}