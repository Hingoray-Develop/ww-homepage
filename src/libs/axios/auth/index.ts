import { SOCIAL_LOGIN_PROVIDER_TYPE } from "@/hooks/useLogin";
import restClient from "../restClient";
import { Tokens } from "@/libs/reactCookie";

const AUTH = "/auth";

export const socialLogin = async (data: {
  code: string;
  provider: SOCIAL_LOGIN_PROVIDER_TYPE;
  successCallback: (tokens: Tokens) => void;
}) => {
  const { code, provider, successCallback } = data;
  try {
    const response = await restClient.post(`${AUTH}/signin/${provider.toLowerCase()}`, { code });
    const { accessToken, refreshToken } = response.data;
    if (accessToken && refreshToken) {
      successCallback({ accessToken, refreshToken });
    }
  } catch (e) {
    console.error("Google Social Login Failed", e);
  }
};
