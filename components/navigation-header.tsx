"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";

export function NavigationHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 items-center justify-between max-w-[1200px] px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        <Link href="/" className="flex items-center space-x-2">
          <Code2 className="h-6 w-6" />
          <span className="font-bold">LeetCode Solutions</span>
        </Link>

        {/* <nav className="flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/problems">문제 목록</Link>
          </Button>
        </nav> */}
      </div>
    </header>
  );
}
