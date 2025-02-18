// import { getTokens, removeTokens, useAppSelector } from "@/libs";
// import { useEffect, useState } from "react";

// export const SOCIAL_LOGIN_PROVIDER = {
//   APPLE: "APPLE",
//   GOOGLE: "GOOGLE",
//   NAVER: "NAVER",
//   KAKAO: "KAKAO",
// } as const;

// export type SOCIAL_LOGIN_PROVIDER_TYPE =
//   (typeof SOCIAL_LOGIN_PROVIDER)[keyof typeof SOCIAL_LOGIN_PROVIDER];

// export default function useLogin() {
//   const { fromApp } = useAppSelector((state: any) => state.app.response);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const tokens = getTokens();
//     if (tokens?.accessToken && tokens.refreshToken) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const handleSocialLogin = async (
//     provider: SOCIAL_LOGIN_PROVIDER_TYPE,
//     appleCallback: () => void = () => {}
//   ) => {
//     if (fromApp) {
//       // @ts-ignore
//       window.ReactNativeWebView.postMessage(
//         JSON.stringify({
//           socialLogin: { provider },
//         })
//       );
//       return;
//     } else {
//       const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
//       const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
//       const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
//       const REDIRECT_URI = `${
//         import.meta.env.VITE_REDIRECT_URI
//       }/${provider.toLowerCase()}`;

//       switch (provider) {
//         case "APPLE":
//           appleCallback();
//           break;
//         case "GOOGLE":
//           window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email+profile`;
//           break;
//         case "NAVER":
//           window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
//           break;
//         case "KAKAO":
//           window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
//           break;
//       }
//     }
//   };
//   const handleLogout = (callback: () => void) => {
//     if (fromApp) {
//       window.ReactNativeWebView.postMessage(JSON.stringify({ logout: true }));
//     }
//     removeTokens();
//     setIsAuthenticated(false);
//     callback();
//   };

//   return { handleSocialLogin, handleLogout, isAuthenticated };
// }
