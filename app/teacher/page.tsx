import { TeacherPack } from "@/components/teacher-pack"
import { PrintButton } from "@/components/print-button"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Teacher copy" }

export default function TeacherPage() {
  return (
    <div className="space-y-6">
      <div className="no-print flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-4xl text-[#243652]">Teacher copy</h1>
          <p className="mt-2 max-w-xl text-sm text-[#5c6570]">
            Commands, the full rubric, the answer key, and the describe-the-picture pages. The student copy is the paper only.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="/pdf/junior-a1-teacher.pdf"
            className="inline-flex h-10 items-center rounded-full border border-[#243652] px-4 text-sm font-medium text-[#243652]"
          >
            Download PDF
          </a>
          <PrintButton label="Print the teacher copy" />
        </div>
      </div>
      <TeacherPack />
    </div>
  )
}
