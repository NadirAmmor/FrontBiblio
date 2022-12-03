import { User } from "./User";

export interface TokenLogOut {
  User: User;
  accessToken: string;
  refreshToken: string;
}
