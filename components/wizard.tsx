"use client"

import { InterviewPanel } from "@/components/interview-panel"
import { PaperMarker } from "@/components/paper-marker"
import { RubricPanel } from "@/components/rubric-panel"
import { StudentRunner } from "@/components/student-runner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { items } from "@/lib/content"
import { getStudent, newStudent, upsertStudent } from "@/lib/storage"
import type { DimensionId, PaperMap, StudentRecord } from "@/lib/types"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type Step = "info" | "paper" | "screen" | "handoff" | "interview" | "rubric"

const DRAFT = "junior-a1-tani-draft"

type Draft = {
  step: Step
  student: StudentRecord
  phase: number
}

export function Wizard() {
  const router = useRouter()
  const params = useSearchParams()
  const [step, setStep] = useState<Step>("info")
  const [student, setStudent] = useState<StudentRecord | null>(null)
  const [phase, setPhase] = useState(0)
  const [name, setName] = useState("")
  const [className, setClassName] = useState("")
  const [mode, setMode] = useState<"paper" | "screen">("paper")
  const [draftOffer, setDraftOffer] = useState<Draft | null>(null)
  const [pendingBlank, setPendingBlank] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = params.get("id")
    if (id) {
      const existing = getStudent(id)
      if (existing) {
        setStudent(existing)
        setName(existing.name)
        setClassName(existing.className)
        setMode(existing.mode)
        setStep("paper")
      }
      setReady(true)
      return
    }
    const raw = sessionStorage.getItem(DRAFT)
    if (raw) {
      try {
        const draft = JSON.parse(raw) as Draft
        if (draft.student?.name) setDraftOffer(draft)
      } catch {
        sessionStorage.removeItem(DRAFT)
      }
    }
    setReady(true)
  }, [params])

  useEffect(() => {
    if (!ready || !student) return
    const draft: Draft = { step, student, phase }
    sessionStorage.setItem(DRAFT, JSON.stringify(draft))
  }, [ready, step, student, phase])

  function patch(next: Partial<StudentRecord>) {
    setStudent((current) => (current ? { ...current, ...next } : current))
  }

  function setPaper(id: string, value: string | "blank") {
    setStudent((current) =>
      current ? { ...current, paper: { ...current.paper, [id]: value } } : current
    )
  }

  function toggleError(id: string) {
    setStudent((current) => {
      if (!current) return current
      const errors = current.errors.includes(id)
        ? current.errors.filter((error) => error !== id)
        : [...current.errors, id]
      return { ...current, errors }
    })
  }

  function start() {
    if (!name.trim()) return
    const created = newStudent({ name, className, mode })
    setStudent(created)
    setStep(mode === "screen" ? "screen" : "paper")
  }

  function unmarkedCount(paper: PaperMap) {
    return items.filter((item) => paper[item.id] == null).length
  }

  function save(record: StudentRecord) {
    upsertStudent(record)
    sessionStorage.removeItem(DRAFT)
    router.push(`/rapor/${record.id}`)
  }

  function requestSave() {
    if (!student) return
    if (unmarkedCount(student.paper) > 0) {
      setPendingBlank(true)
      return
    }
    save(student)
  }

  if (!ready) {
    return <p className="text-sm text-[#5c6570]">Loading…</p>
  }

  if (step === "screen" && student) {
    return (
      <StudentRunner
        paper={student.paper}
        onChange={setPaper}
        onDone={() => setStep("handoff")}
      />
    )
  }

  return (
    <div className="space-y-6">
      {draftOffer && step === "info" && !student ? (
        <div className="rounded-xl border border-[#8a5a12] bg-[#f8efd8] p-4">
          <p className="font-medium">Unfinished check: {draftOffer.student.name}</p>
          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              className="h-10 px-3"
              onClick={() => {
                setStudent(draftOffer.student)
                setStep(draftOffer.step === "screen" ? "handoff" : draftOffer.step)
                setPhase(draftOffer.phase)
                setDraftOffer(null)
              }}
            >
              Continue
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-10 px-3"
              onClick={() => {
                sessionStorage.removeItem(DRAFT)
                setDraftOffer(null)
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ) : null}

      {step === "info" ? (
        <form
          className="max-w-xl space-y-5"
          onSubmit={(event) => {
            event.preventDefault()
            start()
          }}
        >
          <div>
            <h1 className="font-serif text-4xl text-[#243652]">Start a check</h1>
            <p className="mt-2 text-[#3d4654]">
              Name first. Then mark the paper yourself, or let the learner do it on this screen. The interview comes after either one.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Learner</Label>
            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-11 bg-white"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>
            <Input
              id="class"
              value={className}
              onChange={(event) => setClassName(event.target.value)}
              placeholder="4-A"
              className="h-11 bg-white"
            />
          </div>
          <fieldset className="grid gap-2 sm:grid-cols-2">
            <legend className="mb-2 text-sm font-medium">Paper part</legend>
            {(
              [
                ["paper", "I will mark the paper"],
                ["screen", "The learner will do it on this screen"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value)}
                className={
                  mode === value
                    ? "rounded-xl border border-[#243652] bg-[#243652] px-4 py-4 text-left text-[#f7f3ea]"
                    : "rounded-xl border border-[#e3d8c8] bg-white px-4 py-4 text-left"
                }
              >
                {label}
              </button>
            ))}
          </fieldset>
          <Button type="submit" className="h-11 px-5" disabled={!name.trim()}>
            Continue
          </Button>
        </form>
      ) : null}

      {step === "handoff" && student ? (
        <div className="mx-auto max-w-lg py-16 text-center">
          <p className="font-serif text-5xl text-[#243652]">Thank you.</p>
          <p className="mt-4 text-xl">Give the tablet to your teacher.</p>
          <Button type="button" className="mt-10 h-11 px-5" onClick={() => setStep("paper")}>
            Teacher continues
          </Button>
        </div>
      ) : null}

      {step === "paper" && student ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-serif text-3xl text-[#243652]">{student.name}</h1>
              <p className="text-sm text-[#5c6570]">Paper marking. Choose the option the learner marked. Right or wrong fills in on its own.</p>
            </div>
            <Button type="button" className="h-11 px-4" onClick={() => setStep("interview")}>
              Go to the interview
            </Button>
          </div>
          <PaperMarker paper={student.paper} onChange={setPaper} />
        </div>
      ) : null}

      {step === "interview" && student ? (
        <InterviewPanel
          phaseIndex={phase}
          onPhase={setPhase}
          errors={student.errors}
          onToggle={toggleError}
          evidence={student.evidence}
          onEvidence={(evidence) => patch({ evidence })}
          onFinish={() => setStep("rubric")}
        />
      ) : null}

      {step === "rubric" && student ? (
        <RubricPanel
          student={student}
          onSpeaking={(id: DimensionId, score) =>
            patch({ speaking: { ...student.speaking, [id]: score } })
          }
          onToggle={toggleError}
          onEvidence={(evidence) => patch({ evidence })}
          onNotes={(notes) => patch({ notes })}
          onBack={() => setStep("interview")}
          onSave={requestSave}
          pendingBlank={pendingBlank}
          onDismissBlank={() => {
            setPendingBlank(false)
            setStep("paper")
          }}
          onCountBlank={() => {
            const paper = { ...student.paper }
            for (const item of items) {
              if (paper[item.id] == null) paper[item.id] = "blank"
            }
            const next = { ...student, paper }
            setStudent(next)
            setPendingBlank(false)
            save(next)
          }}
        />
      ) : null}
    </div>
  )
}
