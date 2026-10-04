import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { part1Script, sceneKey } from "@/lib/content"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="max-w-3xl">
        <Badge variant="secondary">Ages 9–10 · CEFR A1 · not a mark</Badge>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-[#243652] sm:text-6xl">
          Paper first.
          <br />
          Then a quiet room.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#3d4654]">
          Do they recognise the word, and can they use it when they speak? This check separates the two. It is not a certificate.
          You read the class gap and the child’s own gap from the same tool.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/uygula" className={cn(buttonVariants(), "h-11 px-5")}>
            Start a check
          </Link>
          <Link href="/rapor/ornek" className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}>
            Sample report
          </Link>
          <a
            href="/pdf/junior-a1-student.pdf"
            className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}
          >
            Student copy
          </a>
          <a
            href="/pdf/junior-a1-teacher.pdf"
            className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}
          >
            Teacher copy
          </a>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Part 1 · Paper</CardTitle>
            <CardDescription>25–30 minutes · the whole class · quiet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed">
            <p>32 items. Four jobs: picture and word, a short read, a word in a sentence, one grammar pattern.</p>
            <p>Every wrong option is an error you hear at this age. Write the option the learner marked. Right or wrong is not enough.</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link href="/kitapcik" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-3")}>
                Booklet
              </Link>
              <Link href="/anahtar" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-3")}>
                Answer key
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Part 2 · Interview</CardTitle>
            <CardDescription>6–8 minutes · one learner · a quiet room</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed">
            <p>Ask the questions as they are written. Do not correct, finish the sentence, or say the score to their face. Mark the rubric after they leave.</p>
            <p>
              The teacher copy has the warm-up, six pictures, and the rubric. Each child describes one picture. Rotate the pictures from A to F.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <a href="/pdf/junior-a1-teacher.pdf" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-3")}>
                Teacher copy
              </a>
              <Link href="/sozlu" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-3")}>
                Open on screen
              </Link>
              <Link href="/form" className={cn(buttonVariants({ variant: "outline" }), "h-9 px-3")}>
                Short form
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="font-serif text-3xl text-[#243652]">On the day</h2>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed">
            <li>1. Print the booklet, or open Run on a tablet. Read the instructions once.</li>
            <li>2. 25 minutes. Do not translate the items. If they ask “What does this mean?”, say “You can leave it blank.”</li>
            <li>3. Collect the papers. Do not say a mark.</li>
            <li>4. Take learners into the room one by one. Ask the questions in order. While they are in the room, only tick the error box and write the sentence.</li>
            <li>5. After they leave, give the 0–3 scores. Save the report.</li>
            <li>6. After three checks, look at the class screen. A shared gap is not individual homework.</li>
          </ol>
        </div>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-[#e3d8c8]">
          <h2 className="font-serif text-2xl text-[#243652]">What you read for Part 1</h2>
          <p className="mt-3 text-sm leading-relaxed">{part1Script}</p>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-3xl text-[#243652]">What you are looking for</h2>
        <div className="mt-4 overflow-x-auto rounded-xl bg-white ring-1 ring-[#e3d8c8]">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b border-[#efe6d6] text-[#5c6570]">
              <tr>
                <th className="px-4 py-3 font-medium">Place</th>
                <th className="px-4 py-3 font-medium">What you watch</th>
                <th className="px-4 py-3 font-medium">What a miss means</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Picture match", "Can they see the word?", "A weak set, or an edge word"],
                ["Maya text", "Negative and time", "Jumps to a familiar word"],
                ["Word in a sentence", "A collocation such as drink", "Looks at the picture and does not read the verb"],
                ["Grammar", "One pattern, one error", "The option is the name of the error"],
                ["Interview", "Does the same pattern break in speech?", "If it shows in both, it is a priority"],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-[#f3eee4] last:border-0">
                  {row.map((cell) => (
                    <td key={cell} className="px-4 py-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-[#5c6570]">
          Secure: at least 75% of the answered items. Developing: 50–74%. Clear gap: below that. A blank item does not enter the percentage. They may simply have run out of time.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl text-[#243652]">Do not do this in the room</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed">
            <li>Do not finish the sentence. Do not whisper the right pronoun.</li>
            <li>Do not ask for a full sentence. Nine is a relevant answer.</li>
            <li>After thirty seconds of silence, move to the backup question. After two backups, leave that phase.</li>
            <li>If they switch to Turkish, say “in English?” once. The second time, note it and move on.</li>
            <li>If you gave a model, the interaction score is 1 at most.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-3xl text-[#243652]">Picture key</h2>
          <p className="mt-3 text-sm text-[#5c6570]">Do not read this to the learner. On the website the interview shows three pictures: the living room, the classroom, and the park.</p>
          <ul className="mt-3 space-y-2 text-sm">
            {sceneKey.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
