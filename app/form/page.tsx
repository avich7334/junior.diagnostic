import { PrintButton } from "@/components/print-button"
import { ExamScene } from "@/components/exam-scenes"
import { dimensions, errorCodes, phases } from "@/lib/content"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Interview form" }

export default function FormPage() {
  const groups = ["Vocabulary", "Grammar", "Pronunciation", "Interaction"] as const
  return (
    <div className="space-y-6">
      <div className="no-print flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-4xl text-[#f4efe6]">Interview form</h1>
          <p className="mt-2 max-w-xl text-sm text-[#c5d2e4]">
            Keep the questions. The website interview asks the learner to describe three pictures. Turn those picture pages toward the learner. They have no answers.
          </p>
        </div>
        <PrintButton label="Print the form" />
      </div>

      <article className="sheet mx-auto max-w-[210mm] bg-white px-8 py-8 shadow-[0_16px_50px_rgba(36,54,82,0.08)]">
        <p className="text-xs tracking-[0.16em] text-[#a33b2b] uppercase">Part 2 · three pictures</p>
        <h2 className="font-serif text-3xl text-[#243652]">Speaking check</h2>
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          {["Learner", "Class", "Date"].map((field) => (
            <p key={field}>
              {field}
              <span className="mt-6 block border-b border-[#243652]" />
            </p>
          ))}
        </div>
        <p className="mt-4 text-sm">Do not correct. Do not ask for a repeat. While they are in the room, only tick the box and write the sentence.</p>
        <div className="mt-6 space-y-5">
          {phases.map((phase) => (
            <section key={phase.id}>
              <h3 className="font-medium">
                {phase.title}{" "}
                <span className="font-normal text-[#5c6570]">
                  · {phase.minutes}
                  {phase.scored ? "" : " · not scored"}
                </span>
              </h3>
              <ul className="mt-2 space-y-2">
                {phase.questions.map((question) => (
                  <li key={question.say} className="text-sm">
                    <p className="text-base font-semibold">{question.say}</p>
                    <p className="text-[#5c6570]">Backup: {question.backup}</p>
                    <p>Listen: {question.listen}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>

      <article className="sheet mx-auto max-w-[210mm] bg-white px-8 py-8 shadow-[0_16px_50px_rgba(36,54,82,0.08)]">
        <h2 className="font-serif text-3xl text-[#243652]">After the child leaves</h2>
        <div className="mt-4 space-y-4">
          {dimensions.map((dimension) => (
            <div key={dimension.id}>
              <p className="text-sm font-medium">{dimension.title}</p>
              <div className="mt-1 flex flex-wrap gap-3 text-sm">
                {dimension.levels.map((level) => (
                  <span key={level.score} className="inline-flex items-center gap-1">
                    <span className="inline-block size-4 rounded-full border border-[#243652]" />
                    {level.score} {level.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-3">
          {groups.map((group) => (
            <div key={group}>
              <p className="text-xs font-semibold tracking-wide text-[#5c6570] uppercase">{group}</p>
              <ul className="mt-1 space-y-1 text-sm">
                {errorCodes
                  .filter((code) => code.group === group)
                  .map((code) => (
                    <li key={code.id} className="flex items-start gap-2">
                      <span className="mt-0.5 inline-block size-3.5 shrink-0 border border-[#243652]" />
                      {code.label}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm">The child’s sentence</p>
        <div className="mt-2 h-16 border-b border-[#e3d8c8]" />
        <div className="mt-4 h-10 border-b border-[#e3d8c8]" />
      </article>

      {(["room", "classroom", "park"] as const).map((id, index) => (
        <article key={id} className="sheet mx-auto max-w-[210mm] bg-white px-8 py-8 shadow-[0_16px_50px_rgba(36,54,82,0.08)]">
          <p className="text-center font-serif text-3xl text-[#243652]">Look at the picture. {index + 1} of 3</p>
          <div className="mt-4 overflow-hidden rounded-xl border border-[#e3d8c8]">
            <ExamScene id={id} className="h-auto w-full" />
          </div>
        </article>
      ))}
    </div>
  )
}
