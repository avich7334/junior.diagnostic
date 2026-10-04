import type {
  Choice,
  DimensionId,
  Item,
  PictureId,
  SectionId,
  Theme,
  VocabSet,
} from "@/lib/types"

export const setLabels: Record<VocabSet, string> = {
  school: "School things",
  animals: "Animals",
  food: "Food and drink",
  clothes: "Clothes",
  home: "Home",
  body: "Body",
  actions: "Actions",
  weather: "Weather",
  family: "Family",
}

export const wordBank: { letter: string; word: string }[] = [
  { letter: "A", word: "rain" },
  { letter: "B", word: "foot" },
  { letter: "C", word: "book" },
  { letter: "D", word: "swim" },
  { letter: "E", word: "grandmother" },
  { letter: "F", word: "ruler" },
  { letter: "G", word: "rabbit" },
  { letter: "H", word: "dress" },
  { letter: "I", word: "bread" },
  { letter: "J", word: "window" },
]

function matchChoices(
  correct: string,
  extras: Record<string, string> = {}
): Choice[] {
  return wordBank.map((entry) => ({
    id: entry.letter,
    text: entry.word,
    note:
      entry.letter === correct
        ? "Correct match."
        : (extras[entry.letter] ??
          `Read the picture as “${entry.word}”. The word is not separate yet, or the picture was not read.`),
  }))
}

export const passage = {
  title: "Maya and her cat",
  text: "Hello! My name is Maya. I am nine. I live in a small house with my mum, my dad and my little brother. I have a white cat. Her name is Snow. I like apples and milk, but I don't like fish. After school I play football with my friends. On Sunday I visit my grandmother.",
}

const match: Item[] = [
  {
    id: "m-rabbit",
    section: "match",
    number: 1,
    prompt: "Picture 1",
    picture: "rabbit",
    choices: matchChoices("G"),
    answer: "G",
    target: "animals-rabbit",
    targetLabel: "rabbit",
    theme: null,
    set: "animals",
    why: "A core animal word. It may be less frequent than the floor words. Knowing cat and dog but missing rabbit means the set is only half there.",
  },
  {
    id: "m-window",
    section: "match",
    number: 2,
    prompt: "Picture 2",
    picture: "window",
    choices: matchChoices("J"),
    answer: "J",
    target: "home-window",
    targetLabel: "window",
    theme: null,
    set: "home",
    why: "Home set. Mixing it with door means the home words have collapsed into each other.",
  },
  {
    id: "m-book",
    section: "match",
    number: 3,
    prompt: "Picture 3",
    picture: "book",
    choices: matchChoices("C"),
    answer: "C",
    target: "school-book",
    targetLabel: "book",
    theme: null,
    set: "school",
    floor: true,
    why: "Floor item. If book is missed, the learner may be below the A1 word line. Higher patterns wait.",
  },
  {
    id: "m-bread",
    section: "match",
    number: 4,
    prompt: "Picture 4",
    picture: "bread",
    choices: matchChoices("I"),
    answer: "I",
    target: "food-bread",
    targetLabel: "bread",
    theme: null,
    set: "food",
    why: "Food set, recognised from the picture.",
  },
  {
    id: "m-dress",
    section: "match",
    number: 5,
    prompt: "Picture 5",
    picture: "dress",
    choices: matchChoices("H"),
    answer: "H",
    target: "clothes-dress",
    targetLabel: "dress",
    theme: null,
    set: "clothes",
    why: "Clothes set. A dress on its own, not a picture of a person.",
  },
  {
    id: "m-foot",
    section: "match",
    number: 6,
    prompt: "Picture 6",
    picture: "foot",
    choices: matchChoices("B", {
      D: "Mixed the foot picture with the action swim.",
      H: "Chose a clothes word instead of a body word.",
    }),
    answer: "B",
    target: "body-foot",
    targetLabel: "foot",
    theme: null,
    set: "body",
    why: "The only body item. Do not change the unit for one miss. Grow the set if it is also missing in speech.",
  },
  {
    id: "m-swim",
    section: "match",
    number: 7,
    prompt: "Picture 7",
    picture: "swim",
    choices: matchChoices("D", {
      A: "Chose a weather word instead of the action picture.",
    }),
    answer: "D",
    target: "action-swim",
    targetLabel: "swim",
    theme: null,
    set: "actions",
    stretch: true,
    why: "Stretch item: a verb. It falls if the learner is only hunting for objects. Leaving it blank because they know swimming but cannot find swim also shows a weak action word.",
  },
  {
    id: "m-rain",
    section: "match",
    number: 8,
    prompt: "Picture 8",
    picture: "rain",
    choices: matchChoices("A"),
    answer: "A",
    target: "weather-rain",
    targetLabel: "rain",
    theme: null,
    set: "weather",
    floor: true,
    why: "Floor weather word.",
  },
  {
    id: "m-grandmother",
    section: "match",
    number: 9,
    prompt: "Picture 9",
    picture: "grandmother",
    choices: matchChoices("E", {
      H: "Chose a clothes word instead of a family word. Grandmother may not yet be separate from mother.",
    }),
    answer: "E",
    target: "family-grandmother",
    targetLabel: "grandmother",
    theme: null,
    set: "family",
    stretch: true,
    why: "Stretch family word. Knowing mother and father but missing grandmother is a normal A1 edge, not a panic item.",
  },
  {
    id: "m-ruler",
    section: "match",
    number: 10,
    prompt: "Picture 10",
    picture: "ruler",
    choices: matchChoices("F", {
      C: "Book instead of ruler. Same school set; the words are not separate.",
    }),
    answer: "F",
    target: "school-ruler",
    targetLabel: "ruler",
    theme: null,
    set: "school",
    stretch: true,
    why: "Stretch school word. Knowing pencil and book but missing ruler means the set stops at the frequent words.",
  },
]

