import {
  choiceNote,
  choiceText,
  dimensions,
  errorCodes,
  items,
  paperThemes,
  setLabels,
  themeGuides,
  themeOrder,
} from "@/lib/content"
import type {
  Band,
  DimensionId,
  Item,
  PaperMap,
  StudentRecord,
  Theme,
  VocabSet,
} from "@/lib/types"

export type ItemStatus = "right" | "wrong" | "blank" | "unmarked"

export type TriState = "both" | "speaking" | "paper" | "clear" | "no-evidence"

export type Priority = {
  theme: Theme
  title: string
  why: string
  action: string
  weight: number
}

export type SetResult = {
  set: VocabSet
  label: string
  right: number
  wrong: number
  blank: number
  unmarked: number
  total: number
  band: Band
  thin: boolean
  misses: string[]
}

export type ThemeRow = {
  theme: Theme
  title: string
  state: TriState
  detail: string
}

export type Report = {
  paper: {
    right: number
    wrong: number
    blank: number
    unmarked: number
    total: number
  }
  sections: {
    id: string
    title: string
    right: number
    wrong: number
    blank: number
    unmarked: number
    total: number
    band: Band
  }[]
  vocabSets: SetResult[]
  themes: ThemeRow[]
  speaking: {
    sum: number
    max: number
    scoredCount: number
    label: string | null
    complete: boolean
  }
  priorities: Priority[]
  overflow: Priority[]
  foundation: boolean
  summary: string[]
  itemViews: {
    item: Item
    status: ItemStatus
    chosenText: string | null
    note: string
  }[]
}

export function itemStatus(item: Item, paper: PaperMap): ItemStatus {
  const value = paper[item.id]
  if (value == null || value === "") return "unmarked"
  if (value === "blank") return "blank"
  return value === item.answer ? "right" : "wrong"
}

export function bandOf(right: number, wrong: number): Band {
  const answered = right + wrong
  if (answered === 0) return "unobserved"
  const ratio = right / answered
  if (ratio >= 0.75) return "secure"
  if (ratio >= 0.5) return "developing"
  return "gap"
}

export const bandLabel: Record<Band, string> = {
  gap: "Clear gap",
  developing: "Developing",
  secure: "Secure",
  unobserved: "Not seen",
}

export function speakingLabel(sum: number): string {
  if (sum <= 5) return "Below A1"
  if (sum <= 9) return "A1 threshold"
  if (sum <= 12) return "Secure A1"
  return "Top of this test"
}

const stateLead: Record<TriState, string> = {
  both: "It breaks on the paper and in speech.",
  speaking: "It breaks in speech. The paper check does not show it on its own.",
  paper: "Missed on the paper. This error is not ticked on the speaking form.",
  clear: "No problem on this check.",
  "no-evidence": "No evidence for this pattern.",
}

function rank(theme: Theme): number {
  const index = themeOrder.indexOf(theme)
  return index === -1 ? 99 : index
}

function themeState(
  theme: Theme,
  paper: PaperMap,
  errors: string[]
): TriState {
  const related = items.filter((item) => item.theme === theme)
  const speakingHit = errorCodes.some(
    (code) => code.theme === theme && errors.includes(code.id)
  )
  if (related.length === 0) {
    return speakingHit ? "speaking" : "clear"
  }
  const statuses = related.map((item) => itemStatus(item, paper))
  const anyWrong = statuses.includes("wrong")
  const anyRight = statuses.includes("right")
  const allBlankOrUnmarked = statuses.every(
    (status) => status === "blank" || status === "unmarked"
  )
  if (anyWrong && speakingHit) return "both"
  if (speakingHit && !anyWrong) return "speaking"
  if (anyWrong) return "paper"
  if (allBlankOrUnmarked) return "no-evidence"
  if (anyRight) return "clear"
  return "clear"
}

function weightFor(theme: Theme, state: TriState): number {
  if (state === "both") return 100
  if (state === "speaking") return 74
  if (state === "paper" && theme === "reading-time") return 52
  if (state === "paper") return 36
  return 0
}

