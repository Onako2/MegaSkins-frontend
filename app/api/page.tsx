import type { Metadata } from "next";
import Link from "next/link";
import ApiTester from "../ui/api_tester";

export const metadata: Metadata = {
  openGraph: {
    title: "MegaSkins API docs",
    description: "MegaSkins allows you to search for Minecraft skins and downloading them via a simple API",
    type: "website"
  },
};

export default function Page() {
  const mapQuery = new Map()
  const mapHash = new Map()
  mapQuery.set("query", "police")
  const hash = "101388e1247343ed0ce79ed0811cebd3faa7f354f268ea29ccc3934fe9a23920"
  mapHash.set("hash", hash)
  const mapScale = new Map();
  mapScale.set("hash", hash)
  mapScale.set("scale", "16.0")
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center py-8 px-16 bg-white dark:bg-black sm:items-start">
        <Link href="/">
          <h1 className="logo"><span>Mega<br></br>Skins</span></h1>
        </Link>
        <Link href="/api">
          <span>API</span>
        </Link>
        <div className="grid m-8 items-center gap-6">
          <p>MegaSkins has many api enpoints which allow users to do what they want</p>
          <ApiTester id="texture" title="Texture API" description={"With this API you can get the texture of a skin from MegaSkins' DB. You can also use the official Mojang api which is more reliable, example: https://textures.minecraft.net/texture/" + hash} rateLimitCount={300} rateLimitUnit="minute" returns="png" url="https://nuc.de.majic.rs/api/megaskins/skin/image" queries={mapHash} media={true} />
          <ApiTester id="description" title="Description API" description="With this API you can get the description of a skin" rateLimitCount={6} rateLimitUnit="minute" returns="string, raw description" url="https://nuc.de.majic.rs/api/megaskins/skin/description" queries={mapHash} />
          <ApiTester id="safety" title="Safety API" description="This endpoint allows you to get the safety score between 0 and 1 (0 = absolutely safe, 1 = absolutely unsafe). A good value to start with flagging is 0.95" rateLimitCount={3} rateLimitUnit="second" returns="float, between 0 and 1" url="https://nuc.de.majic.rs/api/megaskins/skin/safety" queries={mapHash} />
          <ApiTester id="head" title="Head API" description="Get a skin's front skull view from a hash. You can get scaled variants by modifying the scale parameter. Scale is optional must be between 1.0 and 64.0 (inclusive)." rateLimitCount={300} rateLimitUnit="minute" returns="png" url="https://nuc.de.majic.rs/api/megaskins/skin/head" queries={mapScale} media={true} />
          <ApiTester id="search" title="Search API" description="This endpoint allows you to search for Minecraft skins by providing an URL-encoded query" rateLimitCount={10} rateLimitUnit="minute" returns="array, consisting of strings of hashes" url="https://nuc.de.majic.rs/api/megaskins/skin/search" queries={mapQuery}></ApiTester>
          <ApiTester id="random" title="Random Skin API" description="We all love Laplace, right? You can get a random skin from MegaSkins" rateLimitCount={300} rateLimitUnit="minute" returns="string, raw hash" url="https://nuc.de.majic.rs/api/megaskins/skin/random" queries={new Map()}></ApiTester>
          <ApiTester id="details" title="Skin Non-Details API" description="Get basic details about a skin: hash and if it is in the list of unsafe skin (⚠️ this doesn't perform a safety check)" rateLimitCount={300} rateLimitUnit="minute" returns="json object, attributes: hash, unsafe" url="https://nuc.de.majic.rs/api/megaskins/skin" queries={mapHash}></ApiTester>
        </div>
      </main>
    </div>
  );
}
