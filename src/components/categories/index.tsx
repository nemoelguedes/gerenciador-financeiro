import style from "../../styles/Components.module.scss";
import categoryExpense from "../../data/categories__expenses.json";
import categoryIncomes from "../../data/categories__incomes.json";
import ICategory from "../../interfaces/category";
import classNames from "classnames";

export default function Categories(props: any) {

  const category = props.transaction === "expense" ? categoryExpense : categoryIncomes;

  return (
    <div className={style.col100}>
      <label>Categoria</label>
      {category.map((r: ICategory, index) => (
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
        [style.hidden]: false,
      })}>Escolha uma categoria.</span>
    </div>
  );
}