import Skin from "../../ui/skin";
import Link from "next/link";
import Description from "@/app/ui/description";
import { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: { hash: string } }
): Promise<Metadata> {
  const { hash } = await params as { hash: string };
  let api
  if (process.env.NODE_ENV == "production") {
    api = `http://host.docker.internal:8080/api/skin/description?hash=${encodeURIComponent(hash)}`
  } else {
    api = `https://nuc.de.majic.rs/api/megaskins/skin/description?hash=${encodeURIComponent(hash)}`
  }
  let description
  const res = await fetch(api)
  try {
    if (!res.ok) {
      description = "404?, idk. Open the website to find out more"
    } else {
      const text = await res.text()
      description = text.substring(0, 75) + "..."
    }
  } catch (ex) {
    description = "error:" + ex;
  }
  return {
    openGraph: {
      title: "MegaSkins",
      description: description,
      // images: [
      //   {
      //     url: "/megaskins/apple-touch-icon.png",
      //     width: 180,
      //     height: 180,
      //   }
      // ],
      type: "website"
    }
  };
}

export default async function Page({ params }: { params: { hash: string } } | { params: Promise<{ hash: string }> }) {
  const { hash } = await params as { hash: string };
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Link href="/">
          <h1 className="logo"><span>Mega<br></br>Skins</span></h1>
        </Link>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400 hashtext">
            {hash}
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row skins" id="skins">
          <Skin hash={hash} />
          <Description hash={hash} />
        </div>
      </main>
    </div>
  );
}
