import style from "../../../styles/Components.module.scss";
import categories from "../../../data/categories.json";
import ICategory from "../../../interfaces/category";
import classNames from "classnames";

export default function Categories(props: any) {

  const category = props.transaction === "expense" ? categories.filter(r => r.transaction === "expense") : categories.filter(r => r.transaction === "incomes");

  return (
    <div className={style.col100}>
      <label  className={style.labelAdd} >Categoria</label>
      {category.map((r: ICategory, index:any) => (
        <button key={index} className={classNames({
          [style.button]: true,
          [props.category === r.category ? style.selected : ""]: true,
        })} name={r.category} type="button" onClick={props.handleCategory}>
          <img src={r.icon} className={style.icon} alt={r.category} />
          {r.category}
        </button>))
      }
      <span id="messageCategory" className={classNames({
        [style.message]: true,
        [style.hidden]: props.message === true && props.messageCategory === true ? false : true,
      })}>Escolha uma categoria.</span>
    </div>
  );
}