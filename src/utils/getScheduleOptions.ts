export const getScheduleOptions = (category: string) => {
  let options = [];

  if (category === "breakfast") {
    for (let i = 7; i <= 10; i++) {
      options.push(
        `everyday at ${i}:am`,
        `weekdays at ${i}:am`,
        `weekends at ${i}:am`
      );
    }
  } else if (category === "lunch") {
    for (let i = 1; i <= 3; i++) {
      options.push(
        `everyday at ${i}:pm`,
        `weekdays at ${i}:pm`,
        `weekends at ${i}:pm`
      );
    }
  } else if (category === "dinner") {
    for (let i = 6; i <= 9; i++) {
      options.push(
        `everyday at ${i}:pm`,
        `weekdays at ${i}:pm`,
        `weekends at ${i}:pm`
      );
    }
  }

  return options;
};
