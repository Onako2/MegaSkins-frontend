'use client'
 
import { useEffect, useState } from 'react'
import { SkinViewer } from '@labymod/skinview3d';
 
type SkinsProps = {
  count: number;
};

export default function Skins({ count }: SkinsProps) {
  const api = "http://localhost:8080/api/"
  const [wasLoaded, setLoaded] = useState(false)

  async function render(element: HTMLImageElement, skin: string) {
    const skinViewer = new SkinViewer({
      width: 200,
      height: 300,
      renderPaused: true,
    });
    skinViewer.camera.rotation.x = -0.62;
    skinViewer.camera.rotation.y = 0.534;
    skinViewer.camera.rotation.z = 0.348;
    skinViewer.camera.position.x = 30.5;
    skinViewer.camera.position.y = 22.0;
    skinViewer.camera.position.z = 42.0;

    await Promise.resolve(skinViewer.loadSkin(skin))
    skinViewer.render();
    const image = skinViewer.canvas.toDataURL();

    element.src = image;
    element.width = skinViewer.width;
    element.height = skinViewer.height;
  }

async function loadSite() {
    if (!wasLoaded) {
      setLoaded(true);
      console.log("First load!")
      for (let i = 0; i <= count; i++) {
        
        await fetch(api + "skin/random", {
          method: 'GET'
        }).then(fulfilled => {
          console.log("hey!")
          fulfilled.json().then(json => {
              loadElement(json.hash);
            }
          )
        })
      }
      const conts = document.getElementsByClassName("skin_cont");
      for (let i = 0; i < conts.length; i++) {
        const cont = conts[i] as HTMLElement;
        cont.hidden = false;
      }
    }
  }

  function loadElement(hash: string) {
    const container = document.createElement("div")
    container.className = "skin_cont"
    container.hidden = true
    container.onclick = function() {onClick(hash)}
    container.classList.add("transition-all")

    const skinImage = document.createElement("img")
    
    render(skinImage, api + "skin/image?hash=" + hash)
    container.appendChild(skinImage)

    const skins = document.getElementById("skins")
    if (skins != null) {
      skins.appendChild(container)
    }
  }

  function onClick(hash: string) {
    alert(hash);
  }

    useEffect(() => {
      async function load() {
        loadSite()
      }
      load();
  });
  return ""
}