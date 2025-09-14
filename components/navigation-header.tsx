"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Code2 } from "lucide-react";

export function NavigationHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 items-center max-w-[1200px] px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Code2 className="h-6 w-6" />
          <span className="font-bold">LeetCode Solutions</span>
        </Link>

        <div className="flex flex-1 items-center justify-between space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="문제 검색..."
                className="pl-8 w-full md:w-[300px]"
              />
            </div>
          </div>

          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/">홈</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/problems">문제 목록</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/about">소개</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
