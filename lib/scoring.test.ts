import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { errorCodes, items, phases } from "./content"
import { can, deniz, ece, paperFrom } from "./example"
import { buildReport, itemStatus, speakingLabel } from "./scoring"
import type { StudentRecord } from "./types"

function base(overrides: Partial<StudentRecord> = {}): StudentRecord {
  return {
    id: "t",
    name: "Test",
    className: "4-A",
    createdAt: "2026-10-03T09:00:00.000Z",
    mode: "paper",
    paper: paperFrom(),
    speaking: {
      communication: 3,
      vocabulary: 3,
      grammar: 3,
      pronunciation: 3,
      interaction: 3,
    },
    errors: [],
    evidence: "",
    notes: "",
    ...overrides,
  }
}

describe("diagnostic report", () => {
  it("keeps every answer inside its choices and every phase error real", () => {
    const ids = new Set(errorCodes.map((code) => code.id))
    for (const item of items) {
      assert.ok(item.choices.some((choice) => choice.id === item.answer), item.id)
    }
    for (const phase of phases) {
      for (const id of phase.errorIds) assert.ok(ids.has(id), id)
    }
  })

  it("reads Deniz as a mid-A1 grammar profile", () => {
    const report = buildReport(deniz)
    assert.equal(report.paper.right, 18)
    assert.equal(report.paper.wrong, 13)
    assert.equal(report.paper.blank, 1)
    assert.deepEqual(
      report.priorities.map((priority) => priority.theme),
      ["pronoun", "third", "plural"]
    )
    assert.equal(report.speaking.label, "A1 threshold")
    assert.equal(report.speaking.sum, 8)
    assert.equal(
      report.themes.find((theme) => theme.theme === "pronoun")?.state,
      "both"
    )
    assert.equal(report.foundation, false)
    const swim = report.itemViews.find((view) => view.item.id === "m-swim")
    assert.equal(swim?.status, "blank")
    assert.equal(
      report.vocabSets.find((set) => set.set === "actions")?.band,
      "unobserved"
    )
    assert.ok(report.overflow.some((priority) => priority.theme === "article"))
  })

  it("puts foundation ahead of grammar when floor words collapse", () => {
    const report = buildReport(ece)
    assert.equal(report.foundation, true)
    assert.deepEqual(
      report.priorities.map((priority) => priority.theme),
      ["foundation", "pronoun", "vocab"]
    )
    assert.ok(!report.priorities.some((priority) => priority.theme === "third"))
  })

  it("keeps a fluent student on the pronoun gap only", () => {
    const report = buildReport(can)
    assert.deepEqual(
      report.priorities.map((priority) => priority.theme),
      ["pronoun"]
    )
    assert.equal(report.speaking.label, "Secure A1")
  })

  it("stays quiet when the paper and the interview are secure", () => {
    const report = buildReport(base())
    assert.equal(report.priorities.length, 0)
    assert.equal(report.paper.right, items.length)
    assert.equal(speakingLabel(15), "Top of this test")
  })

  it("treats a spoken pronoun error as speaking-only when the paper is right", () => {
    const report = buildReport(base({ errors: ["gr-heshe"] }))
    assert.equal(
      report.themes.find((theme) => theme.theme === "pronoun")?.state,
      "speaking"
    )
    assert.equal(report.priorities[0]?.theme, "pronoun")
  })

  it("does not count a blank as wrong", () => {
    const swim = items.find((item) => item.id === "m-swim")
    assert.ok(swim)
    assert.equal(itemStatus(swim, { "m-swim": "blank" }), "blank")
    assert.equal(itemStatus(swim, {}), "unmarked")
  })
})
