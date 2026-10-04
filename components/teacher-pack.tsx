import { OralPack } from "@/components/oral-pack"
import { Picture } from "@/components/pictures"
import {
  dimensions,
  errorCodes,
  itemsIn,
  part1Script,
  sections,
  themeGuides,
  themeOrder,
} from "@/lib/content"
import { cn } from "@/lib/utils"

function Sheet({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <article
      className={cn(
        "sheet mx-auto box-border w-full max-w-[210mm] bg-white text-[#1c2430] shadow-[0_16px_50px_rgba(36,54,82,0.08)] print:max-w-none print:shadow-none",
        className
      )}
    >
      <div className="h-2 bg-[#243652]" />
      <div className="px-6 py-4 sm:px-8">{children}</div>
    </article>
  )
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.16em] text-[#a33b2b] uppercase">{children}</p>
  )
}

export function TeacherPack() {
  const groups = ["Vocabulary", "Grammar", "Pronunciation", "Interaction"] as const

  return (
    <div className="space-y-8 print:space-y-0">
      <Sheet>
        <Kicker>Teacher copy · keep this file</Kicker>
        <h1 className="font-serif text-4xl text-[#243652]">Junior A1 check</h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed">
          Ages 9–10. This is not a mark and not a certificate. The student copy is the paper only.
          This copy has the commands, the rubric, the answer key, and the pictures.
        </p>
        <h2 className="mt-4 font-serif text-2xl text-[#243652]">On the day</h2>
        <ol className="mt-2 space-y-1 text-sm leading-snug">
          <li>1. Give out the student copy, or open Run on a tablet. Read the script below once. Do not translate it.</li>
          <li>2. Twenty-five minutes. If they ask “What does this mean?”, say “You can leave it blank.”</li>
          <li>3. Collect the papers. Do not say a mark. On the key, write the letter they marked. Right or wrong on its own does not name the error.</li>
          <li>4. One learner at a time, 6–8 minutes. Hello. Sit down, please. Do not score the greeting.</li>
          <li>5. On the website, the interview shows three pictures in a row: the living room, the classroom, and the park. Ask the questions on the screen for each one. On paper, ask 4–6 warm-up questions, then one picture, A to F. Put only that picture’s show page in front of the child. Ask 8–10 of its questions. Add at most two from the any-picture bank. Rotate A to F so children who sit together do not describe the same picture.</li>
          <li>6. End with “Now you ask me a question.” Thank them. They go back to class.</li>
          <li>7. After they leave, mark the rubric. Do not give the score in the room.</li>
        </ol>
        <h2 className="mt-4 font-serif text-2xl text-[#243652]">Do not do this in the room</h2>
        <ul className="mt-2 space-y-1 text-sm leading-snug">
          <li>Do not finish the sentence. Do not whisper the right pronoun. Do not correct.</li>
          <li>Do not ask for a full sentence. Nine is a relevant answer.</li>
          <li>After thirty seconds of silence, use the backup once, then move on. After two backups, leave that phase.</li>
          <li>If they switch to Turkish, say “in English?” once. The second time, note it and move on.</li>
          <li>If you gave a model, the interaction score is 1 at most.</li>
          <li>Do not read a listen note or this key out loud.</li>
        </ul>
        <h2 className="mt-4 font-serif text-2xl text-[#243652]">What you read for the paper</h2>
        <p className="mt-2 text-sm leading-relaxed">{part1Script}</p>
      </Sheet>

      <Sheet>
        <Kicker>How to read the result</Kicker>
        <h2 className="font-serif text-3xl text-[#243652]">A gap is a priority only in both places</h2>
        <ul className="mt-3 space-y-2 text-sm leading-snug">
          <li>Secure: at least 75% of the answered items. Developing: 50–74%. Clear gap: below that. A blank stays out of the percentage. They may have run out of time.</li>
          <li>A pattern is a priority when it breaks on the paper and in speech. One side alone is not yet a confirmed gap. Keep the top three. Do not put every miss into the same week.</li>
          <li>Floor items: book, rain, shoes, bird, pencil, bed, I am / age, can. If three or more of these are wrong, teach floor words first. Delay 3rd-person -s, there is/are, can as a new pattern, in/on/under, and the time phrase.</li>
          <li>Do not claim mastery from one item. A one-item word set is thin: widen it if speech misses it too. Do not change the unit on a single miss.</li>
          <li>A miss that only appears on a stretch item is a low priority. Pronunciation is a priority only at 0 or 1. Interaction is a priority at 0 or 1, or when they cannot ask.</li>
          <li>After three learners, a shared gap opens the class lesson. It is not individual homework.</li>
          <li>Speech total, when all five dimensions are scored: 0–5 below A1, 6–9 A1 threshold, 10–12 secure A1, 13–15 top of this test. This is not a report-card mark.</li>
        </ul>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          {["Learner", "Class", "Date"].map((field) => (
            <label key={field} className="block">
              <span className="text-[#5c6570]">{field}</span>
              <span className="mt-1 block border-b border-[#243652]">&nbsp;</span>
            </label>
          ))}
        </div>
        <p className="mt-3 text-sm">
          Paper right ____ / 32 · blank ____ · Speech ____ / 15 · Picture used: A B C D E F
        </p>
      </Sheet>

      <Sheet>
        <Kicker>Rubric · mark after they leave</Kicker>
        <h2 className="font-serif text-3xl text-[#243652]">0 to 3 on five dimensions</h2>
        <p className="mt-1 text-sm text-[#5c6570]">
          Press the box closest to what you saw. Do not average two boxes. An accent is fine if you understood them.
        </p>
        <div className="mt-3 space-y-3">
          {dimensions.map((dimension) => (
            <section key={dimension.id} className="break-inside-avoid">
              <h3 className="text-sm font-semibold text-[#243652]">
                {dimension.title}
                <span className="ml-2 font-normal text-[#5c6570]">{dimension.question}</span>
              </h3>
              <ul className="mt-1 space-y-0.5">
                {dimension.levels.map((level) => (
                  <li key={level.score} className="grid grid-cols-[1.4rem_1fr] gap-2 text-[12px] leading-tight">
                    <span className="grid size-5 place-items-center rounded-full border border-[#243652] text-[11px] font-semibold">
                      {level.score}
                    </span>
                    <p>
                      <span className="font-semibold">{level.label}. </span>
                      {level.text}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Sheet>

      <Sheet>
        <Kicker>Tick it if you hear it</Kicker>
        <h2 className="font-serif text-3xl text-[#243652]">Error list</h2>
        <p className="mt-1 text-sm text-[#5c6570]">
          Tick during the interview. Add anything you missed after they leave. A tick is what you heard, not a guess from the paper.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {groups.map((group) => (
            <section key={group}>
              <h3 className="text-xs font-semibold tracking-wide text-[#5c6570] uppercase">{group}</h3>
              <ul className="mt-1 space-y-1">
                {errorCodes
                  .filter((code) => code.group === group)
                  .map((code) => (
                    <li key={code.id} className="flex items-start gap-2 text-[12px] leading-tight">
                      <span className="mt-0.5 inline-block size-3.5 shrink-0 border border-[#243652]" />
                      {code.label}
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-4 text-sm font-medium">The child’s sentence, as said</p>
        <div className="mt-2 h-14 border-b border-[#e3d8c8]" />
        <div className="mt-3 h-8 border-b border-[#e3d8c8]" />
        <p className="mt-4 text-sm font-medium">Note for yourself</p>
        <div className="mt-2 h-10 border-b border-[#e3d8c8]" />
      </Sheet>

      <Sheet>
        <Kicker>What to teach next</Kicker>
        <h2 className="font-serif text-3xl text-[#243652]">One job, then the next</h2>
        <p className="mt-1 mb-2 text-sm text-[#5c6570]">
          Use the action that matches the priority. Do not run all of these in one week.
        </p>
        <ul className="space-y-1.5">
          {themeOrder.map((theme) => (
            <li key={theme} className="break-inside-avoid text-[12px] leading-snug">
              <span className="font-semibold text-[#243652]">{themeGuides[theme].title}. </span>
              {themeGuides[theme].action}
            </li>
          ))}
        </ul>
      </Sheet>

      {sections.map((section) => (
        <Sheet key={section.id}>
          <Kicker>Answer key · do not show the learner</Kicker>
          <h2 className="font-serif text-3xl text-[#243652]">
            {section.task}. {section.title}
          </h2>
          <p className="mt-1 mb-2 text-sm leading-snug text-[#5c6570]">
            {section.teacher}
            {section.id === "match"
              ? " A letter that is not listed under the item means they named the picture with that word. The picture and the word are not separate yet."
              : ""}
          </p>
          <ul className="divide-y divide-[#efe6d6]">
            {itemsIn(section.id).map((item) => {
              const right = item.choices.find((choice) => choice.id === item.answer)
              return (
                <li key={item.id} className="grid grid-cols-[2.4rem_1fr] gap-2 py-1 break-inside-avoid">
                  {item.picture ? (
                    <Picture name={item.picture} className="size-9" label={item.targetLabel} />
                  ) : (
                    <span />
                  )}
                  <div className="min-w-0 text-[12px] leading-snug">
                    <p>
                      <span className="font-semibold">
                        {item.number}. {item.section === "match" ? item.targetLabel : item.prompt}
                      </span>{" "}
                      <span className="text-[#1e5c48]">Right: {right?.text}</span>
                      {item.floor ? <span className="text-[#8a5a12]"> · floor</span> : null}
                    </p>
                    <p className="text-[#3d4654]">{item.why}</p>
                    {item.choices
                      .filter(
                        (choice) =>
                          choice.id !== item.answer &&
                          !choice.note.startsWith("Read the picture as ")
                      )
                      .map((choice) => (
                        <p key={choice.id} className="text-[#5c6570]">
                          <span className="font-medium text-[#1c2430]">
                            {choice.id}. {choice.text}.
                          </span>{" "}
                          {choice.note}
                        </p>
                      ))}
                  </div>
                </li>
              )
            })}
          </ul>
        </Sheet>
      ))}

      <OralPack />
    </div>
  )
}
