import style from "../../styles/Components.module.scss";
import internalStyle from "./Paid.module.scss";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";

export default function Paid(props : any){
  return(
    <div className={style.col10}>
    <label htmlFor="paid">{props.transaction === "expense" ? "Está Pago?" : "Recebido?"}</label>
    <div>
      {props.paid === true
        ? <FaCheckCircle onClick={props.handlePaid} className={internalStyle.icon__paid} />
        : <FaTimesCircle onClick={props.handlePaid} className={internalStyle.icon__notPaid} />}
    </div>
  </div>
  )
}