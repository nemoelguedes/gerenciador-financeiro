import style from "./Dashboard.module.scss";
import { FaArrowDown, FaArrowUp, FaDollarSign, FaChartLine, FaDonate } from "react-icons/fa";
import classNames from "classnames";

export default function Dashboard(props:any){
  return(

    <section className={style.section}>
      <div className={classNames({
        [style.container] : true,
        [style.previous] : true,
      })}>
        <FaDonate className={style.icon} />
        <div className={style.data}>
        <div className={style.title}>
          Saldo Anterior
        </div>
        <div className={style.value}>
          R$ {props.previous}
        </div>
        </div>
          
      </div>


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
          R$ {props.expense}
        </div>
        </div>
          
      </div>

      <div className={classNames({
        [style.container] : true,
        [style.balance] : true,
      })}>
        <FaDollarSign className={style.icon} />
        <div className={style.data}>
        <div className={style.title}>
          Saldo Atual
        </div>
        <div className={style.value}>
          R$ {props.sumResults}
        </div>
        </div>
          
      </div>

      <div className={classNames({
        [style.container] : true,
        [style.forecast] : true,
      })}>
        <FaChartLine className={style.icon} />
        <div className={style.data}>
        <div className={style.title}>
          Saldo Previsto
        </div>
        <div className={style.value}>
          R$ {props.forecastResults}
        </div>
        </div>
          
      </div>
      </section>
  );
}