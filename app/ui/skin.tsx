'use client'

import { useEffect, useState } from 'react'
import { SkinViewer } from '@labymod/skinview3d';

type SkinsProps = {
  hash: string;
};

export default function Skin({ hash }: SkinsProps) {
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

  function loadElement(hash: string) {
    const container = document.createElement("div")
    container.className = "skin_cont_ind"
    container.onclick = function () { onClick(hash) }
    container.classList.add("transition-all")

    const skinImage = document.createElement("img")

    render(skinImage, api + "skin/image?hash=" + hash).catch(ex => {
      render(skinImage, "https://textures.minecraft.net/texture/a3e1df44e853929ea0d094333fdf2726a44ef7c8b725efa34232c8b98fe33789")
    })
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
      loadElement(hash)
    }
    load();
  });
  return ""
}