import { PropsWithChildren } from "react";
import MainHeader from "./header";
import MainLayout from "./main";

interface LayoutProps extends PropsWithChildren {}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <MainHeader />
      <MainLayout>{children}</MainLayout>
    </>
  );
};

export default Layout;
