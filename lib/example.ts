import { items } from "@/lib/content"
import type { PaperMap, SpeakingScores, StudentRecord } from "@/lib/types"

export function paperFrom(overrides: PaperMap = {}): PaperMap {
  const paper: PaperMap = {}
  for (const item of items) {
    paper[item.id] = overrides[item.id] ?? item.answer
  }
  return paper
}

export function blankPaper(): PaperMap {
  const paper: PaperMap = {}
  for (const item of items) paper[item.id] = "blank"
  return paper
}

const emptySpeaking = {
  communication: null,
  vocabulary: null,
  grammar: null,
  pronunciation: null,
  interaction: null,
}

export const deniz: StudentRecord = {
  id: "ornek",
  name: "Deniz Kaya",
  className: "4-A",
  createdAt: "2026-10-03T09:30:00.000Z",
  mode: "paper",
  paper: paperFrom({
    "m-foot": "D",
    "m-swim": "blank",
    "m-grandmother": "H",
    "m-ruler": "C",
    "v-snow": "a",
    "r-neg": "a",
    "r-sunday": "a",
    "g-an": "a",
    "g-plural": "a",
    "g-she": "a",
    "g-he": "b",
    "g-3sg": "a",
    "g-there": "a",
    "g-question": "b",
  }),
  speaking: {
    communication: 2,
    vocabulary: 2,
    grammar: 1,
    pronunciation: 2,
    interaction: 1,
  },
  errors: [
    "gr-heshe",
    "gr-article",
    "gr-plural",
    "gr-3sg",
    "gr-there",
    "gr-dont",
    "voc-single",
    "int-noreask",
    "pr-final",
  ],
  evidence:
    "I am nine. I am fine. My family mother, father, sister. I like apple. No like fish. After school football. Cat… on chair. Ball table. Boy book. Question: after the model, What's your name?",
  notes:
    "Quiet on the first two questions, then opened up on family. Pointed at the cat at once and did not build the sentence.",
}

export const ece: StudentRecord = {
  id: "demo-ece",
  name: "Ece Yilmaz",
  className: "4-A",
  createdAt: "2026-10-03T09:42:00.000Z",
  mode: "paper",
  paper: {
    ...blankPaper(),
    "m-book": "A",
    "m-rain": "C",
    "m-rabbit": "G",
    "m-bread": "I",
    "v-shoes": "b",
    "v-bird": "a",
    "g-she": "a",
    "g-he": "b",
    "g-can": "a",
  },
  speaking: {
    communication: 1,
    vocabulary: 0,
    grammar: 0,
    pronunciation: 1,
    interaction: 0,
  },
  errors: ["voc-silent", "int-l1", "int-noreask", "pr-final", "gr-heshe"],
  evidence: "Nine. Mum. (then Turkish) He my mother.",
  notes: "Left half the booklet blank. Went silent when it got hard.",
}

export const can: StudentRecord = {
  id: "demo-can",
  name: "Can Demir",
  className: "4-A",
  createdAt: "2026-10-03T09:51:00.000Z",
  mode: "paper",
  paper: paperFrom({
    "g-she": "a",
    "g-he": "b",
  }),
  speaking: {
    communication: 2,
    vocabulary: 3,
    grammar: 1,
    pronunciation: 3,
    interaction: 2,
  },
  errors: ["gr-heshe"],
  evidence:
    "I'm nine. I live with my mum and my dad. I like pizza. I don't like fish. The cat is on the chair. The ball is under the table. He is reading. What's your favourite colour?",
  notes: "Fluent. A1 patterns hold apart from the pronoun. Said he for a sister.",
}

export const demoClass: StudentRecord[] = [
  { ...deniz, id: "demo-deniz" },
  ece,
  can,
]

export function emptySpeakingScores(): SpeakingScores {
  return { ...emptySpeaking }
}
