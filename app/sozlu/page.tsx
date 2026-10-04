import { OralPack } from "@/components/oral-pack"
import { PrintButton } from "@/components/print-button"
import { oralQuestionCount } from "@/lib/oral"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Oral exam" }

export default function OralPage() {
  return (
    <div className="space-y-6">
      <div className="no-print flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-4xl text-[#243652]">Oral exam</h1>
          <p className="mt-2 max-w-xl text-sm text-[#5c6570]">
            {oralQuestionCount} questions. The page the child sees has only the picture. Expected answers are on the teacher page.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="/pdf/junior-a1-teacher.pdf"
            className="inline-flex h-10 items-center rounded-full border border-[#243652] px-4 text-sm font-medium text-[#243652]"
          >
            Teacher copy PDF
          </a>
          <PrintButton label="Print the oral pack" />
        </div>
      </div>
      <p className="no-print text-sm text-[#5c6570]">
        The pictures sit inside the teacher copy, with the rubric and the key.{" "}
        <Link href="/pdf/junior-a1-teacher.pdf" className="underline">
          Teacher copy PDF
        </Link>
      </p>
      <OralPack />
    </div>
  )
}
