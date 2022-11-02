import style from "../../styles/Components.module.scss";
import accounts from "../../data/accounts.json";
import IAccount from "../../interfaces/account";
import classNames from "classnames";

export default function Accounts(props: any) {

  return (
    <div className={style.col100}>
      <label>Conta</label>
      {accounts.map((r: IAccount, index) => (
        <button key={index} className={classNames({
          [style.button]: true,
          [props.account === r.id ? style.selected : ""]: true,
        })} name={r.id} type="button" onClick={props.handleAccount}>
          {r.bank}
        </button>))
      }
      <span id="messageAccount" className={classNames({
        [style.message]: true,
        [style.hidden]: false,
      })}>Escolha uma conta.</span>
    </div>
  );
}