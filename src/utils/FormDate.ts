export const FormDate = (dateString: Date | string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const day = date.getDate().toString().padStart(2, "0");

  // 요일 추출 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = weekdays[date.getDay()];

  // 원하는 형식으로 조합
  return `${year}.${month}.${day}(${dayOfWeek})`;
};
