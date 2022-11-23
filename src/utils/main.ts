export const pad = (n: number) => {
  return n < 10 ? '0' + n : n;
}

export const formatDateTime = (date: Date) => {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}h${pad(date.getMinutes())}`
}

export const formatDate = (date: Date) => { 
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`
}

export const formatDateFrom = (date: Date) => {  
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} 00:00:00`
}

export const formatDateTo = (date: Date) => {  
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} 23:59:59`
}

export const formatString = (text: string) => { return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() }

export function formatCurrency(amount: any, prefix = "R$", decimalCount = 2, decimal = ",", thousands = ".") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return(
      prefix +
      negativeSign +
      (j ? i.substring(0, j) + thousands : '') +
      i.substring(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : ""));
  } catch (e) {
    console.log(e)
  }
};