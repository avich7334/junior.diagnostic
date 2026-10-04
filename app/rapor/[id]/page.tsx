"use client"

import { ReportView } from "@/components/report-view"
import { PrintButton } from "@/components/print-button"
import { buttonVariants } from "@/components/ui/button"
import { deniz } from "@/lib/example"
import { deleteStudent, getStudent } from "@/lib/storage"
import type { StudentRecord } from "@/lib/types"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ReportPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [student, setStudent] = useState<StudentRecord | null | undefined>(undefined)
  const example = params.id === "ornek"

  useEffect(() => {
    if (example) {
      setStudent(deniz)
      return
    }
    setStudent(getStudent(params.id))
  }, [example, params.id])

  if (student === undefined) {
    return <p className="text-sm text-[#c5d2e4]">Opening the report…</p>
  }
  if (!student) {
    return (
      <div className="max-w-lg">
        <h1 className="font-serif text-4xl text-[#f4efe6]">This record is not here</h1>
        <p className="mt-3 text-sm text-[#c5d2e4]">
          Checks stay in this browser. They do not show on another device or in a private window.
        </p>
        <Link href="/sinif" className={cn(buttonVariants(), "mt-5 inline-flex h-11 px-4")}>
          Back to the class
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="no-print flex flex-wrap gap-2">
        <PrintButton label="Print the report" />
        {example ? null : (
          <Link
            href={`/uygula?id=${student.id}`}
            className={cn(buttonVariants({ variant: "outline" }), "h-10 px-4")}
          >
            Fix the marks
          </Link>
        )}
        <Link href="/sinif" className={cn(buttonVariants({ variant: "outline" }), "h-10 px-4")}>
          Class
        </Link>
      </div>
      <ReportView
        student={student}
        example={example}
        onDelete={
          example
            ? undefined
            : () => {
                if (!window.confirm("Delete this check?")) return
                deleteStudent(student.id)
                router.push("/sinif")
              }
        }
      />
    </div>
  )
}
