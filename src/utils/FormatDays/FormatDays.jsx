// utils/formatDays.js

function FormatDays(daysList) {
  if (daysList.length === 0) {
    return "No availability";
  }

  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dayIndices = daysList.map((day) => dayNames.indexOf(day));

  const ranges = [];
  let start = dayIndices[0];
  let end = dayIndices[0];

  for (let i = 1; i < dayIndices.length; i++) {
    if (dayIndices[i] === end + 1) {
      end = dayIndices[i];
    } else {
      ranges.push({ start, end });
      start = dayIndices[i];
      end = dayIndices[i];
    }
  }

  ranges.push({ start, end });

  return ranges
    .map((range) => {
      if (range.start === range.end) {
        return dayNames[range.start];
      } else {
        return `${dayNames[range.start]} - ${dayNames[range.end]}`;
      }
    })
    .join(" - ");
}

export default FormatDays;
