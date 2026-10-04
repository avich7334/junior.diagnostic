export type Band = "gap" | "developing" | "secure" | "unobserved"

export type VocabSet =
  | "school"
  | "animals"
  | "food"
  | "clothes"
  | "home"
  | "body"
  | "actions"
  | "weather"
  | "family"

export type SectionId = "match" | "reading" | "context" | "grammar"

export type Theme =
  | "foundation"
  | "pronoun"
  | "be"
  | "third"
  | "plural"
  | "article"
  | "there"
  | "can"
  | "prep"
  | "question"
  | "negation"
  | "vocab"
  | "reading-time"
  | "reading-detail"
  | "pronunciation"
  | "interaction"
  | "communication"

export type PictureId =
  | "rabbit"
  | "window"
  | "book"
  | "bread"
  | "dress"
  | "foot"
  | "swim"
  | "rain"
  | "grandmother"
  | "ruler"
  | "shoes"
  | "breakfast"
  | "bed"
  | "bird"
  | "pencil"
  | "snow"
  | "apple"
  | "two-cats"
  | "cat-in-box"
  | "maya"

export type Choice = {
  id: string
  text: string
  note: string
}

export type Item = {
  id: string
  section: SectionId
  number: number
  prompt: string
  picture?: PictureId
  choices: Choice[]
  answer: string
  target: string
  targetLabel: string
  theme: Theme | null
  set?: VocabSet
  floor?: boolean
  stretch?: boolean
  why: string
}

export type DimensionId =
  | "communication"
  | "vocabulary"
  | "grammar"
  | "pronunciation"
  | "interaction"

export type SpeakingScores = Record<DimensionId, number | null>

export type PaperMap = Record<string, string | "blank">

export type StudentRecord = {
  id: string
  name: string
  className: string
  createdAt: string
  mode: "paper" | "screen"
  paper: PaperMap
  speaking: SpeakingScores
  errors: string[]
  evidence: string
  notes: string
}
