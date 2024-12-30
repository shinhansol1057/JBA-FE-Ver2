type SearchUserData = {
  userId: number;
  name: string;
  team: string | null;
  permission: string;
  email: string;
  phoneNum: string;
  dateOfBirth: string | null;
  gender: string | null;
  userStatus: string;
  loginAt: string | null;
  createAt: string;
  updateAt: string | null;
  deleteAt: string | null;
  lockAt: string | null;
  failureCount: number;
};

type signUpData = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoneNum: string;
};

export type { SearchUserData, signUpData };
