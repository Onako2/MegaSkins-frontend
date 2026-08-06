'use client'
import { useState } from "react"

type SafetyProps = {
  hash?: string
}

export default function SafetyCheck({ hash }: SafetyProps) {
  const [similarity, setSimilarity] = useState("")
  if (!hash) return null

  const api = `https://nuc.de.majic.rs/api/megaskins/skin/safety?hash=${encodeURIComponent(hash)}`;
  return (
    <div className="basis-128 m-8 rounded-md grid">
      <p>{similarity}</p>
      <button id="safety_button" className="mt-5 outline-indigo-500 outline-dotted outline-3 outline-offset-5 hover:outline-yellow-500 transition-all duration-700" onClick={() => {
        setSimilarity("Getting data..");
        const safety_button = document.getElementById("safety_button");
        fetch(api).then(r => {
          if (r.ok) {
            r.text().then(text => {
              safety_button?.remove()
              setSimilarity("Safety score: " + text);
            })
          } else {
            safety_button?.classList.add("outline-red-500")
            setSimilarity("⚠️ Error: " + r.status);
          }
        }
        ).catch(e => {
          safety_button?.classList.add("outline-red-500")
          setSimilarity("⚠️ Error: " + e);
        })
      }}>Check MegaSkins Skin Safety</button>
      <p className="text-xs mt-5">The <span className="font-bold">MegaSkins Skin Safety</span> score tells you on a scale between 0.0 to 1.0 how unsafe a Minecraft skin is for use on Minecraft servers with minors. A score of 0.0 means that a skin is completly safe, and a skin of 1.0 means that a skin is an exact match. A score of 0.5 means that the skin is 50% similar to an unsafe skin. In case the score is inaccurate, please report it via the email from the contact website.</p>
    </div>
  )
}