const reading: Item[] = [
  {
    id: "r-age",
    section: "reading",
    number: 1,
    prompt: "Maya is ___.",
    choices: [
      { id: "a", text: "eight", note: "Not in the text. Skipped the number or guessed." },
      { id: "b", text: "nine", note: "Correct. I am nine." },
      { id: "c", text: "ten", note: "Not in the text." },
    ],
    answer: "b",
    target: "reading-detail-age",
    targetLabel: "detail: age",
    theme: "reading-detail",
    why: "A plain detail. A learner who misses this and then answers the later questions may be rushing.",
  },
  {
    id: "r-family",
    section: "reading",
    number: 2,
    prompt: "Maya lives with ___.",
    choices: [
      {
        id: "a",
        text: "her friends",
        note: "Friends is in the text, but in the football sentence. Not lives with.",
      },
      {
        id: "b",
        text: "her mum, dad and little brother",
        note: "Correct.",
      },
      {
        id: "c",
        text: "her cat",
        note: "She has a cat. That is not who she lives with. have a cat mixed with live with.",
      },
    ],
    answer: "b",
    target: "reading-distractor-family",
    targetLabel: "distractor: who she lives with",
    theme: "reading-detail",
    why: "Checks that a word in the text is not enough. Word recognition and understanding the sentence split here.",
  },
  {
    id: "r-color",
    section: "reading",
    number: 3,
    prompt: "Maya's cat is ___.",
    choices: [
      { id: "a", text: "black", note: "Not in the text." },
      { id: "b", text: "brown", note: "Not in the text." },
      { id: "c", text: "white", note: "Correct. a white cat." },
    ],
    answer: "c",
    target: "reading-detail-color",
    targetLabel: "detail: colour",
    theme: "reading-detail",
    why: "A short adjective detail. If the colour word is weak, this falls. It may be vocabulary, not reading.",
  },
  {
    id: "r-neg",
    section: "reading",
    number: 4,
    prompt: "Maya doesn't like ___.",
    choices: [
      {
        id: "a",
        text: "apples",
        note: "From the positive list. Did not read doesn't like. Went to a familiar word.",
      },
      {
        id: "b",
        text: "milk",
        note: "From the positive list. Missed the negative sentence.",
      },
      { id: "c", text: "fish", note: "Correct. I don't like fish." },
    ],
    answer: "c",
    target: "reading-negation",
    targetLabel: "negative sentence",
    theme: "negation",
    why: "The reading item that carries the check. A learner who sees don't like chooses fish. Apples or milk means they jumped to a familiar word in the text.",
  },
  {
    id: "r-sunday",
    section: "reading",
    number: 5,
    prompt: "On Sunday Maya ___.",
    choices: [
      {
        id: "a",
        text: "plays football",
        note: "The after-school action. Did not separate the time phrase.",
      },
      {
        id: "b",
        text: "visits her grandmother",
        note: "Correct. On Sunday.",
      },
      {
        id: "c",
        text: "goes to school",
        note: "School is in the text, but after school. School was invented for Sunday.",
      },
    ],
    answer: "b",
    target: "reading-time",
    targetLabel: "time phrase",
    theme: "reading-time",
    why: "Two times, two actions. A learner who cannot separate after school from On Sunday is scanning word by word and missing the sentence boundary.",
  },
]

