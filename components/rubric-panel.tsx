"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { dimensions, errorCodes } from "@/lib/content"
import { buildReport } from "@/lib/scoring"
import type { DimensionId, StudentRecord } from "@/lib/types"
import { cn } from "@/lib/utils"

export function RubricPanel({
  student,
  onSpeaking,
  onToggle,
  onEvidence,
  onNotes,
  onBack,
  onSave,
  pendingBlank,
  onCountBlank,
  onDismissBlank,
}: {
  student: StudentRecord
  onSpeaking: (id: DimensionId, score: number | null) => void
  onToggle: (id: string) => void
  onEvidence: (value: string) => void
  onNotes: (value: string) => void
  onBack: () => void
  onSave: () => void
  pendingBlank: boolean
  onCountBlank: () => void
  onDismissBlank: () => void
}) {
  const report = buildReport(student)
  const groups = ["Vocabulary", "Grammar", "Pronunciation", "Interaction"] as const

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="space-y-5">
        <div>
          <h2 className="font-serif text-3xl text-[#243652]">The child is back in class.</h2>
          <p className="mt-2 text-[#3d4654]">
            Do not give the score in the room. Between 0 and 3, press the box closest to what you saw.
          </p>
        </div>
        {dimensions.map((dimension) => (
          <section key={dimension.id} className="rounded-2xl bg-white p-4 ring-1 ring-[#e3d8c8]">
            <h3 className="font-medium">{dimension.title}</h3>
            <p className="text-sm text-[#5c6570]">{dimension.question}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-4">
              {dimension.levels.map((level) => {
                const on = student.speaking[dimension.id] === level.score
                return (
                  <button
                    key={level.score}
                    type="button"
                    onClick={() => onSpeaking(dimension.id, level.score)}
                    className={cn(
                      "min-h-16 rounded-xl border px-3 py-2 text-left",
                      on ? "border-[#243652] bg-[#243652] text-[#f7f3ea]" : "border-[#e3d8c8]"
                    )}
                  >
                    <span className="block text-lg font-semibold">{level.score}</span>
                    <span className="text-sm">{level.label}</span>
                  </button>
                )
              })}
            </div>
            {student.speaking[dimension.id] !== null ? (
              <p className="mt-2 text-sm text-[#3d4654]">
                {
                  dimension.levels.find((level) => level.score === student.speaking[dimension.id])
                    ?.text
                }
              </p>
            ) : (
              <button
                type="button"
                className="mt-2 text-sm text-[#5c6570] underline"
                onClick={() => onSpeaking(dimension.id, null)}
              >
                No score yet
              </button>
            )}
          </section>
        ))}

        <section className="rounded-2xl bg-white p-4 ring-1 ring-[#e3d8c8]">
          <h3 className="font-medium">Error list</h3>
          <p className="text-sm text-[#5c6570]">What you ticked in the interview is here. Add anything you missed.</p>
          {groups.map((group) => (
            <div key={group} className="mt-4">
              <p className="text-xs font-semibold tracking-wide text-[#5c6570] uppercase">{group}</p>
              <div className="mt-2 grid gap-2">
                {errorCodes
                  .filter((code) => code.group === group)
                  .map((code) => {
                    const on = student.errors.includes(code.id)
                    return (
                      <button
                        key={code.id}
                        type="button"
                        onClick={() => onToggle(code.id)}
                        className={cn(
                          "rounded-lg border px-3 py-2 text-left text-sm",
                          on ? "border-[#a33b2b] bg-[#f8e6e1]" : "border-[#e3d8c8]"
                        )}
                      >
                        {code.label}
                      </button>
                    )
                  })}
              </div>
            </div>
          ))}
        </section>

        <label className="block">
          <span className="text-sm font-medium">The child’s sentence</span>
          <Textarea
            value={student.evidence}
            onChange={(event) => onEvidence(event.target.value)}
            className="mt-2 min-h-24 bg-white"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Note for yourself</span>
          <Textarea
            value={student.notes}
            onChange={(event) => onNotes(event.target.value)}
            placeholder="Started shy, then opened up on the picture."
            className="mt-2 min-h-20 bg-white"
          />
        </label>

        {pendingBlank ? (
          <div className="rounded-xl border border-[#8a5a12] bg-[#f8efd8] p-4">
            <p className="font-medium">Some paper items are still unmarked.</p>
            <p className="mt-1 text-sm">
              Count them as blank, or go back to the paper? A blank does not enter the percentage.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button type="button" className="h-10 px-3" onClick={onCountBlank}>
                Count as blank and save
              </Button>
              <Button type="button" variant="outline" className="h-10 px-3" onClick={onDismissBlank}>
                Go back
              </Button>
            </div>
          </div>
        ) : null}

        <div className="flex justify-between gap-3">
          <Button type="button" variant="outline" className="h-11 px-4" onClick={onBack}>
            Back to the interview
          </Button>
          <Button type="button" className="h-11 px-4" onClick={onSave}>
            Save the report
          </Button>
        </div>
      </div>

      <aside className="h-fit rounded-2xl bg-[#243652] p-4 text-[#f7f3ea] lg:sticky lg:top-20">
        <p className="text-xs tracking-[0.14em] uppercase text-[#f7f3ea]/70">Priority now</p>
        {report.priorities.length === 0 ? (
          <p className="mt-3 text-sm">No urgent gap is marked.</p>
        ) : (
          <ol className="mt-3 space-y-3">
            {report.priorities.map((priority, index) => (
              <li key={priority.theme}>
                <p className="text-sm text-[#f7f3ea]/70">{index + 1}</p>
                <p className="font-serif text-xl">{priority.title}</p>
              </li>
            ))}
          </ol>
        )}
        <p className="mt-4 text-xs text-[#f7f3ea]/70">
          Paper {report.paper.right}/{report.paper.total} right
          {report.speaking.complete ? ` · speech ${report.speaking.sum}/15` : ""}
        </p>
      </aside>
    </div>
  )
}
