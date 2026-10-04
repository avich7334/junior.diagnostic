"use client"

import { Picture } from "@/components/pictures"
import { Button } from "@/components/ui/button"
import { itemsIn, passage, sections, wordBank } from "@/lib/content"
import type { PaperMap, SectionId } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useState } from "react"

const order: SectionId[] = ["match", "reading", "context", "grammar"]

export function StudentRunner({
  paper,
  onChange,
  onDone,
}: {
  paper: PaperMap
  onChange: (id: string, value: string | "blank") => void
  onDone: () => void
}) {
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const sectionId = order[step]
  const section = sections.find((entry) => entry.id === sectionId)!
  const questions = itemsIn(sectionId)
  const blanks = questions.filter((item) => !paper[item.id]).length

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#f7f3ea] text-[#1c2430]">
      <div className="mx-auto flex min-h-full max-w-3xl flex-col px-4 py-5 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold tracking-[0.14em] text-[#a33b2b] uppercase">
            {section.task} · {step + 1}/4
          </p>
          <p className="text-sm text-[#5c6570]">{section.minutes}</p>
        </div>
        <h1 className="font-serif text-4xl text-[#243652]">{section.title}</h1>
        <p className="mt-2 text-xl">{section.instruction}</p>
        {sectionId === "match" ? (
          <p className="mt-2 text-sm text-[#5c6570]">Touch the picture, then the word.</p>
        ) : null}

        {sectionId === "reading" ? (
          <div className="mt-5 rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="font-serif text-2xl">{passage.title}</h2>
            <p className="mt-3 text-xl leading-relaxed">{passage.text}</p>
          </div>
        ) : null}

        <div className="mt-5 flex-1 space-y-4">
          {sectionId === "match" ? (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {questions.map((item) => {
                  const letter = paper[item.id]
                  const active = picked === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPicked(item.id)}
                      className={cn(
                        "rounded-2xl border bg-white p-2 text-center",
                        active ? "border-[#243652] ring-2 ring-[#243652]" : "border-[#e3d8c8]"
                      )}
                    >
                      <div className="text-sm font-semibold">{item.number}</div>
                      {item.picture ? (
                        <Picture name={item.picture} className="mx-auto size-20" label={`Picture ${item.number}`} />
                      ) : null}
                      <div className="mt-1 font-serif text-2xl text-[#243652]">
                        {letter && letter !== "blank" ? letter : "·"}
                      </div>
                    </button>
                  )
                })}
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {wordBank.map((entry) => (
                  <button
                    key={entry.letter}
                    type="button"
                    onClick={() => {
                      if (!picked) return
                      onChange(picked, entry.letter)
                      const current = questions.findIndex((item) => item.id === picked)
                      const next = questions.find((item, index) => index > current && !paper[item.id] && item.id !== picked)
                      setPicked(next?.id ?? null)
                    }}
                    className="rounded-xl border border-[#e3d8c8] bg-white px-3 py-3 text-left text-lg hover:border-[#243652]"
                  >
                    <span className="font-semibold">{entry.letter}.</span> {entry.word}
                  </button>
                ))}
              </div>
            </>
          ) : (
            questions.map((item) => (
              <div key={item.id} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  {item.picture ? (
                    <Picture name={item.picture} className="size-20 shrink-0" label="Picture" />
                  ) : null}
                  <p className="text-xl font-semibold">
                    {item.number}. {item.prompt}
                  </p>
                </div>
                <div className="mt-3 grid gap-2">
                  {item.choices.map((choice) => {
                    const on = paper[item.id] === choice.id
                    return (
                      <button
                        key={choice.id}
                        type="button"
                        onClick={() => onChange(item.id, choice.id)}
                        className={cn(
                          "min-h-12 rounded-xl border px-4 py-3 text-left text-lg",
                          on
                            ? "border-[#243652] bg-[#243652] text-[#f7f3ea]"
                            : "border-[#e3d8c8] hover:border-[#243652]"
                        )}
                      >
                        <span className="font-semibold">{choice.id}.</span> {choice.text}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="sticky bottom-0 mt-4 flex items-center justify-between gap-3 bg-[#f7f3ea]/95 py-3">
          <Button
            type="button"
            variant="outline"
            className="h-11 border-[#243652] bg-white px-4 text-[#17345c] hover:bg-[#efe6d6] hover:text-[#17345c]"
            disabled={step === 0}
            onClick={() => setStep((value) => value - 1)}
          >
            Back
          </Button>
          <p className="text-sm text-[#5c6570]">{blanks} blank</p>
          {step < 3 ? (
            <Button type="button" className="h-11 bg-[#17345c] px-4 text-[#f4efe6] hover:bg-[#244272]" onClick={() => setStep((value) => value + 1)}>
              Next
            </Button>
          ) : (
            <Button type="button" className="h-11 bg-[#17345c] px-4 text-[#f4efe6] hover:bg-[#244272]" onClick={onDone}>
              Done
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
