import { SingleUserResponse } from "./UserType";

export type LoginResponse = {
  code: 1000;
  result: {
    token: string
    authenticated: boolean
    userData: SingleUserResponse
  };
};
