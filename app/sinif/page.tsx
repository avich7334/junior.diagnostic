"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { demoClass } from "@/lib/example"
import { classPortrait, formatDate } from "@/lib/scoring"
import { loadStudents, parseStudents, saveStudents } from "@/lib/storage"
import type { StudentRecord } from "@/lib/types"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ClassPage() {
  const [students, setStudents] = useState<StudentRecord[] | null>(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    setStudents(loadStudents())
  }, [])

  function refresh(next: StudentRecord[]) {
    saveStudents(next)
    setStudents(next)
  }

  if (!students) {
    return <p className="text-sm text-[#c5d2e4]">Loading the class…</p>
  }

  const portrait = classPortrait(students)

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-4xl text-[#f4efe6]">Class</h1>
          <p className="mt-2 max-w-xl text-sm text-[#c5d2e4]">
            Records stay in this browser. Download a backup before you switch computers.
          </p>
        </div>
        <Link href="/uygula" className={cn(buttonVariants(), "h-11 px-4")}>
          New check
        </Link>
      </header>

      {students.length === 0 ? (
        <div className="rounded-2xl bg-white p-6 ring-1 ring-[#e3d8c8]">
          <h2 className="font-serif text-2xl text-[#243652]">No checks yet</h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed">
            Take the first learner from Run. To see how a class pattern looks, load three sample profiles: one stuck on floor words, one fluent except he/she, and one between them.
          </p>
          <Button
            type="button"
            className="mt-4 h-10 px-4"
            onClick={() => refresh(demoClass)}
          >
            Load the sample class
          </Button>
        </div>
      ) : (
        <>
          <section className="rounded-2xl bg-[#243652] p-5 text-[#f7f3ea]">
            <h2 className="font-serif text-2xl">Shared gap</h2>
            {students.length < 3 ? (
              <p className="mt-2 text-sm text-[#f7f3ea]/80">
                A class pattern shows here after three checks. So far there {students.length === 1 ? "is" : "are"} {students.length}.
              </p>
            ) : portrait.shared.length === 0 ? (
              <p className="mt-2 text-sm leading-relaxed text-[#f7f3ea]/90">
                This group is not breaking in the same place. Do not build the class lesson on one learner’s gap. Each report has its own priority.
              </p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm">
                {portrait.shared.map((theme) => (
                  <li key={theme.theme}>
                    <strong>{theme.title}</strong> is also breaking in speech for {theme.hits} of {students.length} learners. Do not set this as individual homework. Open the lesson with it.
                  </li>
                ))}
              </ul>
            )}
            {portrait.topErrors.length > 0 ? (
              <p className="mt-3 text-xs text-[#f7f3ea]/70">
                Marked most often: {portrait.topErrors.map((error) => `${error.label} (${error.count})`).join(" · ")}
              </p>
            ) : null}
          </section>

          <ul className="space-y-2">
            {portrait.rows.map(({ student, report }) => (
              <li key={student.id}>
                <Link
                  href={`/rapor/${student.id}`}
                  className="grid gap-2 rounded-xl bg-white px-4 py-3 ring-1 ring-[#e3d8c8] sm:grid-cols-[1fr_auto_auto] sm:items-center"
                >
                  <span>
                    <span className="block font-medium">{student.name}</span>
                    <span className="text-sm text-[#5c6570]">
                      {student.className || "No class"} · {formatDate(student.createdAt)}
                    </span>
                  </span>
                  <span className="text-sm">
                    Paper {report.paper.right}/{report.paper.total}
                    {report.speaking.complete ? ` · speech ${report.speaking.sum}/15` : ""}
                  </span>
                  <span className="text-sm">
                    {report.priorities[0] ? report.priorities[0].title : "No priority"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {message ? <p className="text-sm text-[#f3d7a1]">{message}</p> : null}

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-10 px-3"
              onClick={() => {
                const blob = new Blob([JSON.stringify(students, null, 2)], {
                  type: "application/json",
                })
                const url = URL.createObjectURL(blob)
                const link = document.createElement("a")
                link.href = url
                link.download = "a1-check-backup.json"
                link.click()
                URL.revokeObjectURL(url)
              }}
            >
              Download backup
            </Button>
            <label className={cn(buttonVariants({ variant: "outline" }), "h-10 cursor-pointer px-3")}>
              Load backup
              <input
                type="file"
                accept="application/json"
                className="sr-only"
                onChange={async (event) => {
                  const file = event.target.files?.[0]
                  if (!file) return
                  try {
                    const incoming = parseStudents(JSON.parse(await file.text()))
                    if (incoming.length === 0) throw new Error("empty")
                    const merged = [
                      ...incoming,
                      ...students.filter((student) => !incoming.some((item) => item.id === student.id)),
                    ]
                    refresh(merged)
                    setMessage(`${incoming.length} record${incoming.length === 1 ? "" : "s"} loaded.`)
                  } catch {
                    setMessage("This file could not be read.")
                  }
                }}
              />
            </label>
            <Button
              type="button"
              variant="outline"
              className="h-10 px-3"
              onClick={() => {
                const ids = new Set(students.map((student) => student.id))
                const extras = demoClass.filter((student) => !ids.has(student.id))
                refresh([...extras, ...students])
              }}
            >
              Add the sample learners
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="h-10 px-3"
              onClick={() => {
                if (!window.confirm("Delete every check in this browser?")) return
                refresh([])
              }}
            >
              Delete all
            </Button>
          </div>
          <p className="text-xs text-[#c5d2e4]">A row opens the report. Use the button at the bottom of the report to delete one.</p>
        </>
      )}
    </div>
  )
}
