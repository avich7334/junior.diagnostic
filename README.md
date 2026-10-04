# Junior A1 check

A vocabulary-and-speaking diagnostic for A1 EFL juniors, ages 9–10. It does not give a grade. It shows the teacher the error, the gap, and what to teach next.

It has two parts:

1. **Written booklet** (25–30 minutes, whole class): picture–word matching, a short reading, a word in a sentence, and very short grammar.
2. **Interview** (one learner): the questions the teacher asks, and an error rubric. On the website the learner describes three pictures: the living room, the classroom, and the park. The printed oral pack still gives one child one picture, chosen from six scenes.

A structure is a priority only when it breaks on the paper and in speech. An error on one side alone is not yet a confirmed gap.

## Run it

```bash
npm install
npm run dev
```

The dev server tries port 3000 by default. For the local preview used with this project:

```bash
npx next dev --turbopack -p 43123
```

Then open `http://127.0.0.1:43123`.

Ready files. There are two:

- `public/pdf/junior-a1-student.pdf` — the student copy. The paper only. No key, no rubric, no pictures for speaking.
- `public/pdf/junior-a1-teacher.pdf` — the teacher copy. Commands, the full 0–3 rubric, the error list, what to teach next, the answer key, and the describe-the-picture pages. A show page has the picture only, so it can be turned toward the child.

## Teacher flow

- **Guide:** timing, the script to read aloud, and what not to do in the room.
- **Booklet / Interview form:** print these. The last form page is the picture only; turn that page toward the learner.
- **Key:** what each wrong option means.
- **Run:** mark the paper, or let the learner do it on the tablet, then the interview and the rubric.
- **Class:** saved checks and the shared gap. A pattern shows after three records.

Records stay in the browser’s `localStorage`. They do not go to a server. Download a backup from Class before you switch devices.

## Tests

Scoring and triangulation:

```bash
npm test
```
