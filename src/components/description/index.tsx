import classNames from "classnames";
import style from "../../styles/Components.module.scss";

export default function Description(props:any){
  
  return(
    <div className={style.col100}>
    <label htmlFor="description">{props.transaction === "expense" ? "Descrição da Despesa" : "Descrição do Recebido"}</label>
    <input type="text" name="description" onBlur={props.handleDescription} />
    <span id="messageDescription" className={classNames({
      [style.message]: true,
      [style.hidden]: false,
    })}>Adicione uma curta descrição da {props.transaction === "expense" ? "Despesa" : "Renda"}.</span>
  </div>
  );
}