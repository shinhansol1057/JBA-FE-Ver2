export interface User {
  email: string;
  isSocial: boolean; 
  name: string;
  phoneNum: string;
  role: "마스터" | "일반" | string;
}