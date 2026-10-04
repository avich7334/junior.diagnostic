"use client"

import { BandPill, TriPill } from "@/components/band"
import { Button } from "@/components/ui/button"
import { dimensions, errorCodes } from "@/lib/content"
import { buildReport, formatDate } from "@/lib/scoring"
import type { StudentRecord } from "@/lib/types"
import { useState } from "react"

export function ReportView({
  student,
  example = false,
  onDelete,
}: {
  student: StudentRecord
  example?: boolean
  onDelete?: () => void
}) {
  const report = buildReport(student)
  const [showAll, setShowAll] = useState(false)
  const misses = report.itemViews.filter((view) => view.status !== "right")
  const visible = showAll ? report.itemViews : misses

  return (
    <article className="space-y-8">
      <header>
        {example ? (
          <p className="mb-3 rounded-full bg-[#efe6d6] px-3 py-1 text-sm text-[#243652] inline-block">
            Sample learner. Not saved in this browser.
          </p>
        ) : null}
        <p className="text-sm text-[#5c6570]">
          {student.className || "No class"} · {formatDate(student.createdAt)} ·{" "}
          {student.mode === "screen" ? "done on screen" : "marked from paper"}
        </p>
        <h1 className="mt-1 font-serif text-4xl text-[#243652]">{student.name}</h1>
        <div className="mt-4 space-y-2 text-lg leading-relaxed">
          {report.summary.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2">
        {report.priorities.length === 0 ? (
          <div className="rounded-2xl bg-white p-5 ring-1 ring-[#e3d8c8] sm:col-span-2">
            <h2 className="font-serif text-2xl text-[#243652]">No priority</h2>
            <p className="mt-2 text-sm text-[#3d4654]">
              This check does not show an urgent hole. Still have them ask one question each lesson, and add one word to a sentence.
            </p>
          </div>
        ) : (
          report.priorities.map((priority, index) => (
            <div key={priority.theme + priority.title} className="rounded-2xl bg-white p-5 ring-1 ring-[#e3d8c8]">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#a33b2b] uppercase">
                Priority {index + 1}
              </p>
              <h2 className="mt-1 font-serif text-2xl text-[#243652]">{priority.title}</h2>
              <p className="mt-2 text-sm leading-relaxed">{priority.why}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#1e5c48]">{priority.action}</p>
            </div>
          ))
        )}
      </section>

      {report.overflow.length > 0 ? (
        <p className="text-sm text-[#5c6570]">
          Also breaking in speech, outside the top three:{" "}
          {report.overflow.map((priority) => priority.title).join(", ")}. Do not put all of them in the same week.
        </p>
      ) : null}

      <section>
        <h2 className="font-serif text-2xl text-[#243652]">Paper profile</h2>
        <p className="mt-1 text-sm text-[#5c6570]">
          Secure: at least 75% of answered items. Developing: 50–74%. Clear gap: below that. Blanks stay out of the rate.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {report.sections.map((section) => (
            <div key={section.id} className="rounded-xl bg-white p-4 ring-1 ring-[#e3d8c8]">
              <p className="text-sm text-[#5c6570]">{section.title}</p>
              <p className="mt-1 font-serif text-2xl">
                {section.right}/{section.right + section.wrong || section.total}
              </p>
              <BandPill band={section.band} className="mt-2" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-[#243652]">Word sets</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {report.vocabSets.map((set) => (
            <li key={set.set} className="rounded-xl bg-white px-4 py-3 ring-1 ring-[#e3d8c8]">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">{set.label}</p>
                <BandPill band={set.band} />
              </div>
              <p className="mt-1 text-sm text-[#5c6570]">
                {set.right} right · {set.wrong} wrong · {set.blank} blank
                {set.thin ? " · one item" : ""}
              </p>
              {set.misses.length > 0 ? (
                <p className="mt-1 text-sm">Missed: {set.misses.join(", ")}</p>
              ) : null}
              {set.thin && set.band === "gap" ? (
                <p className="mt-1 text-xs text-[#8a5a12]">
                  One-item set. Widen it if speech misses it too. Do not change the unit on a single miss.
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-[#243652]">Paper and speech together</h2>
        <p className="mt-1 text-sm text-[#5c6570]">
          A priority comes from an error that shows on both sides. If you also heard a paper-only miss in the room, add it on the form.
        </p>
        <ul className="mt-4 divide-y divide-[#efe6d6] rounded-xl bg-white ring-1 ring-[#e3d8c8]">
          {report.themes.map((theme) => (
            <li key={theme.theme} className="grid gap-2 px-4 py-3 sm:grid-cols-[10rem_8rem_1fr] sm:items-start">
              <p className="font-medium">{theme.title}</p>
              <TriPill state={theme.state} />
              <p className="text-sm text-[#3d4654]">{theme.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-[#243652]">Speaking</h2>
        {report.speaking.scoredCount === 0 ? (
          <p className="mt-2 text-sm">No scores entered.</p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-5">
            {dimensions.map((dimension) => {
              const score = student.speaking[dimension.id]
              const level = dimension.levels.find((item) => item.score === score)
              return (
                <li key={dimension.id} className="rounded-xl bg-white p-3 ring-1 ring-[#e3d8c8]">
                  <p className="text-sm text-[#5c6570]">{dimension.title}</p>
                  <p className="font-serif text-3xl">{score ?? "–"}</p>
                  <p className="text-sm">{level?.label ?? "Not seen"}</p>
                </li>
              )
            })}
          </ul>
        )}
        {student.errors.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {student.errors.map((id) => (
              <li key={id} className="rounded-full bg-[#f8e6e1] px-3 py-1 text-sm text-[#8d3426]">
                {errorCodes.find((code) => code.id === id)?.label ?? id}
              </li>
            ))}
          </ul>
        ) : null}
        {student.evidence ? (
          <blockquote className="mt-4 border-l-4 border-[#243652] pl-4 text-lg">
            {student.evidence}
          </blockquote>
        ) : (
          <p className="mt-4 text-sm text-[#5c6570]">
            No quote. Next time, write the child’s sentence exactly as said.
          </p>
        )}
        {student.notes ? <p className="mt-3 text-sm text-[#3d4654]">Note: {student.notes}</p> : null}
      </section>

      <section>
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-serif text-2xl text-[#243652]">
            {showAll ? "All items" : "Missed and blank items"}
          </h2>
          <Button type="button" variant="outline" className="h-9 px-3" onClick={() => setShowAll((value) => !value)}>
            {showAll ? "Misses only" : "Show all"}
          </Button>
        </div>
        <ul className="mt-4 space-y-2">
          {visible.map((view) => (
            <li key={view.item.id} className="rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-[#e3d8c8]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium">
                  {view.item.prompt}{" "}
                  <span className="font-normal text-[#5c6570]">{view.item.targetLabel}</span>
                </p>
                <span>
                  {view.status === "right"
                    ? "right"
                    : view.status === "blank"
                      ? "blank"
                      : view.status === "unmarked"
                        ? "unmarked"
                        : `“${view.chosenText}”`}
                </span>
              </div>
              {view.status === "wrong" ? <p className="mt-1 text-[#5c6570]">{view.note}</p> : null}
            </li>
          ))}
          {visible.length === 0 ? <li className="text-sm text-[#5c6570]">No missed items.</li> : null}
        </ul>
      </section>

      {onDelete ? (
        <div className="no-print">
          <Button type="button" variant="destructive" className="h-10 px-3" onClick={onDelete}>
            Delete this record
          </Button>
        </div>
      ) : null}
    </article>
  )
}
