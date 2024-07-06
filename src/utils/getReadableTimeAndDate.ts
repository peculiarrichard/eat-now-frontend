export const getReadableTimeAndDate = (date: Date | string) => {
  try {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const timeString = new Intl.DateTimeFormat("en-US", options).format(date);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${timeString}, ${day} ${month}, ${year}`;
  } catch (error) {
    console.error("Invalid date value:", date, error);
    return "Invalid date";
  }
};
