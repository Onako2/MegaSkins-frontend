'use server'

type DescriptionProps = {
  hash?: string
}

export default async function Description({ hash }: DescriptionProps) {
  if (!hash) return null

  let api
  if (process.env.NODE_ENV == "production") {
    api = `http://host.docker.internal:8080/api/skin/description?hash=${encodeURIComponent(hash)}`
  } else {
    api = `https://nuc.de.majic.rs/api/megaskins/skin/description?hash=${encodeURIComponent(hash)}`
  }
  try {
    const res = await fetch(api)
    if (!res.ok) {
      
      if (res.status == 429) {
        return (
        <div className="description basis-1/2">
          <p dangerouslySetInnerHTML={{ __html: "You've been rate limited!" }} />
        </div>
        )
      }
      const text = await res.text().catch(() => '')
      return (
        <div className="description basis-1/2">
          <p>{`Error: ${res.status} ${res.statusText} ${text}`}</p>
        </div>
      )
    }
    const text = await res.text()
    if (!text) {
      return (
        <div className="description basis-1/2">
          <p>No description available.</p>
        </div>
      )
    }
    return (
      <div className="description basis-1/2">
        <p dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    )
  } catch (e) {
    return (
      <div className="description basis-1/2">
        <p>{`Error fetching description: ${String(e)}`}</p>
      </div>
    )
  }
}