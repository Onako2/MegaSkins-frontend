'use server'

export default async function Stats() {

  const api = 'https://nuc.de.majic.rs/api/megaskins/stats'
  try {
    const res = await fetch(api)
    if (!res.ok) {
      const text = await res.json().catch(() => '')
      return (
        <div className="stats basis-1/2">
          <p>{`Error: ${res.status} ${res.statusText} ${text}`}</p>
        </div>
      )
    }
    const text = await res.json()
    if (!text) {
      return (
        <div className="stats basis-1/2">
          <p>No stats available.</p>
        </div>
      )
    }
    return (
      <div className="stats basis-1/2">
        <p dangerouslySetInnerHTML={{ __html: `Skins descriptions: ${text.descriptionCount}` }} />
      </div>
    )
  } catch (e) {
    return (
      <div className="stats basis-1/2">
        <p>{`Error fetching stats: ${String(e)}`}</p>
      </div>
    )
  }
}