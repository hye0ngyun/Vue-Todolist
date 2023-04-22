export const n = (number: number) => {
  return Intl.NumberFormat().format(number);
};
export const d = (date: string | Date) => {
  const tempDate = new Date(date);
  return Intl.DateTimeFormat("ko-kr", {
    month: "2-digit",
    day: "2-digit",
    // year: "numeric",
  }).format(tempDate);
};
export const t = (date: string) => {
  const tempDate: Date = new Date(date);
  return Intl.DateTimeFormat("ko-kr", {
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    hour12: false,
    hourCycle: "h24",
  }).format(tempDate);
};

const format = {
  n,
  d,
  t,
};
export default format;
