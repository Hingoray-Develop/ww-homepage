import { Cookies } from "react-cookie";

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

const cookies = new Cookies();

export const getTokens = () => {
  return cookies.get("TOKENS") as Tokens | undefined;
};

export const setTokens = (tokens: Tokens) => {
  cookies.set("TOKENS", tokens, { path: "/", maxAge: 86400 * 7 });
};

export const removeTokens = () => {
  cookies.remove("TOKENS");
};
