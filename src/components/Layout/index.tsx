import { FC, ReactNode } from "react";
import { Navigation } from "../Navigation";

export interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={"bg-background h-screen overflow-hidden"}>
      <Navigation />
      {children}
    </div>
  );
};
