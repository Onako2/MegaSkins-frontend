"use client";
import Link from "next/link";
import Search from "../ui/search"

export default function Page() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center py-8 px-16 bg-white dark:bg-black sm:items-start">
        <Link href="/">
          <h1 className="logo"><span>Mega<br></br>Skins</span></h1>
        </Link>
        <Link href="/search">
          <span>Search</span>
        </Link>
        <div className="mt-16">
          <Search query=""></Search>
        </div>
      </main>
    </div>
  );
}
