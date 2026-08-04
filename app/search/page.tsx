"use client";
import Link from "next/link";
import Search from "@/app/ui/search"
import ApiTester from "../ui/api_tester";

export default function Page() {
  const map = new Map()
  map.set("query", "police")
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center py-8 px-16 bg-white dark:bg-black sm:items-start">
        <Link href="/">
          <h1 className="logo"><span>Mega<br></br>Skins</span></h1>
        </Link>
        <Link href="/search">
          <span>Search</span>
        </Link>
        <div className="mt-16 mb-5">
          <Search query=""></Search>
        </div>
        <p className="mb-5">Try searching for something ⬆️</p>
        <ApiTester id="search" title="Search API" description="This endpoint allows you to search for Minecraft skins by providing an URL-encoded query" rateLimitCount={10} rateLimitUnit="minute" returns="array, consisting of strings of hashes" url="https://nuc.de.majic.rs/api/megaskins/skin/search" queries={map}></ApiTester>
      </main>
    </div>
  );
}
