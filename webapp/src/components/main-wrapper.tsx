"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Footer } from "./footer";
import Header from "./header";
import { useSidebar } from "./ui/sidebar";

interface Props {
  children: ReactNode;
}

export const MainWrapper = ({ children }: Props) => {
  const { isMobile, state } = useSidebar();

  return (
    // TODO: this shit make cls on mobile
    <div
      className={cn(
        "min-h-dvh w-full transition-[width] duration-200",
        // "grid max-w-full grid-rows-siteGrid",
        "flex flex-col",
        // {
        //   "w-full": isMobile,
        //   "w-[calc(100%-var(--sidebar-width))]":
        //     !isMobile && state === "expanded",
        //   // "w-[calc(100%-var(--sidebar-width-icon)-1rem)]":!isMobile && state === "collapsed",
        // },
      )}
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
