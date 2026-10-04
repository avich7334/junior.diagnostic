import { Picture } from "@/components/pictures"
import { itemsIn, sections } from "@/lib/content"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Answer key" }

export default function KeyPage() {
  return (
    <div className="space-y-10">
      <header className="max-w-2xl">
        <h1 className="font-serif text-4xl text-[#f4efe6]">Answer key</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#d5deea]">
          Do not let this reach the learner. Under each item is what a wrong option means.
          Write the letter they marked in the report. “Wrong” on its own does not name the error.
        </p>
      </header>
      {sections.map((section) => (
        <section key={section.id}>
          <h2 className="font-serif text-3xl text-[#f4efe6]">
            {section.task}. {section.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#c5d2e4]">{section.teacher}</p>
          <ul className="mt-4 space-y-4">
            {itemsIn(section.id).map((item) => (
              <li key={item.id} className="rounded-xl bg-white p-4 ring-1 ring-[#e3d8c8]">
                <div className="flex gap-3">
                  {item.picture ? (
                    <Picture name={item.picture} className="size-16 shrink-0" label={item.targetLabel} />
                  ) : null}
                  <div>
                    <p className="font-medium">
                      {item.number}. {item.section === "match" ? item.targetLabel : item.prompt}
                    </p>
                    <p className="text-sm text-[#1e5c48]">
                      Right: {item.choices.find((choice) => choice.id === item.answer)?.text}
                    </p>
                    <p className="mt-1 text-sm text-[#3d4654]">{item.why}</p>
                  </div>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-[#5c6570]">
                  {item.choices
                    .filter((choice) => choice.id !== item.answer)
                    .map((choice) => (
                      <li key={choice.id}>
                        <span className="font-medium text-[#1c2430]">
                          {choice.id}. {choice.text}.
                        </span>{" "}
                        {choice.note}
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
