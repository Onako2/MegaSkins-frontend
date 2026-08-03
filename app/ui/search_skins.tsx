"use client"

import Link from 'next/link'
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { SkinViewer } from "@labymod/skinview3d"

type SkinsProps = {
  query: string
}

function Skin({ hash }: { hash: string }) {
  const api = 'https://nuc.de.majic.rs/api/megaskins/'
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!imgRef.current) return
    const viewer = new SkinViewer({ width: 300, height: 400, renderPaused: true })
    viewer.camera.rotation.x = -0.62
    viewer.camera.rotation.y = 0.534
    viewer.camera.rotation.z = 0.348
    viewer.camera.position.x = 30.5
    viewer.camera.position.y = 22.0
    viewer.camera.position.z = 42.0

    let cancelled = false
    viewer.loadSkin(api + 'skin/image?hash=' + encodeURIComponent(hash)).then(() => {
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
      <img ref={imgRef} alt={hash} />
    </div>
  )
}

export default function Skins({ query }: SkinsProps) {
  const api = 'https://nuc.de.majic.rs/api/megaskins/'
  const [skins, setSkins] = useState<string[]>([])
  const loadedRef = useRef(false)
  const router = useRouter()

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    const container = document.getElementById("skins");

    fetch(`${api}skin/search?query=${encodeURIComponent(query)}`)
      .then(r => {
        if (r.status === 403) {
          if (container) {
            container.appendChild(
              document.createTextNode(
                "Error: Your search query contains forbidden words"
              )
            );
          }
        }
        return r.json()
      })
      .then((hashes: string[]) => {
        if (hashes.length === 0) {
          if (container) {
          container.appendChild(
              document.createTextNode(
                "Error: Couldn't find any skins :("
              )
            );
          }
        }
        setSkins(hashes);
      })
      .catch(() => {
        if (container) {
          container.appendChild(
            document.createTextNode(
              "Error: can't fetch skins, you might be rate limited? Try again later"
            )
          );
        }
      });
  }, [api, query]);

  return (
    <>
      {skins.map(hash => (
        <div key={hash} className="select-none">
          <Link href={"/skin/" + encodeURIComponent(hash)}>
            <Skin hash={hash} />
          </Link>
        </div>
      ))}
    </>
  )
}