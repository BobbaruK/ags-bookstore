"use client";

import { UserButton } from "@/features/auth/components/user-button";
import { usePathname } from "next/navigation";
import { CustomButton } from "./custom-button";
import { SidebarTrigger } from "./ui/sidebar";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex w-full flex-wrap items-center justify-between gap-4 rounded-xl bg-secondary p-4 shadow-sm">
      <div className="flex gap-x-2">
        <CustomButton
          buttonLabel="Books"
          variant={pathname.startsWith("/books") ? "default" : "outline"}
          linkHref="/books"
        />
        <CustomButton
          buttonLabel="Authors"
          variant={pathname.startsWith("/authors") ? "default" : "outline"}
          linkHref="/authors"
        />
      </div>
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <UserButton />
      </div>
    </nav>
  );
};
