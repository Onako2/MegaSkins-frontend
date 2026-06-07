"use client"

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SkinViewer } from '@labymod/skinview3d'

type SkinsProps = {
  count: number
}

function Skin({hash}: {hash: string}) {
  const api = 'http://localhost:8080/api/'
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!imgRef.current) return
    const viewer = new SkinViewer({ width: 200, height: 300, renderPaused: true })
    viewer.camera.rotation.x = -0.62
    viewer.camera.rotation.y = 0.534
    viewer.camera.rotation.z = 0.348
    viewer.camera.position.x = 30.5
    viewer.camera.position.y = 22.0
    viewer.camera.position.z = 42.0

    let cancelled = false
    viewer.loadSkin(api + 'skin/image?hash=' + hash).then(() => {
      if (cancelled) return
      viewer.render()
      try {
        imgRef.current!.src = viewer.canvas.toDataURL()
        imgRef.current!.width = viewer.width
        imgRef.current!.height = viewer.height
      } catch (e) {
        imgRef.current!.alt = 'Error rendering skin'
      }
      setLoaded(true)
    }).catch(() => {
      if (cancelled) return
      viewer.loadSkin('https://textures.minecraft.net/texture/a3e1df44e853929ea0d094333fdf2726a44ef7c8b725efa34232c8b98fe33789').then(() => {
        if (cancelled) return
        viewer.render()
        try {
          imgRef.current!.src = viewer.canvas.toDataURL()
          imgRef.current!.width = viewer.width
          imgRef.current!.height = viewer.height
        } catch (e) {
          imgRef.current!.alt = 'Error rendering skin'
        }
        setLoaded(true)
      }).catch(() => {
        if (cancelled) return
        imgRef.current!.alt = 'Error loading skin'
      })
    })

    return () => {
      cancelled = true
    }
  }, [hash, api])

  return (
    <div className="skin_cont transition-all" hidden={!loaded}>
      <img ref={imgRef} alt={hash}/>
    </div>
  )
}

export default function Skins({ count }: SkinsProps) {
  const api = 'http://localhost:8080/api/'
  const [skins, setSkins] = useState<string[]>([])
  const loadedRef = useRef(false)
  const router = useRouter()

  useEffect(() => {
    if (loadedRef.current) return
    loadedRef.current = true

    const fetchOne = () =>
      fetch(api + 'skin/random').then(r => r.json()).then(j => j.hash as string)

    const promises = Array.from({ length: count }).map(fetchOne)
    Promise.all(promises).then(hashes => setSkins(hashes)).catch(err => {
      const container = document.getElementById('skins')
      if (container) {
        const msg = document.createTextNode("Error: can't fetch skins, api might be down?")
        container.appendChild(msg)
      }
    })
  }, [count])

  return (
    <>
      {skins.map(hash => (
        <div key={hash} onClick={() => router.push('/skin/' + hash)}>
          <Skin hash={hash} />
        </div>
      ))}
    </>
  )
}