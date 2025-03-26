import { PropsWithChildren } from "react";

interface LayoutMainProps extends PropsWithChildren {}

const MainLayout = ({ children }: LayoutMainProps) => {
  return <main id="site-content">{children}</main>;
};

export default MainLayout;
