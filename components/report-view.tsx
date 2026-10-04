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
  const thinGap = report.vocabSets.find((set) => set.thin && set.band === "gap")

  return (
    <>
      <article className="report mx-auto w-full max-w-[190mm] bg-white px-4 py-4 text-[13px] leading-snug text-[#1c2430] shadow-[0_18px_50px_rgba(0,0,0,0.22)] print:max-w-none print:bg-white print:px-0 print:py-0 print:shadow-none sm:px-5 sm:py-5">
        <header className="flex items-start justify-between gap-3 border-b border-[#e4ddd2] pb-2">
          <div>
            <p className="text-[11px] text-[#5c6570]">
              {student.className || "No class"} · {formatDate(student.createdAt)} ·{" "}
              {student.mode === "screen" ? "done on screen" : "marked from paper"}
            </p>
            <h1 className="font-serif text-[22px] leading-none text-[#243652]">{student.name}</h1>
          </div>
          {example ? (
            <p className="shrink-0 rounded-full bg-[#efe6d6] px-2 py-0.5 text-[10px] text-[#243652]">
              Sample. Not saved.
            </p>
          ) : null}
        </header>

        <div className="mt-2 space-y-0.5 text-[12.5px]">
          {report.summary.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <section className="mt-3">
          <h2 className="text-[11px] font-semibold tracking-[0.12em] text-[#5c6570] uppercase">
            What to teach next
          </h2>
          {report.priorities.length === 0 ? (
            <p className="mt-1 rounded-lg border border-[#e4ddd2] px-2.5 py-2 text-[12px]">
              No urgent hole on this check. Still have them ask one question each lesson, and add one word to a sentence.
            </p>
          ) : (
            <div className="mt-1.5 grid gap-2 sm:grid-cols-2 [&>*:last-child:nth-child(odd)]:sm:col-span-2">
              {report.priorities.map((priority, index) => (
                <div key={priority.theme + priority.title} className="break-inside-avoid rounded-lg border border-[#e4ddd2] px-2.5 py-2">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-[#a33b2b] uppercase">
                    Priority {index + 1}
                  </p>
                  <h3 className="font-serif text-[15px] leading-tight text-[#243652]">{priority.title}</h3>
                  <p className="mt-1 text-[12px]">{priority.why}</p>
                  <p className="mt-1 text-[12px] text-[#1e5c48]">{priority.action}</p>
                </div>
              ))}
            </div>
          )}
          {report.overflow.length > 0 ? (
            <p className="mt-1.5 text-[11px] text-[#5c6570]">
              Also in speech, outside the top three: {report.overflow.map((priority) => priority.title).join(", ")}. Do not put all of them in the same week.
            </p>
          ) : null}
        </section>

        <section className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <h2 className="text-[11px] font-semibold tracking-[0.12em] text-[#5c6570] uppercase">Paper</h2>
            <ul className="mt-1 divide-y divide-[#efe6d6] border-y border-[#efe6d6]">
              {report.sections.map((section) => (
                <li key={section.id} className="flex items-center justify-between gap-2 py-0.5">
                  <span>{section.title}</span>
                  <span className="flex items-center gap-2">
                    <span className="tabular-nums text-[#5c6570]">
                      {section.right}/{section.right + section.wrong || section.total}
                    </span>
                    <BandPill band={section.band} className="px-1.5 py-0 text-[10px]" />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-1 text-[10px] text-[#5c6570]">
              Secure: at least 75% of answered items. Developing: 50–74%. Gap: below that. Blanks stay out.
            </p>
          </div>
          <div>
            <h2 className="text-[11px] font-semibold tracking-[0.12em] text-[#5c6570] uppercase">
              Speaking{report.speaking.complete ? ` · ${report.speaking.sum}/15` : ""}
            </h2>
            {report.speaking.scoredCount === 0 ? (
              <p className="mt-1 text-[12px]">No scores entered.</p>
            ) : (
              <ul className="mt-1 divide-y divide-[#efe6d6] border-y border-[#efe6d6]">
                {dimensions.map((dimension) => {
                  const score = student.speaking[dimension.id]
                  const level = dimension.levels.find((item) => item.score === score)
                  return (
                    <li key={dimension.id} className="flex items-center justify-between gap-2 py-0.5">
                      <span>{dimension.title}</span>
                      <span className="text-[#5c6570]">
                        <span className="font-medium text-[#1c2430] tabular-nums">{score ?? "–"}</span>
                        {level ? ` ${level.label}` : ""}
                      </span>
                    </li>
                  )
                })}
              </ul>
            )}
            {student.errors.length > 0 ? (
              <ul className="mt-1.5 flex flex-wrap gap-1">
                {student.errors.map((id) => (
                  <li key={id} className="rounded-full bg-[#f8e6e1] px-2 py-0.5 text-[10px] text-[#8d3426]">
                    {errorCodes.find((code) => code.id === id)?.label ?? id}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>

        <section className="mt-3">
          <h2 className="text-[11px] font-semibold tracking-[0.12em] text-[#5c6570] uppercase">Word sets</h2>
          <ul className="mt-1 grid grid-cols-1 gap-x-4 sm:grid-cols-3">
            {report.vocabSets.map((set) => (
              <li key={set.set} className="flex items-center justify-between gap-2 border-b border-[#efe6d6] py-0.5">
                <span>{set.label}</span>
                <span className="flex shrink-0 items-center gap-1.5">
                  <span className="tabular-nums text-[11px] text-[#5c6570]">
                    {set.right}/{set.right + set.wrong || set.total}
                  </span>
                  <BandPill band={set.band} className="px-1.5 py-0 text-[10px]" />
                </span>
              </li>
            ))}
          </ul>
          {thinGap ? (
            <p className="mt-1 text-[10px] text-[#8a5a12]">
              A one-item set is a gap. Widen it if speech misses it too. Do not change the unit on a single miss.
            </p>
          ) : null}
        </section>

        <section className="mt-3">
          <h2 className="text-[11px] font-semibold tracking-[0.12em] text-[#5c6570] uppercase">
            Paper and speech
          </h2>
          <ul className="mt-1 flex flex-wrap gap-1">
            {report.themes.map((theme) => (
              <li key={theme.theme} className="inline-flex items-center gap-1 rounded-full border border-[#e4ddd2] py-0.5 pr-0.5 pl-2 text-[11px]">
                {theme.title}
                <TriPill state={theme.state} />
              </li>
            ))}
          </ul>
        </section>

        {student.evidence || student.notes ? (
          <section className="mt-3 space-y-1 break-inside-avoid text-[12px]">
            {student.evidence ? (
              <p>
                <span className="font-medium text-[#5c6570]">Said: </span>
                {student.evidence}
              </p>
            ) : null}
            {student.notes ? (
              <p>
                <span className="font-medium text-[#5c6570]">Note: </span>
                {student.notes}
              </p>
            ) : null}
          </section>
        ) : (
          <p className="mt-3 text-[11px] text-[#5c6570]">No quote. Next time, write the child’s sentence exactly as said.</p>
        )}

        <section className="mt-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[11px] font-semibold tracking-[0.12em] text-[#5c6570] uppercase">
              {showAll ? "All items" : "Missed and blank"}
            </h2>
            <Button type="button" variant="outline" className="no-print h-7 border-[#3e5d8a] bg-white px-2 text-[11px] text-[#17345c] hover:bg-[#efe6d6] hover:text-[#17345c]" onClick={() => setShowAll((value) => !value)}>
              {showAll ? "Misses only" : "Show all"}
            </Button>
          </div>
          {visible.length === 0 ? (
            <p className="mt-1 text-[12px] text-[#5c6570]">No missed items.</p>
          ) : (
            <ul className="report-misses mt-1">
              {visible.map((view) => (
                <li
                  key={view.item.id}
                  className={
                    view.status === "right"
                      ? "report-hit mb-1 break-inside-avoid border-b border-[#efe6d6] pb-1"
                      : "mb-1 break-inside-avoid border-b border-[#efe6d6] pb-1"
                  }
                >
                  <p>
                    <span className="font-medium">{view.item.number}. {view.item.section === "match" ? view.item.targetLabel : view.item.prompt}</span>{" "}
                    <span className="text-[#5c6570]">
                      {view.status === "right"
                        ? "right"
                        : view.status === "blank"
                          ? "blank"
                          : view.status === "unmarked"
                            ? "unmarked"
                            : `“${view.chosenText}”`}
                    </span>
                  </p>
                  {view.status === "wrong" ? <p className="text-[11px] text-[#5c6570]">{view.note}</p> : null}
                </li>
              ))}
            </ul>
          )}
        </section>
      </article>

      {onDelete ? (
        <div className="no-print mx-auto mt-4 w-full max-w-[190mm]">
          <Button type="button" variant="destructive" className="h-10 px-3" onClick={onDelete}>
            Delete this record
          </Button>
        </div>
      ) : null}
    </>
  )
}
