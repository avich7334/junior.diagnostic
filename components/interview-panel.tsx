"use client"

import { ExamScene } from "@/components/exam-scenes"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { errorCodes, phases } from "@/lib/content"
import { scenes } from "@/lib/oral"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function InterviewPanel({
  phaseIndex,
  onPhase,
  errors,
  onToggle,
  evidence,
  onEvidence,
  onFinish,
}: {
  phaseIndex: number
  onPhase: (index: number) => void
  errors: string[]
  onToggle: (id: string) => void
  evidence: string
  onEvidence: (value: string) => void
  onFinish: () => void
}) {
  const phase = phases[phaseIndex]
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000)
    return () => window.clearInterval(timer)
  }, [])
  const clock = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="rounded-full bg-[#243652] px-3 py-1 text-sm text-[#f7f3ea]">
          Do not correct. Do not ask for a repeat. Take notes.
        </p>
        <p className={cn("font-mono text-sm", seconds > 12 * 60 ? "text-[#a33b2b]" : "text-[#5c6570]")}>
          {clock}
          {seconds > 12 * 60 ? " · time is up, finish the sentence" : ""}
        </p>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {phases.map((entry, index) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => onPhase(index)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-sm",
              index === phaseIndex ? "bg-[#243652] text-[#f7f3ea]" : "bg-[#efe6d6] text-[#243652]"
            )}
          >
            {entry.title}
          </button>
        ))}
      </div>

      <section className="rounded-2xl bg-white p-5 ring-1 ring-[#e3d8c8] sm:p-7">
        <p className="text-sm text-[#5c6570]">
          {phase.title} · {phase.minutes}
          {phase.scored ? "" : " · not scored"}
        </p>
        {phase.intro ? <p className="mt-2 text-[#3d4654]">{phase.intro}</p> : null}
        {phase.scene ? (
          <div className="mt-4 overflow-hidden rounded-xl border border-[#e3d8c8]">
            <ExamScene id={phase.scene} className="h-auto w-full" />
            <p className="bg-[#faf7f1] px-4 py-3 text-sm text-[#5c6570]">
              Do not read this aloud. {scenes.find((scene) => scene.id === phase.scene)?.note}
            </p>
          </div>
        ) : null}
        <ol className="mt-5 space-y-5">
          {phase.questions.map((question, index) => (
            <li key={question.say}>
              <p className="font-serif text-3xl leading-tight text-[#243652] sm:text-4xl">
                {index + 1}. {question.say}
              </p>
              {question.expected ? (
                <p className="mt-2 text-sm text-[#1e5c48]">Expected: {question.expected}</p>
              ) : null}
              <p className="mt-2 text-sm text-[#5c6570]">Backup: {question.backup}</p>
              <p className="mt-1 text-sm">Listen: {question.listen}</p>
            </li>
          ))}
        </ol>
        {phase.close ? (
          <p className="mt-5 font-serif text-2xl text-[#243652]">{phase.close}</p>
        ) : null}
      </section>

      {phase.errorIds.length > 0 ? (
        <section className="rounded-2xl bg-white p-4 ring-1 ring-[#e3d8c8]">
          <h3 className="font-medium">Tick it if you hear it in this phase</h3>
          <div className="mt-3 grid gap-2">
            {phase.errorIds.map((id) => {
              const code = errorCodes.find((entry) => entry.id === id)
              if (!code) return null
              const on = errors.includes(id)
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onToggle(id)}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-left text-sm",
                    on ? "border-[#a33b2b] bg-[#f8e6e1]" : "border-[#e3d8c8]"
                  )}
                >
                  {on ? "● " : "○ "}
                  {code.label}
                </button>
              )
            })}
          </div>
        </section>
      ) : null}

      <label className="block">
        <span className="text-sm font-medium">The child’s sentence, as said</span>
        <Textarea
          value={evidence}
          onChange={(event) => onEvidence(event.target.value)}
          placeholder="I have nine. She my brother. Cat chair."
          className="mt-2 min-h-24 bg-white"
        />
      </label>

      <div className="flex justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-11 px-4"
          disabled={phaseIndex === 0}
          onClick={() => onPhase(phaseIndex - 1)}
        >
          Previous phase
        </Button>
        {phaseIndex < phases.length - 1 ? (
          <Button type="button" className="h-11 px-4" onClick={() => onPhase(phaseIndex + 1)}>
            Next phase
          </Button>
        ) : (
          <Button type="button" className="h-11 px-4" onClick={onFinish}>
            Child has left, score it
          </Button>
        )}
      </div>
    </div>
  )
}
