import Skin from "@/app/ui/skin";
import Link from "next/link";
import Description from "@/app/ui/description";
import SafetyCheck from "@/app/ui/check_safety";
import { Metadata } from "next";
import ApiTester from "@/app/ui/api_tester";

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
      //     url: "https://nuc.de.majic.rs/megaskins/favicon.ico",
      //     width: 32,
      //     height: 32,
      //   }
      // ],
      type: "website"
    }
  };
}

export default async function Page({ params }: { params: { hash: string } } | { params: Promise<{ hash: string }> }) {
  const { hash } = await params as { hash: string };
  const map = new Map();
  map.set("hash", hash)
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center py-8 px-16 bg-white dark:bg-black sm:items-start">
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
        <div className="flex">
          <SafetyCheck hash={hash} />
        </div>
        <div className="grid">
          <ApiTester id={"texture"} title={"Texture API"} description={"With this API you can get the texture of a skin from MegaSkins' DB. You can also use the official Mojang api which is more reliable, example: https://textures.minecraft.net/texture/" + hash} rateLimitCount={300} rateLimitUnit="minute" returns="png" url={"https://nuc.de.majic.rs/api/megaskins/skin/image"} queries={map} media={true}/>
          <ApiTester id={"description"} title={"Description API"} description={"With this API you can get the description of a skin"} rateLimitCount={6} rateLimitUnit="minute" returns="string, raw description" url={"https://nuc.de.majic.rs/api/megaskins/skin/description"} queries={map}/>
          <ApiTester id={"safety"} title={"Safety API"} description={"This endpoint allows you to get the safety score between 0 and 1 (0 = absolutely safe, 1 = absolutely unsafe). A good value to start with flagging is 0.95"} rateLimitCount={3} rateLimitUnit="second" returns="float, between 0 and 1" url={"https://nuc.de.majic.rs/api/megaskins/skin/safety"} queries={map}/>
        </div>
      </main>
    </div>
  );
}
