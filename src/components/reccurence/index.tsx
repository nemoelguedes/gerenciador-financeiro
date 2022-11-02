import style from "../../styles/Components.module.scss";
import reccurence from "../../data/reccurence.json";
import IReccurence from "../../interfaces/reccurence";
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
    props.handleReccurenceValue(e);
  }



  return (
    <>
      <div className={style.col100}>
        <label htmlFor="reccurence">Recorrência</label>
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
        <div className={style.col40}>
          <label htmlFor="reccurence">Em quantas vezes:</label>
          <input type="number" name="reccurence" onChange={e => reccValue(e.target.value)} />
          <span id="messageParcelas" className={classNames({
            [style.message]: true,
            [style.hidden]: false,
          })}>Digite a quantidade de parcelas</span>
        </div>
        : ""}</>
  );
}