const context: Item[] = [
  {
    id: "v-shoes",
    section: "context",
    number: 1,
    prompt: "These are my ___.",
    picture: "shoes",
    choices: [
      { id: "a", text: "shoes", note: "Correct." },
      { id: "b", text: "hats", note: "Wrong piece inside the clothes set." },
      { id: "c", text: "shirts", note: "Wrong piece inside the clothes set." },
    ],
    answer: "a",
    target: "clothes-shoes",
    targetLabel: "shoes",
    theme: null,
    set: "clothes",
    floor: true,
    why: "Floor clothes item. The picture alone separates the words.",
  },
  {
    id: "v-drink",
    section: "context",
    number: 2,
    prompt: "I drink ___ in the morning.",
    picture: "breakfast",
    choices: [
      {
        id: "a",
        text: "bread",
        note: "It is in the picture, but it does not go with drink. The verb was not read.",
      },
      { id: "b", text: "milk", note: "Correct. drink + milk." },
      {
        id: "c",
        text: "eggs",
        note: "It is in the picture, but it does not go with drink.",
      },
    ],
    answer: "b",
    target: "food-drink",
    targetLabel: "drink + milk",
    theme: null,
    set: "food",
    why: "Three objects are visible at once. A learner who knows the words but does not read drink chooses bread or eggs.",
  },
  {
    id: "v-bed",
    section: "context",
    number: 3,
    prompt: "This is a ___.",
    picture: "bed",
    choices: [
      { id: "a", text: "bed", note: "Correct." },
      { id: "b", text: "door", note: "Home-set distractor. Did not look at the picture." },
      { id: "c", text: "window", note: "Home-set distractor. Did not look at the picture." },
    ],
    answer: "a",
    target: "home-bed",
    targetLabel: "bed",
    theme: null,
    set: "home",
    floor: true,
    why: "Floor home word.",
  },
  {
    id: "v-bird",
    section: "context",
    number: 4,
    prompt: "A ___ can fly.",
    picture: "bird",
    choices: [
      { id: "a", text: "fish", note: "Animal set, but it does not fly." },
      { id: "b", text: "dog", note: "Animal set, but it does not fly." },
      { id: "c", text: "bird", note: "Correct." },
    ],
    answer: "c",
    target: "animals-bird",
    targetLabel: "bird",
    theme: null,
    set: "animals",
    floor: true,
    why: "Floor animal item. The picture and can fly agree.",
  },
  {
    id: "v-pencil",
    section: "context",
    number: 5,
    prompt: "I write with a ___.",
    picture: "pencil",
    choices: [
      {
        id: "a",
        text: "ruler",
        note: "Same school set. Not write with a ruler.",
      },
      { id: "b", text: "pencil", note: "Correct." },
      {
        id: "c",
        text: "eraser",
        note: "Same school set. Not for writing.",
      },
    ],
    answer: "b",
    target: "school-pencil",
    targetLabel: "pencil",
    theme: null,
    set: "school",
    floor: true,
    why: "Floor school item. Ruler and eraser are the same set. The picture is a pencil.",
  },
  {
    id: "v-snow",
    section: "context",
    number: 6,
    prompt: "It is cold and white. It is ___.",
    picture: "snow",
    choices: [
      {
        id: "a",
        text: "rain",
        note: "From the weather set. Did not use the clue cold and white.",
      },
      { id: "b", text: "snow", note: "Correct." },
      { id: "c", text: "sun", note: "From the weather set, and the opposite of the clue." },
    ],
    answer: "b",
    target: "weather-snow",
    targetLabel: "snow",
    theme: null,
    set: "weather",
    stretch: true,
    why: "Stretch weather item. The sentence carries the clue: cold and white. Choosing rain means they stayed in the weather set and did not read the adjective.",
  },
]

