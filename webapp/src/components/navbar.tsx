"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/features/auth/components/user-button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex w-full items-center justify-between rounded-xl bg-secondary p-4 shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname.startsWith("/books") ? "default" : "outline"}
        >
          <Link href={"/books"}>Books</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
