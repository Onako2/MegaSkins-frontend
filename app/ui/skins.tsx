'use client'
 
import { useState } from 'react'
import { SkinViewer } from '@labymod/skinview3d';
 
export default function Skins() {
  const api = "http://localhost:8080/api/"

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

  function loadSite() {
    const container = document.createElement("div")
    container.className = "skin_cont"

    const skinImage = document.createElement("img")
    render(skinImage, api + "skin/image/random?" + getRandomInt(100000))
    // skinImage.src = api + "skin/image/random?" + getRandomInt(1000000);
    container.appendChild(skinImage)

    const skins = document.getElementById("skins")
    if (skins != null) {
      skins.appendChild(container)
    }
  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  return (
    <div>
      <button onClick={() => {
        loadSite()
      }}>load element</button>
    </div>
  )
}