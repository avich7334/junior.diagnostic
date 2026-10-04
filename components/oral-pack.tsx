import { ExamScene } from "@/components/exam-scenes"
import { dimensions } from "@/lib/content"
import { anyPicture, oralQuestionCount, scenes, warmUp, type OralQuestion } from "@/lib/oral"
import { cn } from "@/lib/utils"
import { Fragment } from "react"

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
      <div className="px-6 py-5 sm:px-8">{children}</div>
    </article>
  )
}

function QuestionList({ items }: { items: OralQuestion[] }) {
  return (
    <ol className="divide-y divide-[#efe6d6]">
      {items.map((question, index) => (
        <li key={`${question.say}-${index}`} className="grid grid-cols-[1.4rem_1fr] gap-x-2 py-1 break-inside-avoid print:py-0.5">
          <span className="pt-0.5 text-xs font-semibold text-[#a33b2b]">{index + 1}</span>
          <div className="min-w-0 text-[12px] leading-tight">
            <p className="font-semibold text-[#243652]">{question.say}</p>
            <p>
              <span className="text-[#5c6570]">Expected: </span>
              {question.expected}
            </p>
            {question.backup ? (
              <p>
                <span className="text-[#5c6570]">Backup: </span>
                {question.backup}
              </p>
            ) : null}
            <p>
              <span className="text-[#5c6570]">Listen: </span>
              {question.listen}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function OralPack() {
  return (
    <div className="space-y-8 print:space-y-0">
      <Sheet>
        <p className="text-xs font-semibold tracking-[0.16em] text-[#a33b2b] uppercase">Teacher copy</p>
        <h1 className="font-serif text-4xl text-[#243652]">Oral check · Describe the picture</h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed">
          {oralQuestionCount} questions. Do not ask all of them to one child. A learner warms up, then sees one picture.
          Rotate the pictures from A to F. Two children who sit together do not describe the same picture.
        </p>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          {["Name", "Class", "Date"].map((field) => (
            <label key={field} className="block">
              <span className="text-[#5c6570]">{field}</span>
              <span className="mt-1 block border-b border-[#243652]">&nbsp;</span>
            </label>
          ))}
        </div>
        <ol className="mt-5 space-y-1.5 text-sm leading-relaxed">
          <li>1. Hello. Sit down, please. Do not score the greeting. Then ask 4–6 warm-up questions. About two minutes. Do not ask all of them. Use a backup only after silence.</li>
          <li>2. Choose one picture. Put only that picture’s “look” page in front of the child. Keep this page.</li>
          <li>3. Ask 8–10 questions about that picture. The list does not have to be finished. Stop if the child gets tired.</li>
          <li>4. Add at most two questions from the “any picture” bank.</li>
          <li>5. Do not correct, finish the sentence, or demand a full sentence. Nine is a relevant answer.</li>
          <li>6. After thirty seconds of silence, move to the next question. If they switch to Turkish, say “in English?” once.</li>
        </ol>
        <div className="mt-5">
          <p className="text-sm font-semibold text-[#243652]">After the child leaves, 0–3</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-5">
            {dimensions.map((dimension) => (
              <div key={dimension.id} className="rounded-lg border border-[#e3d8c8] px-2 py-2">
                <p className="text-xs font-semibold">{dimension.title}</p>
                <p className="mt-1 flex gap-2 text-sm">
                  {[0, 1, 2, 3].map((score) => (
                    <span key={score} className="grid size-6 place-items-center rounded-full border border-[#243652]">
                      {score}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-[#5c6570]">
            0 lost · 1 struggling · 2 it works · 3 ready. The full level text is on the rubric pages at the front of the teacher copy. Mark it after the child leaves.
          </p>
        </div>
        <p className="mt-4 text-sm">
          Picture used: {scenes.map((scene) => `${scene.code} ${scene.title}`).join(" · ")}
        </p>
      </Sheet>

      <Sheet>
        <p className="text-xs font-semibold tracking-[0.16em] text-[#a33b2b] uppercase">Warm-up · not all of them</p>
        <h2 className="font-serif text-3xl text-[#243652]">Personal questions</h2>
        <p className="mt-1 mb-2 text-sm text-[#5c6570]">No picture. Name, age, family, food, after school.</p>
        <QuestionList items={warmUp} />
      </Sheet>

      <Sheet>
        <p className="text-xs font-semibold tracking-[0.16em] text-[#a33b2b] uppercase">Spare bank</p>
        <h2 className="font-serif text-3xl text-[#243652]">You can ask these on any picture</h2>
        <p className="mt-1 mb-2 text-sm text-[#5c6570]">
          The answer changes with the picture. Read the expected column against that picture. Add two questions at most.
        </p>
        <QuestionList items={anyPicture} />
      </Sheet>

      {scenes.map((scene) => (
        <Fragment key={scene.id}>
          <Sheet className="flex min-h-[250mm] flex-col print:min-h-0">
            <div className="flex flex-1 flex-col">
              <p className="text-center font-serif text-4xl text-[#243652]">Look at the picture.</p>
              <ExamScene id={scene.id} className="mx-auto mt-4 h-[175mm] w-full max-w-[175mm]" />
              <p className="mt-4 text-center text-2xl">What can you see?</p>
              <p className="mt-auto pt-6 text-center text-xs tracking-[0.2em] text-[#c4b8a4] uppercase">
                {scene.code}
              </p>
            </div>
          </Sheet>
          <Sheet>
            <div className="mb-3 flex items-start gap-4 border-b border-[#e3d8c8] pb-3">
              <ExamScene id={scene.id} className="h-20 w-32 shrink-0 rounded-lg border border-[#e3d8c8] bg-[#f7f1e6]" />
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-[#a33b2b] uppercase">
                  Picture {scene.code} · teacher
                </p>
                <h2 className="font-serif text-3xl text-[#243652]">{scene.title}</h2>
                <p className="mt-1 text-sm leading-relaxed">{scene.note}</p>
                <p className="mt-1 text-xs text-[#5c6570]">
                  {scene.questions.length} questions. Ask 8–10 of them with one child.
                </p>
              </div>
            </div>
            <QuestionList items={scene.questions} />
          </Sheet>
        </Fragment>
      ))}
    </div>
  )
}
