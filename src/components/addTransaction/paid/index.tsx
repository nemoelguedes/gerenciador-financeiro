import style from "../../../styles/Components.module.scss";
import internalStyle from "./Paid.module.scss";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";

export default function Paid(props : any){

  function paid(){
    props.handlePaid(!props.paid);
  }
  return(
    <div className={style.col10}>
    <label className={style.labelAdd} htmlFor="paid">{props.transaction === "expense" ? "Pago:" : "Recebido:"}</label>
    <div>
      {props.paid === true
        ? <FaCheckCircle onClick={paid} className={internalStyle.icon__paid} />
        : <FaTimesCircle onClick={paid} className={internalStyle.icon__notPaid} />}
    </div>
  </div>
  )
}