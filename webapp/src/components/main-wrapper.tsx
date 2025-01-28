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
      className={cn("flex w-full flex-col transition-[width] duration-200", {
        "w-full": isMobile,
        "w-[calc(100%-var(--sidebar-width))]":
          !isMobile && state === "expanded",
      })}
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
