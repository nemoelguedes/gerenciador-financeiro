import style from "../../../styles/Components.module.scss";
import IAccount from "../../../interfaces/account";
import classNames from "classnames";
import { useState } from "react";

export default function Accounts(props: any) {

  const [updateTransactions, setUpdateTransactions] = useState(false);

  window.addEventListener('storage', () => {
    setUpdateTransactions(!updateTransactions);
  });

  const accounts = JSON.parse(localStorage.getItem("accounts") || '{}');

  return (
    <div className={style.col100}>
      <label className={style.labelAdd} >Conta</label>
      {accounts.map((r: IAccount, index:any) => (
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