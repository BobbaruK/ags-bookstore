import { AppSidebar } from "@/components/app-sidebar";
import { MainWrapper } from "@/components/main-wrapper";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function RootLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <Header /> */}
      <MainWrapper>{children}</MainWrapper>
      {/* <Footer /> */}
    </SidebarProvider>
  );
}
