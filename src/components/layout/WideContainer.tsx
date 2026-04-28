import { ReactNode } from "react";

interface WideContainerProps {
  classNames?: string;
  children?: ReactNode;
  ultraWide?: boolean;
}

export function WideContainer(props: WideContainerProps) {
  return (
    <div
      className={`w-full ${
        props.ultraWide ? "px-4 sm:px-8 lg:px-16" : "px-4 sm:px-8 lg:px-12"
      } ${props.classNames || ""}`}
    >
      {props.children}
    </div>
  );
}