const grammar: Item[] = [
  {
    id: "g-age",
    section: "grammar",
    number: 1,
    prompt: "I ___ nine years old.",
    choices: [
      { id: "a", text: "am", note: "Correct. am for age." },
      {
        id: "b",
        text: "have",
        note: "have for age. A word-for-word transfer of the Turkish age pattern: I have nine.",
      },
      { id: "c", text: "is", note: "is does not agree with I." },
    ],
    answer: "a",
    target: "be-age",
    targetLabel: "I am / age",
    theme: "be",
    floor: true,
    why: "Floor pattern, and the most common transfer. The learner who chooses have is not the learner who chooses is. Write the option in the note.",
  },
  {
    id: "g-she-be",
    section: "grammar",
    number: 2,
    prompt: "She ___ my sister.",
    choices: [
      { id: "a", text: "am", note: "am does not agree with She." },
      { id: "b", text: "is", note: "Correct." },
      { id: "c", text: "are", note: "are with a singular subject." },
    ],
    answer: "b",
    target: "be-she",
    targetLabel: "She is",
    theme: "be",
    why: "The be paradigm. Separate from the age item: there is no have distractor here.",
  },
  {
    id: "g-an",
    section: "grammar",
    number: 3,
    prompt: "It is ___ apple.",
    picture: "apple",
    choices: [
      { id: "a", text: "a", note: "a before a vowel sound. an is not there yet." },
      { id: "b", text: "an", note: "Correct." },
      { id: "c", text: "two", note: "One picture. Number mixed with the article." },
    ],
    answer: "b",
    target: "article-an",
    targetLabel: "a / an",
    theme: "article",
    why: "The only article item, a vowel sound. a apple is an expected error at this age.",
  },
  {
    id: "g-plural",
    section: "grammar",
    number: 4,
    prompt: "I have two ___.",
    picture: "two-cats",
    choices: [
      { id: "a", text: "cat", note: "No plural -s after the number." },
      { id: "b", text: "cats", note: "Correct." },
      {
        id: "c",
        text: "cat's",
        note: "Plural mixed with the possessive apostrophe. Maya's cat is another lesson. Do not teach it on this item.",
      },
    ],
    answer: "b",
    target: "plural-s",
    targetLabel: "plural -s",
    theme: "plural",
    why: "two + noun. The cat's option is there to separate the possessive mix-up.",
  },
  {
    id: "g-she",
    section: "grammar",
    number: 5,
    prompt: "Elif is a girl. ___ is my friend.",
    choices: [
      {
        id: "a",
        text: "He",
        note: "he for a girl. Turkish o has no gender. The most common A1 transfer.",
      },
      { id: "b", text: "She", note: "Correct." },
      { id: "c", text: "It", note: "it for a person." },
    ],
    answer: "b",
    target: "pronoun-she",
    targetLabel: "she",
    theme: "pronoun",
    why: "girl → she. The sentence says girl. This is matching, not general knowledge.",
  },
  {
    id: "g-he",
    section: "grammar",
    number: 6,
    prompt: "Ali is a boy. ___ is my friend.",
    choices: [
      { id: "a", text: "He", note: "Correct." },
      {
        id: "b",
        text: "She",
        note: "she for a boy. he and she may be systematically swapped.",
      },
      { id: "c", text: "It", note: "it for a person." },
    ],
    answer: "a",
    target: "pronoun-he",
    targetLabel: "he",
    theme: "pronoun",
    why: "boy → he. Read it with the Elif item. If both are reversed, it is a pattern, not a slip.",
  },
  {
    id: "g-3sg",
    section: "grammar",
    number: 7,
    prompt: "My brother ___ football every day.",
    choices: [
      { id: "a", text: "play", note: "No 3rd-person -s. He play." },
      { id: "b", text: "plays", note: "Correct." },
      {
        id: "c",
        text: "playing",
        note: "-ing mixed with -s. Do not open the continuous this week.",
      },
    ],
    answer: "b",
    target: "present-3sg",
    targetLabel: "3rd person -s",
    theme: "third",
    why: "every day rules out the present continuous. The learner who chooses playing should not get the same lesson as the learner who chooses play.",
  },
  {
    id: "g-can",
    section: "grammar",
    number: 8,
    prompt: "Birds ___ fly.",
    choices: [
      { id: "a", text: "can", note: "Correct. can + base verb." },
      { id: "b", text: "cans", note: "Added -s to can." },
      { id: "c", text: "can to", note: "Brought to in after can." },
    ],
    answer: "a",
    target: "can",
    targetLabel: "can",
    theme: "can",
    floor: true,
    why: "Floor pattern. cans and can to are the two breaks you hear at this level.",
  },
  {
    id: "g-in",
    section: "grammar",
    number: 9,
    prompt: "The cat is ___ the box.",
    picture: "cat-in-box",
    choices: [
      { id: "a", text: "on", note: "The picture is inside the box, not on it." },
      { id: "b", text: "in", note: "Correct." },
      { id: "c", text: "under", note: "Not under the box." },
    ],
    answer: "b",
    target: "prep-in",
    targetLabel: "in",
    theme: "prep",
    why: "The only preposition item with a picture. Read it together with the cat and the ball in speech.",
  },
  {
    id: "g-there",
    section: "grammar",
    number: 10,
    prompt: "___ two dogs in the garden.",
    choices: [
      {
        id: "a",
        text: "There is",
        note: "there is with a plural noun. No number agreement.",
      },
      { id: "b", text: "There are", note: "Correct." },
      {
        id: "c",
        text: "They is",
        note: "there mixed with they, and the verb is singular.",
      },
    ],
    answer: "b",
    target: "there-are",
    targetLabel: "there are",
    theme: "there",
    why: "Plural there are. They is is a separate mix-up. Drop it.",
  },
  {
    id: "g-question",
    section: "grammar",
    number: 11,
    prompt: "You meet a new friend. What do you say?",
    choices: [
      { id: "a", text: "What's your name?", note: "Correct question order." },
      {
        id: "b",
        text: "What your name?",
        note: "is dropped after What. The broken question you hear most often in speech.",
      },
      {
        id: "c",
        text: "Your name what?",
        note: "The question word is at the end. Statement order.",
      },
    ],
    answer: "a",
    target: "question-order",
    targetLabel: "question order",
    theme: "question",
    why: "The same pattern as the last interview question. If it is broken on paper and the child only repeats your model in the room, keep the interaction score low as well.",
  },
]

export const items: Item[] = [...match, ...reading, ...context, ...grammar]

export const sections: {
  id: SectionId
  task: string
  title: string
  minutes: string
  instruction: string
  teacher: string
}[] = [
  {
    id: "match",
    task: "Task 1",
    title: "Look and match",
    minutes: "6 minutes",
    instruction: "Look at the pictures. Write the letter.",
    teacher:
      "See and link. They do not produce the word. swim is a verb. ruler, grandmother and foot are less frequent. book and rain are floor words.",
  },
  {
    id: "reading",
    task: "Task 2",
    title: "Read",
    minutes: "7 minutes",
    instruction: "Read about Maya. Circle a, b or c.",
    teacher:
      "56 words. The real split is doesn't like and On Sunday. The other three items are details. A word in the text is not the same as a correct answer.",
  },
  {
    id: "context",
    task: "Task 3",
    title: "Look and choose",
    minutes: "5 minutes",
    instruction: "Look at the picture. Circle the word.",
    teacher:
      "The word is inside a sentence. The breakfast picture shows three objects. If drink is not read, bread or eggs is chosen.",
  },
  {
    id: "grammar",
    task: "Task 4",
    title: "Circle the word",
    minutes: "8 minutes",
    instruction: "Circle a, b or c.",
    teacher:
      "Each item is one pattern. The options are not tricks. They are errors you hear at this age. Write the letter the learner marked. Right or wrong on its own does not name the error.",
  },
]

export function itemsIn(section: SectionId): Item[] {
  return items.filter((item) => item.section === section)
}

