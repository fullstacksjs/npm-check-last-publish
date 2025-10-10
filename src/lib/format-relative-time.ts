export function formatRelativeTime(date: Date) {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const now = Temporal.Now.zonedDateTimeISO("UTC");
  const then = date.toTemporalInstant().toZonedDateTimeISO("UTC");

  const diff = then.since(now, { largestUnit: "years" });

  if (Math.abs(diff.years) >= 1) return rtf.format(diff.years, "year");
  if (Math.abs(diff.months) >= 1) return rtf.format(diff.months, "month");
  if (Math.abs(diff.days) >= 1) return rtf.format(diff.days, "day");
  if (Math.abs(diff.hours) >= 1) return rtf.format(diff.hours, "hour");
  if (Math.abs(diff.minutes) >= 1) return rtf.format(diff.minutes, "minute");
  return rtf.format(diff.seconds, "second");
}
