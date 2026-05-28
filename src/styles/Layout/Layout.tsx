import { AppSidebar } from "@/components/common/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Outlet, useLocation } from "react-router-dom";
import { LayoutWrapper, MainContainer } from "@/styles/Layout/LayoutStyle";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { pathname } = useLocation();
  const noSidebarPaths = [
    "/login",
    "/forgotpassword",
    "/resetpassword",
    "/otpverification",
    "/onboarding",
    "/order/invoice/details",
  ];

  // Early return for paths without sidebar and header
  if (noSidebarPaths.some((path) => pathname.startsWith(path))) {
    return children ? <>{children}</> : <Outlet />;
  }

  return (
    <SidebarProvider>
      <TooltipProvider>
        <LayoutWrapper>
          <AppSidebar />

          <MainContainer>
            {children ? children : <Outlet />}
          </MainContainer>
        </LayoutWrapper>
      </TooltipProvider>
    </SidebarProvider>
  );
};

export default Layout;
