import style from "./Backup.module.scss";
import { FaRegSave, FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";

const today = new Date();
const year = today.getFullYear();
const mo = today.getMonth() + 1;
const da = today.getDate();
const month = mo < 10 ? "0" + mo : mo;
const day = da < 10 ? "0" + da : da;
const initialDate = year + "-" + month + "-" + day;

export default function BackupData() {

  const [transactions, setTransactions] = useState();
  const [accounts, setAccounts] = useState();
  const [categories, setCategories] = useState();

  const [message, setMessage] = useState(false);
  const [readyToUpload, setReadyToUpload] = useState(false);
  const [success, setSuccess] = useState(false);


  console.log(transactions, accounts, categories);

  const filesToBackup = [];

  filesToBackup.push({ transactions: [JSON.parse(localStorage.transactions)] });
  filesToBackup.push({ accounts: [JSON.parse(localStorage.accounts)] });
  filesToBackup.push({ categories: [JSON.parse(localStorage.categories)] });
  filesToBackup.push({ backup: "backup__from__finans" });

  const fileToDownload = filesToBackup;

  const exportToJson = (e: any) => {
    e.preventDefault()
    const data = JSON.stringify(fileToDownload);
    const fileName = `backup_finans_${initialDate}.json`;
    const fileType = "text/json";

    downloadFile(data, fileName, fileType);
  }


  function downloadFile(data: any, fileName: any, fileType: any) {

    const blob = new Blob([data], { type: fileType })
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

  const handleChange = (e: any) => {
    const fileReader = new FileReader();
    const { files } = e.target;

    fileReader.readAsText(files[0], "UTF-8");

    fileReader.onload = (r: any) => {
      const content = JSON.parse(r.target.result);

      if (content.length === 4 && content[3].backup === "backup__from__finans") {

        setTransactions(content[0].transactions.flat());
        setAccounts(content[1].accounts.flat());
        setCategories(content[2].categories.flat());
        setReadyToUpload(true);
        setMessage(false);
      } else {
        setMessage(true);

      }
    };
  };


  function makeImport() {

    if (readyToUpload === true) {
      localStorage.categories = JSON.stringify(categories);
      localStorage.accounts = JSON.stringify(accounts);
      localStorage.transactions = JSON.stringify(transactions);
      setSuccess(true);
    } else {
      setMessage(true);
    }
  }


  return (
    <>
      <section className={style.section}>
        <div className={style.container}>
          <div className={style.title}>
            Backup das Informações
          </div>
          <div className={style.info}>
            <b>Porque é necessário fazer backup?</b><br /><br />
            Este webApp salva as informações no LocalStorage (que são os famosos Cookies do seu celular ou computador) podendo ser acessados apenas por você.<br /><br />
            Se em algum momento você trocar de dispositivo ou limpar os cookies do seu navegador, suas informações serão perdidas.<br /><br />
            Por isso é importante fazer o backup de suas informações regularmente.
          </div>
          <div className={style.buttons}>
            <button type="button" className={style.backup} onClick={exportToJson}>
              <FaRegSave className={style.icon} /> Backup
            </button>

          </div>
          <div className={style.buttons}>

            <input type="file" onChange={handleChange} />

            {message === true
              ? <div className={style.message}>
                INSIRA UM ARQUIVO DE BACKUP DO FINAN$.
              </div> : ""}

          </div>
          <div className={style.buttons}>


            <button type="button" className={style.import} onClick={makeImport}>
              <FaCloudUploadAlt className={style.icon} />Importar
            </button>
            {success === true
              ? <div className={style.message__green}>
                IMPORTADO COM SUCESSO!
              </div> : ""}
          </div></div>
      </section>
    </>
  );
}