'use client'

import { useEffect, useState } from 'react'

type SkinsProps = {
  hash: string;
};

export default function Description({ hash }: SkinsProps) {
  const api = "http://localhost:8080/api/"

  async function describe(hash: string) {
    await fetch(api + "skin/description?hash=" + hash, {
      method: 'GET'
    }).then(fulfilled => {
      fulfilled.text().then(text => {
        if (text != null) {
          loadElement(text);
        }
      })
    }).catch(ex => {
      loadElement("Error " + ex);
    })
  }

  function loadElement(descriptionText: string) {
    const container = document.createElement("div")
    container.className = "description"

    const description = document.createElement("p")
    description.innerHTML = descriptionText;

    container.appendChild(description)

    const skins = document.getElementById("skins")
    if (skins != null) {
      skins.appendChild(container)
    }
  }

  useEffect(() => {
    async function load() {
      await describe(hash)
    }
    load();
  });
  return ""
}