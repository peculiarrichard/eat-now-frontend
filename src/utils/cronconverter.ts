export const stringToCron = (schedule: string): string => {
  const scheduleParts = schedule
    .toLowerCase()
    .split(",")
    .map((part) => part.trim());

  const cronParts = scheduleParts.map((part) => {
    let cron: string;
    if (part.startsWith("weekdays at")) {
      const time = part.replace("weekdays at", "").trim();
      const [hours, minutes] = parseTime(time);
      cron = `${minutes} ${hours} * * 1-5`;
    } else if (part.startsWith("weekends at")) {
      const time = part.replace("weekends at", "").trim();
      const [hours, minutes] = parseTime(time);
      cron = `${minutes} ${hours} * * 6,0`;
    } else if (part.startsWith("everyday at")) {
      const time = part.replace("everyday at", "").trim();
      const [hours, minutes] = parseTime(time);
      cron = `${minutes} ${hours} * * *`;
    } else {
      throw new Error(`Unsupported schedule format: ${part}`);
    }
    return cron;
  });

  return cronParts.join("; ");
};

function parseTime(time: string): [number, number] {
  const [timePart, period] = time.split(":").map((part) => part.trim());
  let [hours, minutes] = [parseInt(timePart), 0];

  if (period === "am" && hours === 12) {
    hours = 0;
  } else if (period === "pm" && hours !== 12) {
    hours += 12;
  }

  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error(`Invalid time format: ${time}`);
  }

  return [hours, minutes];
}
