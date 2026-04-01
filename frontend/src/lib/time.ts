const formatSingleTime = (value: string) => {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return value;

  const hours24 = Number(match[1]);
  const minutes = match[2];
  if (Number.isNaN(hours24) || hours24 < 0 || hours24 > 23) return value;

  const meridiem = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${minutes} ${meridiem}`;
};

export const formatTimeToAmPm = (value: string) => {
  if (!value) return "";
  const parts = value
    .split("-")
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length <= 1) return formatSingleTime(value);
  return parts.map(formatSingleTime).join(" - ");
};
