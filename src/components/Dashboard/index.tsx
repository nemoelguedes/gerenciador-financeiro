import style from "./Dashboard.module.scss";
import { FaArrowDown, FaArrowUp, FaDollarSign } from "react-icons/fa";
import classNames from "classnames";

export default function Dashboard(props:any){
  return(

    <section className={style.section}>
      <div className={classNames({
        [style.container] : true,
        [style.incomes] : true,
      })}>
        <FaArrowUp className={style.icon} />
        <div className={style.data}>
        <div className={style.title}>
          Receitas
        </div>
        <div className={style.value}>
          R$ {props.incomes}
        </div>
        </div>
          
      </div>

      <div className={classNames({
        [style.container] : true,
        [style.expenses] : true,
      })}>
        <FaArrowDown className={style.icon} />
        <div className={style.data}>
        <div className={style.title}>
          Despesas
        </div>
        <div className={style.value}>
          R$ {props.expenses}
        </div>
        </div>
          
      </div>

      <div className={classNames({
        [style.container] : true,
        [style.sum] : true,
      })}>
        <FaDollarSign className={style.icon} />
        <div className={style.data}>
        <div className={style.title}>
          Saldo
        </div>
        <div className={style.value}>
          R$ {props.sumResults}
        </div>
        </div>
          
      </div>
      </section>
  );
}