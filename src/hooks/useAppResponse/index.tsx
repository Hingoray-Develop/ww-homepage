// "use client";

// import { useCallback, useEffect, useState } from "react";

// const useAppResponse = () => {
//   const [data, setData] = useState<AppResponse>();

//   const handleAppResponse = useCallback((e: any) => {
//     try {
//       const parsedData: AppResponse = JSON.parse(e.data);
//       setData(parsedData);
//     } catch (error) {
//       console.error("Error parsing message data:", error);
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       window.addEventListener("message", handleAppResponse);
//       window.document.addEventListener("message", handleAppResponse);
//       return () => {
//         window.removeEventListener("message", handleAppResponse);
//         window.document.removeEventListener("message", handleAppResponse);
//       };
//     }
//   }, [handleAppResponse]);

//   return {
//     data,
//     // @ts-ignore
//     fromApp: window.ReactNativeWebView,
//   };
// };

// export default useAppResponse;