function evidenceBits(theme: Theme, paper: PaperMap): string {
  const wrongs = items.filter(
    (item) => item.theme === theme && itemStatus(item, paper) === "wrong"
  )
  return wrongs
    .slice(0, 2)
    .map((item) => {
      const chosen = paper[item.id]
      const text = chosen ? choiceText(item, chosen) : ""
      const note = chosen ? choiceNote(item, chosen) : ""
      return `${item.prompt} → “${text}”. ${note}`
    })
    .join(" ")
}

function pronounExtra(paper: PaperMap): string {
  const she = items.find((item) => item.id === "g-she")
  const he = items.find((item) => item.id === "g-he")
  if (!she || !he) return ""
  if (paper[she.id] === "a" && paper[he.id] === "b") {
    return " Both are swapped: he for the girl, she for the boy."
  }
  if (
    itemStatus(she, paper) === "wrong" &&
    itemStatus(he, paper) === "wrong"
  ) {
    return " Both pronoun items are missed. A slip on one question is unlikely."
  }
  return ""
}

function setResults(paper: PaperMap): SetResult[] {
  const order: VocabSet[] = [
    "school",
    "animals",
    "food",
    "clothes",
    "home",
    "body",
    "actions",
    "weather",
    "family",
  ]
  return order.map((set) => {
    const group = items.filter((item) => item.set === set)
    let right = 0
    let wrong = 0
    let blank = 0
    let unmarked = 0
    const misses: string[] = []
    for (const item of group) {
      const status = itemStatus(item, paper)
      if (status === "right") right += 1
      if (status === "wrong") {
        wrong += 1
        misses.push(item.targetLabel)
      }
      if (status === "blank") blank += 1
      if (status === "unmarked") unmarked += 1
    }
    return {
      set,
      label: setLabels[set],
      right,
      wrong,
      blank,
      unmarked,
      total: group.length,
      band: bandOf(right, wrong),
      thin: group.length < 2,
      misses,
    }
  })
}

