'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SkinViewer } from '@labymod/skinview3d'
import { createOrbitControls } from '@labymod/skinview3d/libs/orbit_controls.js'

type SkinsProps = {
  hash: string
}

export default function Skin({ hash }: SkinsProps) {
  const api = 'https://nuc.de.majic.rs/api/megaskins/'
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()
  useEffect(() => {
    
    const skinCanvas = document.getElementById('skin_container') as HTMLCanvasElement
    let viewer
    let usesCanvas = false
    if (skinCanvas) {
      viewer = new SkinViewer({canvas: skinCanvas, width: 200, height: 300})
      usesCanvas = true
    } else {
      viewer = new SkinViewer({ width: 200, height: 300 })
    }
    viewer.camera.rotation.x = -0.62
    viewer.camera.rotation.y = 0.534
    viewer.camera.rotation.z = 0.348
    viewer.camera.position.x = 30.5
    viewer.camera.position.y = 22.0
    viewer.camera.position.z = 42.0

    const control = createOrbitControls(viewer);
	  control.enableRotate = true;
	  control.enableZoom = false;
	  control.enablePan = false;

    let cancelled = false

    const doRender = (url: string) =>
      viewer.loadSkin(url).then(() => {
        if (cancelled) return
        viewer.render()
        try {
          if (!imgRef.current) return
          if (!usesCanvas) {
            imgRef.current.src = viewer.canvas.toDataURL()
            imgRef.current!.width = viewer.width
            imgRef.current!.height = viewer.height
          } else {
            imgRef.current.style.display = 'none'
          }
          setLoaded(true)
        } catch (e) {
          if (imgRef.current) imgRef.current.alt = 'Error rendering skin'
        }
      })

    doRender(api + 'skin/image?hash=' + encodeURIComponent(hash)).catch(() =>
      doRender('https://textures.minecraft.net/texture/a3e1df44e853929ea0d094333fdf2726a44ef7c8b725efa34232c8b98fe33789').catch(() => {
        if (!cancelled && imgRef.current) imgRef.current.alt = 'Error loading skin'
      })
    )

    return () => {
      cancelled = true
    }
  }, [hash])

  return (
    <div className="skin_cont_ind transition-all" hidden={!loaded} onClick={() => router.push('/skin/' + encodeURIComponent(hash))}>
      <img ref={imgRef} alt={hash} />
      <canvas id="skin_container"></canvas>
    </div>
  )
}