"use client"

import { Picture } from "@/components/pictures"
import { Button } from "@/components/ui/button"
import { items, sections } from "@/lib/content"
import type { PaperMap, SectionId } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function PaperMarker({
  paper,
  onChange,
}: {
  paper: PaperMap
  onChange: (id: string, value: string | "blank") => void
}) {
  const [section, setSection] = useState<SectionId>("match")
  const visible = items.filter((item) => item.section === section)
  const marked = items.filter((item) => paper[item.id]).length

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#c5d2e4]">
          {marked}/{items.length} items marked. The right letter shows as a small dot. Mark the option the learner chose.
        </p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#efe6d6] sm:w-48">
          <div
            className="h-full bg-[#243652]"
            style={{ width: `${(marked / items.length) * 100}%` }}
          />
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {sections.map((entry) => (
          <Button
            key={entry.id}
            type="button"
            variant={section === entry.id ? "default" : "outline"}
            className="h-9 px-3"
            onClick={() => setSection(entry.id)}
          >
            {entry.task}
          </Button>
        ))}
      </div>
      <ul className="space-y-3">
        {visible.map((item) => {
          const selected = paper[item.id]
          return (
            <li key={item.id} className="rounded-xl bg-white p-4 ring-1 ring-[#e3d8c8]">
              <div className="flex gap-3">
                {item.picture ? (
                  <Picture name={item.picture} className="size-16 shrink-0" label={`Item ${item.number}`} />
                ) : null}
                <div className="min-w-0 flex-1">
                  <p className="font-medium">
                    {item.number}. {item.section === "match" ? item.targetLabel : item.prompt}
                  </p>
                  <p className="text-xs text-[#5c6570]">{item.targetLabel}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.choices.map((choice) => {
                      const correct = choice.id === item.answer
                      const on = selected === choice.id
                      return (
                        <button
                          key={choice.id}
                          type="button"
                          onClick={() => onChange(item.id, choice.id)}
                          className={cn(
                            "rounded-lg border px-3 py-2 text-left text-sm",
                            on
                              ? correct
                                ? "border-[#1e5c48] bg-[#e5f2ec]"
                                : "border-[#a33b2b] bg-[#f8e6e1]"
                              : "border-[#e3d8c8] bg-[#fffdf8] hover:border-[#243652]"
                          )}
                        >
                          <span className="font-semibold">{choice.id}.</span> {choice.text}
                          {correct ? (
                            <span className="ml-2 text-xs text-[#1e5c48]">right</span>
                          ) : null}
                        </button>
                      )
                    })}
                    <button
                      type="button"
                      onClick={() => onChange(item.id, "blank")}
                      className={cn(
                        "rounded-lg border px-3 py-2 text-sm",
                        selected === "blank"
                          ? "border-[#8a5a12] bg-[#f8efd8]"
                          : "border-[#e3d8c8] hover:border-[#243652]"
                      )}
                    >
                      Blank
                    </button>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