export function choiceText(item: Item, choiceId: string): string {
  return item.choices.find((choice) => choice.id === choiceId)?.text ?? choiceId
}

export function choiceNote(item: Item, choiceId: string): string {
  return item.choices.find((choice) => choice.id === choiceId)?.note ?? ""
}

export type ErrorCode = {
  id: string
  group: "Vocabulary" | "Grammar" | "Pronunciation" | "Interaction"
  label: string
  theme: Theme
}

export const errorCodes: ErrorCode[] = [
  {
    id: "voc-silent",
    group: "Vocabulary",
    theme: "vocab",
    label: "The word does not come. Silence, or a switch to Turkish.",
  },
  {
    id: "voc-wrong",
    group: "Vocabulary",
    theme: "vocab",
    label: "Uses a wrong or neighbouring word",
  },
  {
    id: "voc-single",
    group: "Vocabulary",
    theme: "vocab",
    label: "Stays on one word and does not build a phrase",
  },
  {
    id: "gr-be",
    group: "Grammar",
    theme: "be",
    label: "am / is / are mixed or dropped",
  },
  {
    id: "gr-have-age",
    group: "Grammar",
    theme: "be",
    label: "Uses have for age (I have nine)",
  },
  {
    id: "gr-heshe",
    group: "Grammar",
    theme: "pronoun",
    label: "he / she mixed",
  },
  {
    id: "gr-article",
    group: "Grammar",
    theme: "article",
    label: "a / an missing or wrong",
  },
  {
    id: "gr-plural",
    group: "Grammar",
    theme: "plural",
    label: "Plural -s missing (two cat)",
  },
  {
    id: "gr-3sg",
    group: "Grammar",
    theme: "third",
    label: "3rd-person -s missing (He play)",
  },
  {
    id: "gr-wordorder",
    group: "Grammar",
    theme: "question",
    label: "Question order broken (What your name?)",
  },
  {
    id: "gr-can",
    group: "Grammar",
    theme: "can",
    label: "can broken (cans, can to)",
  },
  {
    id: "gr-prep",
    group: "Grammar",
    theme: "prep",
    label: "in / on / under mixed",
  },
  {
    id: "gr-there",
    group: "Grammar",
    theme: "there",
    label: "Cannot build there is / are",
  },
  {
    id: "gr-dont",
    group: "Grammar",
    theme: "negation",
    label: "Cannot build the negative (no like, not like)",
  },
  {
    id: "pr-final",
    group: "Pronunciation",
    theme: "pronunciation",
    label: "The final consonant drops and the word shortens",
  },
  {
    id: "pr-th",
    group: "Pronunciation",
    theme: "pronunciation",
    label: "th moves far enough to change the meaning",
  },
  {
    id: "pr-wv",
    group: "Pronunciation",
    theme: "pronunciation",
    label: "w / v mixed, so the word is not recognised",
  },
  {
    id: "pr-vowel",
    group: "Pronunciation",
    theme: "pronunciation",
    label: "A vowel shift turns the word into another word",
  },
  {
    id: "int-oneword",
    group: "Interaction",
    theme: "communication",
    label: "Relevant, but one word. Nothing is added.",
  },
  {
    id: "int-noreask",
    group: "Interaction",
    theme: "interaction",
    label: "Cannot ask, or only repeats the model",
  },
  {
    id: "int-l1",
    group: "Interaction",
    theme: "communication",
    label: "Switches to Turkish when stuck",
  },
]

export const dimensions: {
  id: DimensionId
  title: string
  question: string
  levels: { score: number; label: string; text: string }[]
}[] = [
  {
    id: "communication",
    title: "Communication",
    question: "Do they understand the question and give a relevant answer?",
    levels: [
      {
        score: 0,
        label: "Lost",
        text: "No English answer. Still none after the backup question. Silence, or Turkish the whole time.",
      },
      {
        score: 1,
        label: "Sparse",
        text: "A relevant answer to fewer than half the questions. Mostly gestures, off-topic words, or one word.",
      },
      {
        score: 2,
        label: "Relevant",
        text: "A relevant short answer to most questions. The topic is right even without a sentence.",
      },
      {
        score: 3,
        label: "Adds",
        text: "Almost every question gets an answer, and at least two answers add one extra piece of information.",
      },
    ],
  },
  {
    id: "vocabulary",
    title: "Vocabulary",
    question: "Do A1 words come?",
    levels: [
      {
        score: 0,
        label: "Closed",
        text: "Number, family, food, and the objects in the picture do not come.",
      },
      {
        score: 1,
        label: "Frame",
        text: "A few words are there. They name fewer than half the objects in the picture.",
      },
      {
        score: 2,
        label: "Works",
        text: "Family, one food, one after-school action, and most objects in the picture come. There is an occasional gap.",
      },
      {
        score: 3,
        label: "Ready",
        text: "Topic words come quickly. A simple adjective or place phrase is there too.",
      },
    ],
  },
  {
    id: "grammar",
    title: "Grammar",
    question: "Do A1 patterns hold?",
    levels: [
      {
        score: 0,
        label: "Pile",
        text: "Words sit next to each other. There is no pattern such as I am or I like.",
      },
      {
        score: 1,
        label: "One pattern",
        text: "One pattern holds. he/she, plural, question order, or -s is scattered.",
      },
      {
        score: 2,
        label: "Holds",
        text: "I am, I like, and I can are mostly right. One pattern still breaks in a systematic way.",
      },
      {
        score: 3,
        label: "Control",
        text: "A1 patterns are mostly right. An error does not block the meaning.",
      },
    ],
  },
  {
    id: "pronunciation",
    title: "Pronunciation",
    question: "Can you understand them?",
    levels: [
      {
        score: 0,
        label: "Closed",
        text: "You know the word and still cannot recognise it.",
      },
      {
        score: 1,
        label: "Hard",
        text: "You often ask for a repeat. A final sound drops, or a vowel change turns the word into another word.",
      },
      {
        score: 2,
        label: "Open",
        text: "Understandable when they speak slowly. One sound is wrong, but the meaning comes through.",
      },
      {
        score: 3,
        label: "Easy",
        text: "Understood the first time. An accent is fine.",
      },
    ],
  },
  {
    id: "interaction",
    title: "Interaction",
    question: "Can they build a question?",
    levels: [
      {
        score: 0,
        label: "None",
        text: "No question. Still none after the model.",
      },
      {
        score: 1,
        label: "Model",
        text: "Repeats the question after the model. No question of their own. If you gave a model, the score is 1 at most.",
      },
      {
        score: 2,
        label: "Half",
        text: "Tries their own question. The order may be broken: What your name?",
      },
      {
        score: 3,
        label: "Builds",
        text: "Asks an understandable question and waits for the answer.",
      },
    ],
  },
]

