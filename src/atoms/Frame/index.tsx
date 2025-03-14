"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";

import useFrame, { UseFrameProps } from "./useFrame";
import { colors } from "@/styles";

export interface FrameProps
  extends UseFrameProps,
    Pick<HTMLAttributes<HTMLDivElement>, "onClick"> {
  children?: ReactNode;
  testId?: string;
}

const Frame = forwardRef<HTMLDivElement, FrameProps>(
  ({ children, row, col = true, onClick, testId, ...props }, ref) => {
    const { getStyle } = useFrame({
      w: "fit-content",
      h: "fit-content",
      col: row ? false : col,
      row: row,
      position: "relative",
      ...props,
    });
    return (
      <div
        onClick={onClick}
        ref={ref}
        style={getStyle}
        {...(testId ? { "data-testid": testId } : {})}
      >
        {children}
      </div>
    );
  }
);

export const FrameScreen = forwardRef<HTMLDivElement, FrameProps>(
  (
    { children, row, w, h, overflow, bg, col = true, onClick, ...props },
    ref
  ) => {
    const { getStyle } = useFrame({
      w: w ?? "100%",
      h: h ?? "100%",
      overflow: overflow || "y-scroll",
      col: row ? false : col,
      row: row,
      bg: bg || colors.white,
      position: "relative",
      ...props,
    });
    return (
      <div onClick={onClick} ref={ref} style={getStyle}>
        {children}
      </div>
    );
  }
);
FrameScreen.displayName = "Hingoray.FrameScreen";
Frame.displayName = "Hingoray.Frame";

export default Frame;
