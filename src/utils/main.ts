export const pad = (n: number) => {
  return n < 10 ? '0' + n : n;
}

export const formatDateTime = (date: Date) => {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}h${pad(date.getMinutes())}`
}

export const formatDate = (date: Date) => { 
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`
}

export const formatDateToFetch = (date: Date) => {
  //2022-11-14 14:15:55
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} 23:59:59`
}

export const formatString = (text: string) => { return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() }