export function buildReport(student: StudentRecord): Report {
  const paper = student.paper
  const errors = student.errors
  let right = 0
  let wrong = 0
  let blank = 0
  let unmarked = 0
  const itemViews = items.map((item) => {
    const status = itemStatus(item, paper)
    if (status === "right") right += 1
    if (status === "wrong") wrong += 1
    if (status === "blank") blank += 1
    if (status === "unmarked") unmarked += 1
    const chosen = paper[item.id]
    return {
      item,
      status,
      chosenText:
        chosen && chosen !== "blank" ? choiceText(item, chosen) : null,
      note: chosen && chosen !== "blank" ? choiceNote(item, chosen) : "",
    }
  })

  const sections = [
    ["match", "Matching"],
    ["reading", "Reading"],
    ["context", "Word in a sentence"],
    ["grammar", "Grammar check"],
  ].map(([id, title]) => {
    const group = itemViews.filter((view) => view.item.section === id)
    const tally = { right: 0, wrong: 0, blank: 0, unmarked: 0 }
    for (const view of group) tally[view.status] += 1
    return {
      id,
      title,
      ...tally,
      total: group.length,
      band: bandOf(tally.right, tally.wrong),
    }
  })

  const vocabSets = setResults(paper)
  const floorWrong = items.filter(
    (item) => item.floor && itemStatus(item, paper) === "wrong"
  )
  const foundation = floorWrong.length >= 3

  const themes: ThemeRow[] = paperThemes.map((theme) => {
    const state = themeState(theme, paper, errors)
    const extra = theme === "pronoun" ? pronounExtra(paper) : ""
    const bits = evidenceBits(theme, paper)
    return {
      theme,
      title: themeGuides[theme].title,
      state,
      detail: [stateLead[state], bits, extra].filter(Boolean).join(" "),
    }
  })

  const priorities: Priority[] = []

  if (foundation) {
    priorities.push({
      theme: "foundation",
      title: themeGuides.foundation.title,
      weight: 120,
      why: `${floorWrong.length} floor items missed: ${floorWrong
        .map((item) => item.targetLabel)
        .join(", ")}. Higher patterns are not this week's work.`,
      action: themeGuides.foundation.action,
    })
  }

  for (const theme of paperThemes) {
    const state = themeState(theme, paper, errors)
    const weight = weightFor(theme, state)
    if (weight === 0) continue
    const extra = theme === "pronoun" ? pronounExtra(paper) : ""
    const bits = evidenceBits(theme, paper)
    priorities.push({
      theme,
      title: themeGuides[theme].title,
      weight,
      why: [stateLead[state], bits, extra].filter(Boolean).join(" "),
      action: themeGuides[theme].action,
    })
  }

  const vocabItems = items.filter((item) => item.set)
  const coreWrong = vocabItems.filter(
    (item) => !item.stretch && itemStatus(item, paper) === "wrong"
  )
  const stretchWrong = vocabItems.filter(
    (item) => item.stretch && itemStatus(item, paper) === "wrong"
  )
  const gapSets = vocabSets.filter((set) => set.total >= 2 && set.band === "gap")
  const silent = errors.includes("voc-silent")
  const single = errors.includes("voc-single")
  const vocabScore = student.speaking.vocabulary

  if (gapSets.length > 0) {
    const names = gapSets.map((set) => set.label.toLocaleLowerCase("en")).join(", ")
    priorities.push({
      theme: "vocab",
      title: `Word set: ${gapSets.map((set) => set.label).join(", ")}`,
      weight: silent ? 92 : 66,
      why: silent
        ? `Words do not come in speech. The paper sets are weak too: ${names}.`
        : `Fewer than half of the answered items are right: ${names}.`,
      action: `${themeGuides.vocab.action} Start with ${names}.`,
    })
  } else if (silent) {
    priorities.push({
      theme: "vocab",
      title: "Words do not come",
      weight: 78,
      why: "Words drop in speech, or the learner switches to Turkish. The paper sets may not explain this on their own.",
      action: themeGuides.vocab.action,
    })
  } else if (coreWrong.length === 0 && stretchWrong.length > 0) {
    priorities.push({
      theme: "vocab",
      title: "Edge words",
      weight: 30,
      why: `The core words hold. The misses are at the edge of the set: ${stretchWrong
        .map((item) => item.targetLabel)
        .join(", ")}.`,
      action:
        "Not a panic item. Add these words to the next word list. Do not stop a new unit for them.",
    })
  } else if (single && vocabScore !== null && vocabScore <= 1) {
    priorities.push({
      theme: "vocab",
      title: "One word",
      weight: 40,
      why: "Speech stops at one word. There is no phrase: red apple, on the chair.",
      action: themeGuides.vocab.action,
    })
  }

  const reading = itemViews.filter((view) => view.item.section === "reading")
  const readingRight = reading.filter((view) => view.status === "right").length
  const readingMiss = reading.filter(
    (view) => view.status === "wrong" || view.status === "blank"
  ).length
  const readingUnmarked = reading.filter((view) => view.status === "unmarked").length
  const detailWrong = reading.filter(
    (view) =>
      view.item.theme === "reading-detail" && view.status === "wrong"
  ).length

  if (readingRight === 0 && readingMiss >= 4 && readingUnmarked === 0) {
    priorities.push({
      theme: "reading-detail",
      title: "The text is blank or unread",
      weight: 82,
      why: "No reading item is right. They may have run out of time, or they may not be able to read it. Do not set pattern homework until you can tell those apart.",
      action: themeGuides["reading-detail"].action,
    })
  } else if (detailWrong >= 2) {
    priorities.push({
      theme: "reading-detail",
      title: themeGuides["reading-detail"].title,
      weight: 32,
      why: "A few of the age, colour, or who-she-lives-with items are missed. This is finding the line, not making an inference.",
      action: themeGuides["reading-detail"].action,
    })
  }

  const pronunciation = student.speaking.pronunciation
  const soundTicked = errorCodes.some(
    (code) => code.theme === "pronunciation" && errors.includes(code.id)
  )
  if (soundTicked && (pronunciation === null || pronunciation <= 1)) {
    priorities.push({
      theme: "pronunciation",
      title: themeGuides.pronunciation.title,
      weight: 48,
      why: "A sound error is blocking the meaning. This priority does not appear if you can understand them.",
      action: themeGuides.pronunciation.action,
    })
  }

  const interaction = student.speaking.interaction
  if (
    (interaction !== null && interaction <= 1) ||
    errors.includes("int-noreask")
  ) {
    priorities.push({
      theme: "interaction",
      title: themeGuides.interaction.title,
      weight: 44,
      why: errors.includes("int-noreask")
        ? "No question of their own, or they repeated the model."
        : "The interaction score is low.",
      action: themeGuides.interaction.action,
    })
  }

  const communication = student.speaking.communication
  if (communication !== null && communication <= 1) {
    priorities.push({
      theme: "communication",
      title: themeGuides.communication.title,
      weight: 42,
      why: "Most questions stayed unanswered, or the learner switched to Turkish.",
      action: themeGuides.communication.action,
    })
  }

  priorities.sort((a, b) => b.weight - a.weight || rank(a.theme) - rank(b.theme))

  const suppress = new Set<Theme>(["third", "there", "can", "prep", "reading-time"])
  const list = foundation
    ? priorities.filter(
        (priority) =>
          priority.theme === "foundation" || !suppress.has(priority.theme)
      )
    : priorities

  const top = list.slice(0, 3)
  const overflow = list.slice(3).filter((priority) => priority.weight >= 74)

  const scored = dimensions
    .map((dimension) => student.speaking[dimension.id])
    .filter((score): score is number => score !== null)
  const sum = scored.reduce((total, score) => total + score, 0)
  const speaking = {
    sum,
    max: scored.length * 3,
    scoredCount: scored.length,
    label: scored.length === 5 ? speakingLabel(sum) : null,
    complete: scored.length === 5,
  }

  const summary: string[] = []
  if (unmarked === items.length) {
    summary.push(
      "The paper was not marked. Priorities rest on speech only."
    )
  } else {
    const be = (count: number) => (count === 1 ? "is" : "are")
    summary.push(
      `On the paper, ${right} of ${items.length} items ${be(right)} right and ${wrong} ${be(wrong)} wrong${
        blank ? `, and ${blank} ${be(blank)} blank` : ""
      }. Blank items do not enter the percentage.`
    )
  }
  if (speaking.complete && speaking.label) {
    summary.push(
      `Speech ${speaking.sum}/15: ${speaking.label}. This is not a report-card mark. It names where they stand inside A1.`
    )
  } else if (speaking.scoredCount === 0) {
    summary.push("Speech was not scored.")
  } else {
    summary.push(
      `${speaking.scoredCount} speaking dimensions were scored. Missing dimensions were not added in.`
    )
  }
  if (foundation) {
    summary.push(
      "Floor words are being missed. 3rd-person -s, there are, and prepositions are not this learner's work this week."
    )
  }
  if (top[0]) {
    summary.push(`First job: ${top[0].title}.`)
  } else {
    summary.push(
      "No urgent gap stood out on this check. The next step is to add one word to a sentence in speech, and to have them ask one question every lesson."
    )
  }

  return {
    paper: { right, wrong, blank, unmarked, total: items.length },
    sections,
    vocabSets,
    themes,
    speaking,
    priorities: top,
    overflow,
    foundation,
    summary,
    itemViews,
  }
}

export function classPortrait(students: StudentRecord[]) {
  const rows = students.map((student) => ({
    student,
    report: buildReport(student),
  }))
  const counts = new Map<string, number>()
  for (const code of errorCodes) counts.set(code.id, 0)
  for (const row of rows) {
    for (const error of row.student.errors) {
      counts.set(error, (counts.get(error) ?? 0) + 1)
    }
  }
  const topErrors = errorCodes
    .map((code) => ({ ...code, count: counts.get(code.id) ?? 0 }))
    .filter((code) => code.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const shared = paperThemes
    .map((theme) => {
      const hits = rows.filter((row) => {
        const found = row.report.themes.find((item) => item.theme === theme)
        return found?.state === "both" || found?.state === "speaking"
      }).length
      return { theme, title: themeGuides[theme].title, hits }
    })
    .filter((theme) => theme.hits >= 2 && theme.hits * 2 >= rows.length)
    .sort((a, b) => b.hits - a.hits || rank(a.theme) - rank(b.theme))

  return { rows, topErrors, shared }
}

export function formatDate(iso: string): string {
  const date = new Date(iso)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

export const dimensionIds: DimensionId[] = dimensions.map((dimension) => dimension.id)
