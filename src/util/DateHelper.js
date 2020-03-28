
export function formatTime(unixDateTimeStamp) {
  const formatedDate = new Date(unixDateTimeStamp*1000);
  const time = `${formatedDate.getHours()}`.length === 1 ? `0${formatedDate.getHours()}` : `${formatedDate.getHours()}`;
  return time;
}

export function getDayFromDateString(unixDateTimeStamp) {
  const date = new Date(unixDateTimeStamp*1000);
  const dayOfWeek = date.getDay();
  if (dayOfWeek === (new Date().getDay())) {
    return 'Today';
  }
  switch (dayOfWeek) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return '';
  }
}
