import kr from "antd/es/date-picker/locale/ko_KR";

export const koreanLocale: typeof kr = {
  ...kr,
  lang: {
    ...kr.lang,
    fieldDateFormat: "YYYY-MM-DD",
    fieldDateTimeFormat: "YYYY-MM-DD HH:mm:ss",
    yearFormat: "YYYY",
    monthFormat: "MM",
  },
};
