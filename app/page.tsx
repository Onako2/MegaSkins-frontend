import Image from "next/image";
import Script from "next/script";
import Counter from "./ui/counter";
import Skins from "./ui/skins";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="logo"><span>MegaSkins</span></h1>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Minecraft skins, tagged, described and agent ready!
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Lorem ipsum
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row skins" id="skins">
          <Skins count={4}></Skins>
        </div>
      </main>
    </div>
  );
}
