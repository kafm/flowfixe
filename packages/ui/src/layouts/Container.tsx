import { type PropsWithChildren, forwardRef } from "react";

export interface ContainerProps extends PropsWithChildren {
  maxWidth?: string;
  stretch?: boolean;
  scrollable?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ maxWidth, stretch, scrollable, children }, ref) => {
    const getMaxWidth = () => {
      switch (maxWidth) {
        case "sm":
          return "540px";
        case "md":
          return "720px";
        case "lg":
          return "960px";
        case "xl":
          return "1140px";
        case "2xl":
          return "1320px";
        default:
          return maxWidth;
      }
    };

    return (
      <div
        ref={ref}
        style={{
          display: "block",
          width: "100%",
          maxWidth: getMaxWidth(),
          overflow: scrollable ? "auto" : undefined,
          height: stretch ? "100%" : undefined,
        }}
      >
        {children}
      </div>
    );
  }
);
