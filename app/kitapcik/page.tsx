import { Booklet } from "@/components/booklet"
import { PrintButton } from "@/components/print-button"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Booklet" }

export default function BookletPage() {
  return (
    <div className="space-y-6">
      <div className="no-print flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-4xl text-[#f4efe6]">Student booklet</h1>
          <p className="mt-2 max-w-xl text-sm text-[#c5d2e4]">
            The paper the class sits. Name, class, and date at the top. The answers are not on this page.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="/pdf/junior-a1-student.pdf"
            className="inline-flex h-10 items-center rounded-full border border-[#f4efe6] px-4 text-sm font-medium text-[#f4efe6]"
          >
            Student copy PDF
          </a>
          <PrintButton label="Print the booklet" />
        </div>
      </div>
      <Booklet />
    </div>
  )
}
