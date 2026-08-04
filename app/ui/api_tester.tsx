'use client'
import { useState } from "react"

type QueryProps = {
  id: string,
  queries: Map<string, string>
}

type ApiProps = {
  id: string,
  title: string,
  description: string,
  rateLimitCount: number,
  rateLimitUnit: string,
  returns: string,
  url: string,
  queries: Map<string, string>,
  media?: boolean
}

export function Queries({ id, queries }: QueryProps) {

  if (queries.size === 0) {
    document.getElementById(id + "-query")?.remove()
  }

  return (
    <>
      {Array.from(queries.entries()).map(([id, value]) => (
        <div key={id} className="flex mt-2 wrap-break-word">
          <span className="mr-4 ml-4">{id}</span>
          <input
            name={id}
            className="dark:bg-gray-900 basis-full bg-amber-100 mr-1"
            id={"query-" + id}
            defaultValue={value}
          />
        </div>
      ))}
    </>
  )
}

export default function ApiTester({ id, title, description, rateLimitCount, rateLimitUnit, returns, url, queries, media }: ApiProps) {
  const [result, setResult] = useState("No result yet...")
  const [lastUrl, setUrl] = useState("")

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document.body.style.cursor = 'progress';

    const formData = new FormData(event.currentTarget);

    const map = new Map();
    let apiUrl = url
    apiUrl = apiUrl + "?"
    queries.forEach((value, key, map) => {
      const val = formData.get(key) as string;
      map.set(key, val);
      apiUrl = apiUrl + key + "=" + encodeURIComponent(val) + "&";
    })

    const urlElement = document.getElementById(id + "-url");
    const resultElement = document.getElementById(id + "-result");

    setUrl(apiUrl)
    resultElement?.classList.remove("blur-sm");
    if (urlElement === null) {
      setResult("Error: Couldn't find element urlElement")
      return
    }
    urlElement.classList.remove("blur-sm");
    urlElement.hidden = false

    const image = document.getElementById(id + "-image") as HTMLImageElement;

    if (media) {
      if (image != null) {
        image.src = apiUrl;
        image.hidden = false;
      }
      if (resultElement != null) {
        resultElement.remove()
      }
    } else {
      image?.remove()
      fetch(apiUrl).then(r => {
        if (r.ok) {
          r.text().then(text => {
            setResult(text)
          })
        } else {
          setResult("Error: " + r.status)
        }
      });
    }
    document.body.style.cursor = 'auto';
  }

  return (
    <div className="flex flex-col mt-2 m-1 ml-5 p-1 rounded-lg border brightness-90 hover:brightness-100 bg-blue-200 dark:bg-gray-800 transition-all duration-500 wrap-anywhere">
      <h1 className="ml-1 text-xl">{title}</h1>
      <p className="ml-2 mt-1">{description}</p>
      <p className="ml-2 mt-1 mb-3">Rate limit: {rateLimitCount}/{rateLimitUnit}</p>
      <p className="ml-2 mt-1 mb-3">Retuns: <span className="font-mono">{returns}</span></p>
      <p className="ml-3 mr-1 mb-2 font-mono"><a href={url}>{url}</a></p>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div id={id + "-query"} className="border-y-3 p-3 border-dashed">
          <p className="self">Query</p>
          <Queries id={id} queries={queries}></Queries>
        </div>
        <button type="submit" className="self-center bg-green-400 dark:bg-green-800 w-50 hover:w-75 p-2 m-4 transition-all duration-500">Execute</button>
      </form>
      <p id={id + "-url"} className="self-center font-mono blur-sm transition-all duration-750 ml-5 mb-5 mr-5 text-xs" hidden><a target="_blank" href={lastUrl}>{lastUrl}</a></p>
      <p id={id + "-result"} className="self-center font-mono p-5 border rounded-lg border-dashed blur-sm transition-all duration-1000">{result}</p>
      <img className="self-center" id={id + "-image"} src={result} hidden alt="Couldn't load the image. Something went wrong."></img>
      <p className="self-end mr-3 mt-3 mb-1 text-xs">MegaSkins API-Tester-3000</p>
    </div>
  )
}