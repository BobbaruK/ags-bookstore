"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useSidebar } from "./ui/sidebar";

interface Props {
  children: ReactNode;
}

export const MainWrapper = ({ children }: Props) => {
  const { isMobile, state } = useSidebar();

  return (
    // TODO: this shit make cls on mobile

    <main
      className={cn(
        "grid min-h-dvh w-full grid-rows-siteGrid flex-col transition-[width] duration-200",
        {
          "w-[calc(100%)]": isMobile,
          "w-[calc(100%-var(--sidebar-width))]":
            !isMobile && state === "expanded",
        },
      )}
    >
      {children}
    </main>
  );
};
