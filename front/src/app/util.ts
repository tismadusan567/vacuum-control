// 2024-02-15T05:15 -> 02.15.2024 05:15:00
export function formatStartTime(startTime?: string): string | undefined {
  if (!startTime) return undefined;
  let splitByT = startTime.split("T");
  let date = splitByT[0].split("-");
  let time = splitByT[1].split(":");

  return [date[1], date[2], date[0]].join(".") + " " + [time[0], time[1], "00"].join(":");
}

// 2024-02-15 -> 02.15.2024
export function formatDate(date?: string): string | undefined {
    if (date == undefined) return undefined;
    let split = date.split("-");
    return [split[1], split[2], split[0]].join(".");
  }