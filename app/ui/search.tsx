"use client"

import { useRouter } from "next/navigation";

type SearchProps = {
  query?: string
}

export default function Search({ query }: SearchProps) {
  const router = useRouter();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = formData.get("query") as string;

    const based = encodeURIComponent(query);
    router.push(`/search/${based}`);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <p>Search:</p>
        <input name="query" className="dark:bg-gray-900 bg-amber-100 p-1" defaultValue={query}/>
        <button type="submit" className="dark:bg-blue-500 bg-blue-300 m-1 hover:bg-green-600 transition-all duration-700 p-1 pl-2 pr-2">Search</button>
      </form>
    </div>
  )
}