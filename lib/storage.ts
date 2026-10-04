import { emptySpeakingScores } from "@/lib/example"
import type { DimensionId, StudentRecord } from "@/lib/types"

const KEY = "junior-a1-tani-v1"

const dimensionIds: DimensionId[] = [
  "communication",
  "vocabulary",
  "grammar",
  "pronunciation",
  "interaction",
]

function isRecord(value: unknown): value is StudentRecord {
  if (!value || typeof value !== "object") return false
  const record = value as StudentRecord
  return (
    typeof record.id === "string" &&
    typeof record.name === "string" &&
    record.paper !== null &&
    typeof record.paper === "object" &&
    record.speaking !== null &&
    typeof record.speaking === "object"
  )
}

function normalize(record: StudentRecord): StudentRecord {
  const speaking = emptySpeakingScores()
  for (const id of dimensionIds) {
    const score = record.speaking?.[id]
    speaking[id] = typeof score === "number" ? score : null
  }
  return {
    id: record.id,
    name: record.name,
    className: record.className ?? "",
    createdAt: record.createdAt ?? new Date().toISOString(),
    mode: record.mode === "screen" ? "screen" : "paper",
    paper: record.paper ?? {},
    speaking,
    errors: Array.isArray(record.errors) ? record.errors.filter((id) => typeof id === "string") : [],
    evidence: record.evidence ?? "",
    notes: record.notes ?? "",
  }
}

export function parseStudents(input: unknown): StudentRecord[] {
  if (!Array.isArray(input)) return []
  return input.filter(isRecord).map(normalize)
}

export function loadStudents(): StudentRecord[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return parseStudents(JSON.parse(raw))
  } catch {
    return []
  }
}

export function saveStudents(students: StudentRecord[]) {
  localStorage.setItem(KEY, JSON.stringify(students))
}

export function upsertStudent(student: StudentRecord) {
  const students = loadStudents().filter((item) => item.id !== student.id)
  students.unshift(student)
  saveStudents(students)
}

export function deleteStudent(id: string) {
  saveStudents(loadStudents().filter((student) => student.id !== id))
}

export function getStudent(id: string): StudentRecord | null {
  return loadStudents().find((student) => student.id === id) ?? null
}

export function newStudent(partial: Pick<StudentRecord, "name" | "className" | "mode">): StudentRecord {
  return {
    id: crypto.randomUUID(),
    name: partial.name.trim(),
    className: partial.className.trim(),
    createdAt: new Date().toISOString(),
    mode: partial.mode,
    paper: {},
    speaking: emptySpeakingScores(),
    errors: [],
    evidence: "",
    notes: "",
  }
}
