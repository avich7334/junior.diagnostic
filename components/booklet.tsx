import { Picture } from "@/components/pictures"
import { itemsIn, passage, sections, wordBank } from "@/lib/content"
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
        "sheet mx-auto w-full max-w-[210mm] bg-white text-[#1c2430] shadow-[0_16px_50px_rgba(36,54,82,0.08)] print:max-w-none print:shadow-none",
        className
      )}
    >
      <div className="h-2 bg-[#243652]" />
      <div className="px-6 py-6 sm:px-10 sm:py-8">{children}</div>
    </article>
  )
}

function TaskHead({
  task,
  title,
  instruction,
}: {
  task: string
  title: string
  instruction: string
}) {
  return (
    <header className="mb-5 border-b border-[#e3d8c8] pb-3">
      <p className="text-xs font-semibold tracking-[0.16em] text-[#a33b2b] uppercase">
        {task}
      </p>
      <h2 className="font-serif text-3xl text-[#243652]">{title}</h2>
      <p className="mt-1 text-lg">{instruction}</p>
    </header>
  )
}

function ChoiceLine({ id, text }: { id: string; text: string }) {
  return (
      <div className="flex items-start gap-3 py-1 text-lg print:py-0 print:text-base">
      <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full border border-[#243652] text-sm font-semibold">
        {id}
      </span>
      <span>{text}</span>
    </div>
  )
}

export function Booklet() {
  const match = sections.find((section) => section.id === "match")!
  const reading = sections.find((section) => section.id === "reading")!
  const context = sections.find((section) => section.id === "context")!
  const grammar = sections.find((section) => section.id === "grammar")!

  return (
    <div className="space-y-8 print:space-y-0">
      <Sheet>
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-[#243652] pb-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#5c6570] uppercase">
              English check-up
            </p>
            <h1 className="font-serif text-4xl text-[#243652]">Junior · 9–10</h1>
          </div>
          <Picture name="maya" className="size-16" label="Maya" />
        </div>
        <div className="mb-8 grid gap-3 text-base sm:grid-cols-3">
          {["Name", "Class", "Date"].map((field) => (
            <label key={field} className="block">
              <span className="text-sm text-[#5c6570]">{field}</span>
              <span className="mt-1 block border-b border-[#243652]">&nbsp;</span>
            </label>
          ))}
        </div>
        <TaskHead task={match.task} title={match.title} instruction={match.instruction} />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {itemsIn("match").map((item) => (
            <div key={item.id} className="text-center">
              <div className="text-sm font-semibold">{item.number}</div>
              <div className="mx-auto my-1 grid size-24 place-items-center rounded-xl border border-[#e3d8c8] bg-[#fffdf8]">
                {item.picture ? (
                  <Picture name={item.picture} className="size-20" label={`Picture ${item.number}`} />
                ) : null}
              </div>
              <div className="mx-auto mt-1 h-8 w-12 border-b-2 border-[#243652]" />
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-[#e3d8c8] bg-[#faf7f1] p-4">
          <p className="mb-2 text-sm font-semibold tracking-wide text-[#5c6570] uppercase">Words</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-5">
            {wordBank.map((entry) => (
              <p key={entry.letter} className="text-lg">
                <span className="font-semibold">{entry.letter}.</span> {entry.word}
              </p>
            ))}
          </div>
        </div>
      </Sheet>

      <Sheet>
        <TaskHead task={reading.task} title={reading.title} instruction={reading.instruction} />
        <div className="mb-4 rounded-xl bg-[#f7f3ea] p-4 print:mb-3 print:p-3">
          <h3 className="font-serif text-2xl text-[#243652]">{passage.title}</h3>
          <p className="mt-2 text-lg leading-relaxed print:text-base">{passage.text}</p>
        </div>
        <ol className="space-y-3 print:space-y-1.5">
          {itemsIn("reading").map((item) => (
            <li key={item.id} className="break-inside-avoid">
              <p className="text-lg font-semibold">
                {item.number}. {item.prompt}
              </p>
              {item.choices.map((choice) => (
                <ChoiceLine key={choice.id} id={choice.id} text={choice.text} />
              ))}
            </li>
          ))}
        </ol>
      </Sheet>

      <Sheet>
        <TaskHead task={context.task} title={context.title} instruction={context.instruction} />
        <ol className="space-y-5 print:space-y-2">
          {itemsIn("context").map((item) => (
            <li key={item.id} className="grid break-inside-avoid gap-3 border-b border-[#efe6d6] pb-4 print:pb-2 sm:grid-cols-[7rem_1fr]">
              <div className="grid size-24 place-items-center rounded-xl border border-[#e3d8c8] print:size-16">
                {item.picture ? (
                  <Picture name={item.picture} className="size-20 print:size-14" label={`Picture ${item.number}`} />
                ) : null}
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {item.number}. {item.prompt}
                </p>
                {item.choices.map((choice) => (
                  <ChoiceLine key={choice.id} id={choice.id} text={choice.text} />
                ))}
              </div>
            </li>
          ))}
        </ol>
      </Sheet>

      <Sheet>
        <TaskHead task={grammar.task} title={grammar.title} instruction={grammar.instruction} />
        <ol className="space-y-4">
          {itemsIn("grammar").map((item) => (
            <li key={item.id} className="break-inside-avoid border-b border-[#efe6d6] pb-3 print:pb-2">
              <div className="flex items-start gap-3">
                {item.picture ? (
                  <Picture name={item.picture} className="size-16 shrink-0" label="Picture" />
                ) : null}
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-semibold">
                    {item.number}. {item.prompt}
                  </p>
                  {item.choices.map((choice) => (
                    <ChoiceLine key={choice.id} id={choice.id} text={choice.text} />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Sheet>
    </div>
  )
}
