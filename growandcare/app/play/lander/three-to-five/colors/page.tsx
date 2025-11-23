// app/(site)/colour-game/page.tsx
"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

type ColourItem = {
  id: number
  imageSrc: string
  alt: string
  adjective_us: string // what will be shown & spoken
  adjective_pt: string
}

// You can change these to your own images/words
const COLOURS: ColourItem[] = [
  {
    id: 1,
    imageSrc: "/game/red-ball.png",
    alt: "Red ball",
    adjective_us: "red",
    adjective_pt: "vermelho",
  },
  {
    id: 2,
    imageSrc: "/game/blue-car.png",
    alt: "Blue car",
    adjective_us: "blue",
    adjective_pt: "azul",
  },
  {
    id: 3,
    imageSrc: "/game/yellow-star.png",
    alt: "Yellow star",
    adjective_us: "yellow",
    adjective_pt: "amarelo",
  },
  {
    id: 4,
    imageSrc: "/game/green-leaf.png",
    alt: "Green leaf",
    adjective_us: "green",
    adjective_pt: "verde",
  },
]

export default function ColourGamePage() {
  const [revealedIds, setRevealedIds] = useState<number[]>([])
  const router = useRouter()

  const allRevealed = revealedIds.length === COLOURS.length

  const handleSpeak = useCallback((text: string, lang: string) => {
    if (typeof window === "undefined") return
    if (!("speechSynthesis" in window)) return

    // Stop anything already speaking
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    // Optional: set language / voice if needed
    utterance.lang = lang
    window.speechSynthesis.speak(utterance)
  }, [])

  const handleClickItem = (item: ColourItem) => {
    setRevealedIds((prev) =>
      prev.includes(item.id) ? prev : [...prev, item.id]
    )
    handleSpeak(item.adjective_us, "en-US")
    handleSpeak(item.adjective_pt, "pt-PT")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar: title and exit (disabled until finished if you want) */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-center px-4 py-3 relative">
          <h1 className="text-lg font-semibold">Colour Game</h1>
          {/* Optional top-right exit, always visible or conditionally */}
          {/* <button
            onClick={() => router.push("/")}
            className="absolute right-4 rounded-full bg-slate-200 px-3 py-1 text-sm hover:bg-slate-300"
          >
            Exit
          </button> */}
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-8">
        <p className="mb-6 text-center text-sm text-slate-600">
          Tap each picture. The colour word will appear and you will hear it.
        </p>

        <div className="grid w-full gap-6 sm:grid-cols-2">
          {COLOURS.map((item) => {
            const revealed = revealedIds.includes(item.id)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleClickItem(item)}
                className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <div className="relative h-32 w-32">
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="mt-3 h-12 text-center text-lg font-semibold tracking-wide">
                  {revealed ? (
                    <>
                      <span className="capitalize">{item.adjective_us}</span>
                      <br />
                      <span className="capitalize">{item.adjective_pt}</span>
                    </>
                  ) : (
                    <>
                    <span className="text-slate-300 select-none">
                      __________
                    </span>
                    <br />
                    <span className="text-slate-300 select-none">
                      __________
                    </span>
                    </>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {allRevealed && (
          <button
            type="button"
            onClick={() => router.push("/play/lander/three-to-five")}
            className="mt-8 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
          >
            Exit
          </button>
        )}
      </main>
    </div>
  )
}
