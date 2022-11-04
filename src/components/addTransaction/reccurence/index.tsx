import style from "../../../styles/Components.module.scss";
import reccurence from "../../../data/reccurence.json";
import IReccurence from "../../../interfaces/reccurence";
import classNames from "classnames";

export default function Reccurence(props: any) {

  function recc(e:any){
    props.handleReccurence(e);
    const name = e.target.name;
    if (name === "não") {
      reccValue("1");
    }
  }

  function reccValue(e:any){
    if(e === "0"){
      props.handleReccurenceValue("1");
    } else {
    props.handleReccurenceValue(e);
    }
  }



  return (
    <>
      <div className={style.col100}>
        <label  className={style.labelAdd}  htmlFor="reccurence">Recorrência</label>
        {reccurence.map((r: IReccurence, index) => (
          <button key={index} className={classNames({
            [style.button]: true,
            [props.reccurence === r.reccurence ? style.selected : ""]: true,
          })} type="button" name={r.reccurence} onClick={recc}>
            <img src={r.icon} className={style.icon} alt={r.reccurence} />
            {r.reccurence}
          </button>))
        }
      </div>

      {props.reccurence === "parcelado" ?
        <div className={style.col100}>
          <label className={style.labelAdd}  htmlFor="reccurence">Em quantas vezes:</label>
          <input  className={style.inputAdd} min="1" max="72"  type="number" name="reccurence" onChange={e => reccValue(e.target.value)} value={props.reccurenceValue} />
          <span id="messageParcelas" className={classNames({
            [style.message]: true,
            [style.hidden]: props.message === true && props.messageReccurenceValue === true ? false : true,
          })}>Digite a quantidade de parcelas</span>
        </div>
        : ""}
    </>
  );
}