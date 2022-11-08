import Dashboard from "..";

export default function CalculateDash(props: any) {

  const transactions = JSON.parse(localStorage.getItem("transactions") || '{}');

  // PREVIOUS BALANCE

  const previousIncomesFilter = transactions.filter((r: any) => r.transaction === "incomes").filter(
    (r: any) => r.paid === "true").filter(
      (r: any) => "0001-01-01" < r.date && props.initialDate > r.date);
  const previousIncomesMap = previousIncomesFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const previousIncomesSum = previousIncomesMap.reduce((r: number, m: number) => r + m, 0);

  const previousExpenseFilter = transactions.filter((r: any) => r.transaction === "expense").filter(
    (r: any) => r.paid === "true").filter(
      (r: any) => "0001-01-01" < r.date && props.initialDate > r.date);
  const previousExpenseMap = previousExpenseFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const previousExpenseSum = previousExpenseMap.reduce((r: number, m: number) => r + m, 0);

  const previousSum = previousIncomesSum - previousExpenseSum;
  const previousFixed = previousSum.toFixed(2);
  const previousShow = previousFixed.toString().replace(".", ",");

  // INCOMES

  const incomesFilter = transactions.filter((r: any) => r.transaction === "incomes").filter(
    (r: any) => r.paid === "true").filter(
      (r: any) => props.initialDate <= r.date && props.finalDate >= r.date);
  const incomesMap = incomesFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const incomesSum = incomesMap.reduce((r: number, m: number) => r + m, 0);
  const incomesFixed = incomesSum.toFixed(2);
  const incomesShow = incomesFixed.toString().replace(".", ",");

  // EXPENSE

  const expenseFilter = transactions.filter((r: any) => r.transaction === "expense").filter(
    (r: any) => r.paid === "true").filter(
      (r: any) => props.initialDate <= r.date && props.finalDate >= r.date);
  const expenseMap = expenseFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const expenseSum = expenseMap.reduce((r: number, m: number) => r + m, 0);
  const expenseFixed = expenseSum.toFixed(2);
  const expenseShow = expenseFixed.toString().replace(".", ",");



  // BALANCE

  const balanceSum = previousSum + incomesSum - expenseSum;
  const balanceFixed = balanceSum.toFixed(2);
  const balanceShow = balanceFixed.toString().replace(".", ",");




  // FORECAST

  const incomesForecastFilter = transactions.filter((r: any) => r.transaction === "incomes").filter(
    (r: any) => props.initialDate <= r.date && props.finalDate >= r.date);
  const incomesForecastMap = incomesForecastFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const incomesForecastSum = incomesForecastMap.reduce((r: number, m: number) => r + m, 0);

  const expenseForecastFilter = transactions.filter((r: any) => r.transaction === "expense").filter(
    (r: any) => props.initialDate <= r.date && props.finalDate >= r.date);
  const expenseForecastMap = expenseForecastFilter.map((r: any) => parseFloat(r.amount.replace(",", ".")));
  const expenseForecastSum = expenseForecastMap.reduce((r: number, m: number) => r + m, 0);

  const forecastSum = previousSum + incomesForecastSum - expenseForecastSum;
  const forecastFixed = forecastSum.toFixed(2);
  const forecastShow = forecastFixed.toString().replace(".", ",");

  return (
    <Dashboard previous={previousShow} incomes={incomesShow} expense={expenseShow} sumResults={balanceShow} forecastResults={forecastShow} />
  );
}