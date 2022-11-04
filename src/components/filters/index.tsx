import style from "./Filters.module.scss";
import categories from "../../data/categories.json";
import accounts from "../../data/accounts.json";


export default function FiltersTransactions(props: any) {

  return (
    <>
      <div className={style.containerFilters}>

        <label className={style.label} htmlFor="initialDate">Data Inicial:</label>
        <input className={style.input} type="date" name="initialDate" value={props.initialDate} onChange={props.handleInitialDate} />

        <label className={style.label} htmlFor="finalDate">Data Final:</label>
        <input className={style.input} type="date" name="finalDate" min={props.initialDate} value={props.finalDate} onChange={props.handleFinalDate} />

      </div>
      <div className={style.containerFilters}>

        <label className={style.label} htmlFor="paid">PAGO:</label>
        <select className={style.input} name="paid" value={props.paid} onChange={props.handlePaid} >
          <option value={"todos"}>TODOS</option>
          <option disabled >---------</option>
          <option value={"true"}>PAGO</option>
          <option value={"false"}>ABERTO</option>
        </select>

        <label className={style.label} htmlFor="category">CATEGORIAS:</label>
        <select className={style.input} name="category" value={props.category} onChange={props.handleCategory} >
          <option value={"todas"}>TODAS</option>
          <option disabled >---------</option>
          {categories.filter((r: any) => r.transaction === "expense").map((r: any, index:any) => <option key={index} value={r.category}>{r.category}</option>)}
          <option disabled >---------</option>
          {categories.filter((r: any) => r.transaction === "incomes").map((r: any, index:any) => <option key={index} value={r.category}>{r.category}</option>)}
        </select>

        <label className={style.label} htmlFor="account">CONTAS:</label>
        <select className={style.input} name="account" value={props.account} onChange={props.handleAccount} >
          <option value={"todas"}>TODAS</option>
          <option disabled >---------</option>
          {accounts.map((r: any, index:any) => <option key={index} value={r.id}>{r.account}</option>)}
        </select>

        <label className={style.label} htmlFor="transaction">TIPO:</label>
        <select className={style.input} name="transaction" value={props.transaction} onChange={props.handleTransaction} >
          <option value={"todas"}>TODAS</option>
          <option disabled >---------</option>
          <option value={"expense"}>DESPESA</option>
          <option value={"incomes"}>RENDA</option>
        </select>



      </div>

    </>
  );
}