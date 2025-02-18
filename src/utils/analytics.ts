export const AnalyticsEventList = {
  MENU_CLICK: "menu_click",
  BUTTON_CLICK: "button_click",
};
type AnalyticsEventList =
  (typeof AnalyticsEventList)[keyof typeof AnalyticsEventList];

export const logEvent = (eventName: AnalyticsEventList, eventParams: any) => {
  window.gtag("event", eventName, eventParams);
};
