// utils/date.ts
export function getDay(tanggal: string | Date): string {
  const dateObj = typeof tanggal === "string" ? new Date(tanggal) : tanggal;
  const formatter = new Intl.DateTimeFormat("id-ID", { weekday: "long" });
  return formatter.format(dateObj);
}

export function getDate(tanggal: string | Date): string {
  const dateObj = typeof tanggal === "string" ? new Date(tanggal) : tanggal;
  const formatter = new Intl.DateTimeFormat("id-ID");
  return formatter.format(dateObj);
}
