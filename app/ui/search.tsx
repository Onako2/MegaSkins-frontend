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
        <p>Type in your search term:</p>
        <input name="query" className="bg-gray-900" defaultValue={query}/>
        <button type="submit" className="bg-blue-500 m-1">Search</button>
      </form>
    </div>
  )
}