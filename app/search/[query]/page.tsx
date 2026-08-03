import Skin from "../../ui/search_skins";
import Link from "next/link";
import Description from "@/app/ui/description";
import { Metadata } from "next";
import Search from "../../ui/search"

export async function generateMetadata(
  { params }: { params: { query: string } }
): Promise<Metadata> {
  const { query } = await params as { query: string };
  return {
    openGraph: {
      title: "MegaSkins",
      description: "Search: " + decodeURIComponent(query),
      type: "website"
    }
  };
}

export default async function Page({ params }: { params: { query: string } } | { params: Promise<{ query: string }> }) {
  const { query } = await params as { query: string };
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center py-8 px-16 bg-white dark:bg-black sm:items-start">
        <Link href="/">
          <h1 className="logo"><span>Mega<br></br>Skins</span></h1>
        </Link>
        <Link href="/search">
          <span>Search</span>
        </Link>
        <div className="mt-16 mb-10">
          <Search query={decodeURIComponent(query)}></Search>
        </div>
        <div className="grid grid-cols-4 grid-rows-3 flex flex-col gap-4 text-base font-medium sm:flex-row skins" id="skins">
          <Skin query={query} />
        </div>
      </main>
    </div>
  );
}