export type Phase = {
  id: string
  title: string
  minutes: string
  scored: boolean
  intro?: string
  showScene?: boolean
  scene?: "room" | "classroom" | "park"
  close?: string
  questions: {
    say: string
    backup: string
    listen: string
    expected?: string
  }[]
  errorIds: string[]
}

export const phases: Phase[] = [
  {
    id: "door",
    title: "Door",
    minutes: "half a minute",
    scored: false,
    intro: "Do not score this. Sitting down and hearing you is enough.",
    questions: [
      {
        say: "Hello. Sit down, please.",
        backup: "Open your hand toward the chair. Do not push.",
        listen: "Do they sit? Write it in the note. Do not add it to the score.",
      },
      {
        say: "My name is [your name]. What's your name?",
        backup: "Say their name from the list and ask Are you …?",
        listen: "Their name is enough. Do not wait for a full sentence.",
        expected: "Maya. / I'm Maya.",
      },
    ],
    errorIds: [],
  },
  {
    id: "personal",
    title: "Personal",
    minutes: "1 minute",
    scored: true,
    questions: [
      {
        say: "How old are you?",
        backup: "Are you nine? Are you ten?",
        listen: "I'm nine is secure. Nine alone is a relevant answer. I have nine or I is nine is grammar.",
        expected: "I'm nine. / I am nine years old.",
      },
      {
        say: "How are you today?",
        backup: "Are you happy? Are you OK?",
        listen: "I'm fine, I'm good, I'm happy. Not understanding the question is a communication note, not grammar.",
        expected: "I'm fine, thank you.",
      },
    ],
    errorIds: ["gr-be", "gr-have-age", "voc-single", "int-l1", "pr-vowel"],
  },
  {
    id: "family",
    title: "Family",
    minutes: "1.5 minutes",
    scored: true,
    questions: [
      {
        say: "Who is in your family?",
        backup: "Tell me one person in your family.",
        listen: "mum, dad, sister, brother, grandmother. Tick he/she if it comes on its own. Do not force it.",
        expected: "My mum, my dad and my sister.",
      },
      {
        say: "How many people are in your family?",
        backup: "Two? Three? Four?",
        listen: "A number. Note a plural or there are if it comes on its own. Do not mind if it does not.",
        expected: "Four. / There are four people.",
      },
    ],
    errorIds: ["gr-heshe", "gr-plural", "gr-there", "voc-silent", "voc-wrong", "voc-single"],
  },
  {
    id: "likes",
    title: "Likes and routine",
    minutes: "1.5 minutes",
    scored: true,
    questions: [
      {
        say: "What food do you like?",
        backup: "Do you like apples? Do you like milk?",
        listen: "like + a food. The single word apple is a relevant answer. If there is no phrase, tick the vocabulary box.",
        expected: "I like apples.",
      },
      {
        say: "What food don't you like?",
        backup: "Do you like fish?",
        listen: "I don't like … is secure. No like / not like goes in the negative box.",
        expected: "I don't like fish.",
      },
      {
        say: "What do you do after school?",
        backup: "Do you play football? Do you watch TV?",
        listen: "One action is enough. If the subject is I, I plays is not the 3rd-person box. Look for -s in a he/she sentence.",
        expected: "I play football. / I go home.",
      },
    ],
    errorIds: ["gr-dont", "gr-3sg", "voc-single", "voc-wrong", "int-l1"],
  },
  {
    id: "picture-room",
    title: "Picture 1",
    minutes: "2 minutes",
    scored: true,
    showScene: true,
    scene: "room",
    intro: "Picture 1 of 3, the living room. Let them look for a few seconds. A point is acceptable. Then say Tell me.",
    questions: [
      {
        say: "Look at the picture. What can you see?",
        backup: "Is there a cat? Is there a boy?",
        listen: "An object name, there is/are, can. Two of the three objects is enough.",
        expected: "I can see a boy and a cat. / There is a cat.",
      },
      {
        say: "Where is the cat?",
        backup: "After five seconds of silence: Is the cat on the chair? Yes or no is weaker than naming the place.",
        listen: "on the chair. in or under is the preposition.",
        expected: "The cat is on the chair.",
      },
      {
        say: "Where is the ball?",
        backup: "After five seconds of silence: Is the ball under the table?",
        listen: "under the table.",
        expected: "It's under the table.",
      },
      {
        say: "What is the boy doing?",
        backup: "Is he reading?",
        listen: "read or reading carries the meaning. He is reading is strong. boy book is a pile of words. she for the boy is gr-heshe.",
        expected: "He is reading. / Reading a book.",
      },
    ],
    errorIds: [
      "gr-there",
      "gr-prep",
      "gr-can",
      "gr-heshe",
      "voc-wrong",
      "voc-silent",
      "pr-final",
      "pr-wv",
      "pr-th",
    ],
  },
  {
    id: "picture-classroom",
    title: "Picture 2",
    minutes: "2 minutes",
    scored: true,
    showScene: true,
    scene: "classroom",
    intro: "Picture 2 of 3, the classroom. Same rules. Do not correct. Let them look, then ask.",
    questions: [
      {
        say: "Look at the picture. What can you see?",
        backup: "Is there a teacher? Is there a boy?",
        listen: "Two objects is enough. classroom or school if it comes.",
        expected: "A teacher, a boy, a bag and books.",
      },
      {
        say: "Where is the bag?",
        backup: "Is the bag on the desk?",
        listen: "on the desk. The bag is red.",
        expected: "On the desk.",
      },
      {
        say: "Where is the pencil?",
        backup: "Is the pencil under the desk?",
        listen: "under the desk. on the desk is the bag, not the pencil.",
        expected: "Under the desk.",
      },
      {
        say: "What is the boy doing?",
        backup: "Is he writing?",
        listen: "write or writing. she for the boy is the pronoun.",
        expected: "He is writing.",
      },
    ],
    errorIds: [
      "gr-there",
      "gr-prep",
      "gr-heshe",
      "voc-wrong",
      "voc-silent",
      "pr-final",
      "pr-wv",
      "pr-th",
    ],
  },
  {
    id: "picture-park",
    title: "Picture 3",
    minutes: "2 minutes",
    scored: true,
    showScene: true,
    scene: "park",
    intro: "Picture 3 of 3, the park. Same rules. Do not correct. Let them look, then ask.",
    questions: [
      {
        say: "Look at the picture. What can you see?",
        backup: "Is there a dog? Is there a ball?",
        listen: "How many objects they name. park or outside if it comes.",
        expected: "A boy, a girl, a dog and a ball.",
      },
      {
        say: "Where is the bird?",
        backup: "Is the bird in the tree?",
        listen: "in the tree. on the ground is wrong.",
        expected: "In the tree.",
      },
      {
        say: "Where is the hat?",
        backup: "Is the hat on the bench?",
        listen: "on the bench. hat or cap.",
        expected: "On the bench.",
      },
      {
        say: "What is the boy doing?",
        backup: "Is he running?",
        listen: "run or running. The ball is on the grass, not in his hand.",
        expected: "He is running.",
      },
    ],
    errorIds: [
      "gr-prep",
      "gr-heshe",
      "voc-wrong",
      "voc-silent",
      "pr-final",
      "pr-wv",
      "pr-th",
    ],
  },
  {
    id: "ask",
    title: "Question",
    minutes: "45 seconds",
    scored: true,
    close: "Thank you. You can go back to your class. Goodbye.",
    intro: "Wait first. If you move to a model, the interaction score is 1 at most.",
    questions: [
      {
        say: "Now you ask me a question.",
        backup: "After five seconds of silence: Ask me, what's your favourite colour?",
        listen: "Their own question, or a repeat? Word order. Do they wait for the answer?",
        expected: "What's your name? / How old are you? / What's your favourite colour?",
      },
    ],
    errorIds: ["int-noreask", "gr-wordorder", "int-l1"],
  },
]

