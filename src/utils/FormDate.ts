export const FormDate = (dateString: Date | string): string => {
  //예시 출력 : 2024.08.20(화)
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const day = date.getDate().toString().padStart(2, "0");

  // 요일 추출 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = weekdays[date.getDay()];

  return `${year}.${month}.${day}(${dayOfWeek})`;
};

export default function formatDate(date: Date) {
  // 예시 출력: 2024-05-01(수) 22:04
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}(${dayOfWeek}) ${hours}:${minutes}`;
}
