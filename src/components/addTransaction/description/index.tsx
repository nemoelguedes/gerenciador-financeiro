import classNames from "classnames";
import style from "../../../styles/Components.module.scss";

export default function Description(props:any){

  
  return(
    <div className={style.col100}>
    <label className={style.labelAdd} htmlFor="description">{props.transaction === "expense" ? "Descrição da Despesa" : "Descrição do Recebido"}</label>
    <input className={style.inputAdd} type="text" name="description" value={props.description} onChange={props.handleDescription} />
    <span id="messageDescription" className={classNames({
      [style.message]: true,
      [style.hidden]: props.message === true && props.messageDescription === true ? false : true,
    })}>Adicione uma curta descrição da {props.transaction === "expense" ? "Despesa" : "Renda"}.</span>
  </div>
  );
}