export const themeGuides: Record<
  Theme,
  { title: string; action: string }
> = {
  foundation: {
    title: "Floor words",
    action:
      "Delay the higher patterns. Twelve pictures: book, pencil, milk, bird, shoes, rain, cat, apple, mum, dad, school, house. Four days: show and say, match, I see a…, then ask these floor items again. Do not start a new story.",
  },
  pronoun: {
    title: "He / she",
    action:
      "The first three minutes of every lesson, two photos: one girl, one boy. Chorus: She is a girl. He is a boy. Then the learner builds their own sentence: My sister — she is… / My brother — he is… If there is an error, say the right pronoun and have the sentence once more. Turkish o has no gender. Say that once. Do not open a lesson on every error.",
  },
  be: {
    title: "am / is / are and age",
    action:
      "Keep three lines on the board: I am / She is / They are. If I have nine comes, split have off onto a thing: I have a cat. I am nine. Say both in the same breath. Do not give the same homework to the learner who chose have and the learner who chose is.",
  },
  third: {
    title: "3rd-person -s",
    action:
      "One pattern this week: He plays / She likes. On the board, He plays stands next to I play. The learner picks one person in the family and says two sentences. If He play still carries the meaning, accept it, let them hear the right model once, and do not stop the talk. Do not open the continuous for a learner who chose playing.",
  },
  plural: {
    title: "Plural -s",
    action:
      "Show the number and add the object: one cat, two cats. When you hear two cat, write -s next to the number. Do not bring in the apostrophe this week for a learner who chose cat's. Maya's cat is another day.",
  },
  article: {
    title: "a / an",
    action:
      "Do not explain a rule sentence. Ten cards: apple, egg, orange, eraser, umbrella, and book, cat, dog, pencil, ruler. You say the card. The learner says only a or an, then you say it together. A learner who says a apple is looking at the letter. Let them hear the sound.",
  },
  there: {
    title: "there is / are",
    action:
      "Build it from the classroom: There is one teacher. There are many chairs. For a learner who chose They is, two lines: There = there is something there, They = they. Separate singular and plural on the same day, with a picture.",
  },
  can: {
    title: "can",
    action:
      "Three pictures: Birds can fly. Fish can swim. I can swim. If you hear cans or can to, show that the verb stays in the base form. can't is a separate lesson after this check.",
  },
  prep: {
    title: "in / on / under",
    action:
      "Put the pen in the box, on the box, and under the box. One question: Where is the pen? The next day, open the interview picture. The cat is on the chair. The ball is under the table. Do not add another preposition.",
  },
  question: {
    title: "Question order",
    action:
      "The last sixty seconds of every lesson: Ask me a question. Week one, keep the model: What's your favourite colour? Week two, whisper the model. Week three, wait. For What your name?, three boxes on the board: What / is / your name? Do not make a game of swapping the boxes. Build the right order three times.",
  },
  negation: {
    title: "Negative: don't like",
    action:
      "Have them mark the sentence in the text in two colours: like in green, don't like in red. A spoken pair: What do you like? What don't you like? If they say No like, say I don't like fish once. Do not ask for a long sentence.",
  },
  vocab: {
    title: "Word set",
    action:
      "Do not add the next unit's words until the weak set is closed. Eight pictures, four days: name, match, use in a sentence, speaking question.",
  },
  "reading-time": {
    title: "Time phrase",
    action:
      "After school and On Sunday do two jobs in the same text. The learner circles the time phrase and draws a line to the action. Then ask: On Sunday, does Maya play football? If they say no, the split has started.",
  },
  "reading-detail": {
    title: "Reading the text",
    action:
      "Before any pattern work, have them read the text beside you, with no timer. If they can find the detail, the problem was time. If they cannot, read the sentence together and underline the answer line. Do not run a guessing race.",
  },
  pronunciation: {
    title: "Being understood",
    action:
      "Work only on the sound that blocks the meaning. If the final consonant drops, cat, book, milk — hold the final sound with a hand movement. For w/v, window and very. If you can understand them, this is not a class priority. At this age the aim of accent work is being understood.",
  },
  interaction: {
    title: "Asking a question",
    action:
      "Three weeks for a learner who needs a model. Week one, you say the question and they repeat it. Week two, whisper it. Week three, wait. Do not say the score to their face.",
  },
  communication: {
    title: "Answering",
    action:
      "Silence and a switch to Turkish are different. If they are silent, make the backup a yes/no question: Do you like cats? If they switch to Turkish, say in English? once. The second time, note it and move on. Do not read the speaking note out loud.",
  },
}

