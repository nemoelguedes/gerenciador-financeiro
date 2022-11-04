import style from "../../../styles/Components.module.scss";

export default function DateAdd(props: any){
  return(
    <div className={style.col40}>
    <label className={style.labelAdd} htmlFor="date">{props.label}</label>
    <input className={style.inputAdd} type="date" name="date" value={props.date} onChange={props.handleDate} />
  </div>
  );
}