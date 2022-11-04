import style from "../../../styles/Components.module.scss";
import accounts from "../../../data/accounts.json";
import IAccount from "../../../interfaces/account";
import classNames from "classnames";

export default function Accounts(props: any) {

  return (
    <div className={style.col100}>
      <label className={style.labelAdd} >Conta</label>
      {accounts.map((r: IAccount, index) => (
        <button key={index} className={classNames({
          [style.button]: true,
          [props.account === r.id ? style.selected : ""]: true,
        })} name={r.id} type="button" onClick={props.handleAccount}>
          {r.account}
        </button>))
      }
      <span id="messageAccount" className={classNames({
        [style.message]: true,
        [style.hidden]: props.message === true && props.messageAccount === true ? false : true,
      })}>Escolha uma conta.</span>
    </div>
  );
}