export const themeOrder: Theme[] = [
  "foundation",
  "pronoun",
  "be",
  "third",
  "plural",
  "article",
  "there",
  "can",
  "prep",
  "question",
  "negation",
  "vocab",
  "reading-time",
  "reading-detail",
  "pronunciation",
  "interaction",
  "communication",
]

export const paperThemes: Theme[] = [
  "pronoun",
  "be",
  "third",
  "plural",
  "article",
  "there",
  "can",
  "prep",
  "question",
  "negation",
  "reading-time",
]

export const part1Script =
  "This is not a mark. I want to see what you know. The instructions are short. I will say them once, and I will not translate each question. Task 1: look at the pictures and write the letter of the word. Task 2: read about Maya quietly and circle the right answer. Task 3: look at the picture and mark the word that completes the sentence. Task 4: circle the right word. Leave a question blank if you are not sure. Do not spend a long time guessing. Do not ask what a question means. I want to see that too. You have twenty-five minutes. Start."

export const sceneKey = [
  "The cat is on the chair: on the chair.",
  "The ball is under the table: under the table.",
  "The child is reading a book: He is reading.",
  "There is a sun in the window. Not a required answer.",
]

export const pictureLabels: Record<PictureId, string> = {
  rabbit: "rabbit",
  window: "window",
  book: "book",
  bread: "bread",
  dress: "dress",
  foot: "foot",
  swim: "swim",
  rain: "rain",
  grandmother: "grandmother",
  ruler: "ruler",
  shoes: "shoes",
  breakfast: "breakfast",
  bed: "bed",
  bird: "bird",
  pencil: "pencil",
  snow: "snow",
  apple: "apple",
  "two-cats": "two cats",
  "cat-in-box": "cat in a box",
  maya: "Maya",
}
