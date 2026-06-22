const MONTERREY_TZ = "America/Monterrey";
const MONTERREY_OFFSET = "-06:00";

export function monterreyInputToDate(localValue: string): Date {
  return new Date(`${localValue}${MONTERREY_OFFSET}`);
}

export function dateToMonterreyInput(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: MONTERREY_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

export function formatMonterrey(date: Date): string {
  return new Intl.DateTimeFormat("es-MX", {
    timeZone: MONTERREY_TZ,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
