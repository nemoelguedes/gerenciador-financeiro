import style from "./Filters.module.scss";
import categories from "../../data/categories.json";
import accounts from "../../data/accounts.json";


export default function FiltersTransactions(props: any) {

  return (
    <>
      <div className={style.containerFilters}>


      <div className={style.filter}>
        <select className={style.input} name="paid" value={props.paid} onChange={props.handlePaid} >
          <option value={"todos"}>TODOS OS STATUS:</option>
          <option disabled >---------</option>
          <option value={"true"}>PAGO</option>
          <option value={"false"}>ABERTO</option>
        </select>
        </div>
        
        <div className={style.filter}>
        <select className={style.input} name="category" value={props.category} onChange={props.handleCategory} >
          <option value={"todas"}>TODAS AS CATEGORIAS:</option>
          <option disabled >---------</option>
          {categories.filter((r: any) => r.transaction === "expense").map((r: any, index: any) => <option key={index} value={r.category}>{r.category}</option>)}
          <option disabled >---------</option>
          {categories.filter((r: any) => r.transaction === "incomes").map((r: any, index: any) => <option key={index} value={r.category}>{r.category}</option>)}
        </select>
        </div>
        
        <div className={style.filter}>
        <select className={style.input} name="account" value={props.account} onChange={props.handleAccount} >
          <option value={"todas"}>TODAS AS CONTAS:</option>
          <option disabled >---------</option>
          {accounts.map((r: any, index: any) => <option key={index} value={r.id}>{r.account}</option>)}
        </select>
        </div>
        
        <div className={style.filter}>
        <select className={style.input} name="transaction" value={props.transaction} onChange={props.handleTransaction} >
          <option value={"todas"}>TODOS OS TIPOS:</option>
          <option disabled >---------</option>
          <option value={"expense"}>DESPESA</option>
          <option value={"incomes"}>RENDA</option>
        </select>
        </div>



      </div>

    </>
  );
}