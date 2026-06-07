'use server'

type DescriptionProps = {
  hash?: string
}

export default async function Description({ hash }: DescriptionProps) {
  if (!hash) return null

  const api = `https://nuc.de.majic.rs/api/megaskins/skin/description?hash=${encodeURIComponent(hash)}`
  try {
    const res = await fetch(api)
    if (!res.ok) {
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