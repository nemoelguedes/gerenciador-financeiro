import style from "../../../styles/Components.module.scss";
import classNames from "classnames";

export default function Amount(props: any) {

  // VERIFY MONEY
  function verifyMoney(r: any) {
    const verify = r.replace(/[^\d]/g, "");
    const verifyA = parseFloat(verify).toString();

    if (verifyA.length === 0) {
      const verifyB = "000";
      addMoney(verifyB);
    }
    else if (verifyA.length === 1) {
      const verifyB = "00" + verifyA;
      addMoney(verifyB);
    }
    else if (verifyA.length === 2) {
      const verifyB = "0" + verifyA;
      addMoney(verifyB);
    }
    else {
      const verifyB = verifyA;
      addMoney(verifyB);
    }

    
  };

  // ADDING MONEY
  function addMoney(r: string) {
    const verifyC = r.slice(0, r.length - 2) + "," + r.slice(r.length - 2, r.length);
    props.handleAmount(verifyC);
  }


  return (

    <div className={style.col40}>
      <label className={style.labelAdd} htmlFor="amount">Valor:</label>
      <input className={style.inputAdd} type="text" name="amount" value={"R$ " + props.amount} onChange={r => verifyMoney(r.target.value)} />
      <span id="messageAmount" className={classNames({
        [style.message]: true,
        [style.hidden]: props.message === true && props.messageAmount === true ? false : true,
      })}>Adicione o valor da {props.transaction === "expense" ? "Despesa" : "Renda"}.</span>
    </div>
  );
}