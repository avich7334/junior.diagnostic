export type OralQuestion = {
  say: string
  expected: string
  listen: string
  backup?: string
}

export type OralScene = {
  id: "room" | "classroom" | "park" | "kitchen" | "bedroom" | "clothes"
  code: string
  title: string
  note: string
  questions: OralQuestion[]
}

export const warmUp: OralQuestion[] = [
  {
    say: "Hello. What's your name?",
    expected: "Maya. / I'm Maya.",
    listen: "The name is enough. Do not wait for a full sentence.",
    backup: "Say their name from the list and ask Are you …?",
  },
  {
    say: "How old are you?",
    expected: "I'm nine. / I am ten.",
    listen: "I have nine is a transfer. Nine alone is a relevant answer.",
    backup: "Are you nine? Are you ten?",
  },
  {
    say: "How are you today?",
    expected: "I'm fine. / I'm happy.",
    listen: "Not understanding the question is a communication note.",
    backup: "Are you happy? Are you OK?",
  },
  {
    say: "Who is in your family?",
    expected: "My mum, my dad and my sister.",
    listen: "A family word. Tick he/she if it comes on its own.",
    backup: "Tell me one person in your family.",
  },
  {
    say: "How many people are in your family?",
    expected: "Four. / There are four people.",
    listen: "A number. Note a plural if it comes on its own.",
    backup: "Two? Three? Four?",
  },
  {
    say: "What food do you like?",
    expected: "I like apples.",
    listen: "like + a food. One word is still a relevant answer.",
    backup: "Do you like apples? Do you like milk?",
  },
  {
    say: "What food don't you like?",
    expected: "I don't like fish.",
    listen: "No like / not like is a broken negative.",
    backup: "Do you like fish?",
  },
  {
    say: "What do you do after school?",
    expected: "I play football. / I go home.",
    listen: "If the subject is I, I plays is not a 3rd-person error.",
    backup: "Do you play football? Do you watch TV?",
  },
  {
    say: "Can you swim?",
    expected: "Yes, I can. / No, I can't.",
    listen: "cans, can to.",
  },
  {
    say: "What's your favourite colour?",
    expected: "Blue. / My favourite colour is blue.",
    listen: "A colour word.",
  },
  {
    say: "Have you got a pet?",
    expected: "Yes, I have a cat. / No.",
    listen: "An animal word. No is enough if they have none.",
  },
  {
    say: "Now you ask me a question.",
    expected: "What's your name? / How old are you?",
    listen: "Wait five seconds. If you give a model, interaction is 1 at most.",
    backup: "Ask me, what's your favourite colour?",
  },
]

export const anyPicture: OralQuestion[] = [
  {
    say: "Look at the picture. What can you see?",
    expected: "I can see a boy and a cat. / There is a cat.",
    listen: "An object name. Write there is/are or can if it comes on its own.",
  },
  {
    say: "Tell me more. What else can you see?",
    expected: "A book. A ball. A window.",
    listen: "Does a second and third word come, or do they stay on one object?",
  },
  {
    say: "How many people can you see?",
    expected: "One. / Two. / There are two people.",
    listen: "Number + plural. Note one people.",
  },
  {
    say: "What colour is this? (point to one object)",
    expected: "It's red. / Red.",
    listen: "Colour. It's may drop.",
  },
  {
    say: "Where is it?",
    expected: "On the table. / Under the chair.",
    listen: "in / on / under. A point is not a place. Wait for the word, then note it.",
  },
  {
    say: "Is it big or small?",
    expected: "It's big. / Small.",
    listen: "An adjective. Move on if they do not know it.",
  },
  {
    say: "What is he doing? / What is she doing?",
    expected: "He is reading. / She is cooking. / Sleeping.",
    listen: "The action word carries the meaning. If -ing is missing, write it as grammar and do not break communication. he/she.",
  },
  {
    say: "Is there a cat?",
    expected: "Yes, there is. / No, there isn't.",
    listen: "No if it is not in the picture. Note an invention.",
  },
  {
    say: "Point to the ball. What is this?",
    expected: "It's a ball. / A ball.",
    listen: "Naming. a/an.",
  },
  {
    say: "What is next to the boy?",
    expected: "A chair. / A dog. / A table.",
    listen: "They may not know next to. Naming the thing beside it is enough.",
  },
  {
    say: "What is on the table?",
    expected: "Apples. / A book. / Nothing.",
    listen: "on. It changes with the picture.",
  },
  {
    say: "What is under the table?",
    expected: "A cat. / A ball. / The shoes.",
    listen: "under. A preposition if it is mixed with on.",
  },
  {
    say: "Count the apples. How many?",
    expected: "Three. / There are three apples.",
    listen: "A number. three apple is a missing plural.",
  },
  {
    say: "Who is this?",
    expected: "A boy. / A teacher. / A girl.",
    listen: "Who. Follow with he/she: She is a girl.",
  },
  {
    say: "What is he wearing? / What is she wearing?",
    expected: "A red T-shirt. / A yellow dress.",
    listen: "Clothes + colour. If they do not know wearing, ask What colour is his shirt?",
  },
  {
    say: "Do you like this picture?",
    expected: "Yes, I do. / No, I don't.",
    listen: "A short opinion. Do not push for a reason.",
  },
]

export const scenes: OralScene[] = [
  {
    id: "room",
    code: "A",
    title: "The living room",
    note: "A child is sitting on the rug, reading a book. An orange cat is on the green chair. A red ball is under the brown table, between the legs. There is a sun in the window.",
    questions: [
      { say: "Look at the picture. What can you see?", expected: "I can see a boy, a cat and a ball.", listen: "At least two objects. there is / I can see." },
      { say: "How many people are there?", expected: "One. / There is one boy.", listen: "A number." },
      { say: "Is it a boy or a girl?", expected: "A boy. / He is a boy.", listen: "boy. Then he." },
      { say: "What is the boy doing?", expected: "He is reading. / Reading a book.", listen: "read/reading. boy book counts as a pile. she is the pronoun." },
      { say: "What is he holding?", expected: "A book.", listen: "book. a may be missing." },
      { say: "Is he sleeping?", expected: "No. / No, he isn't. He is reading.", listen: "Negative. The meaning no is enough." },
      { say: "What colour is the cat?", expected: "Orange. / It's orange.", listen: "Colour. If they say yellow, note it. Do not count it as fully right." },
      { say: "Where is the cat?", expected: "On the chair. / The cat is on the chair.", listen: "on. in the chair or under is the preposition." },
      { say: "Is the cat under the chair?", expected: "No. It's on the chair.", listen: "If they say yes, they misread the picture or do not know under." },
      { say: "Where is the ball?", expected: "Under the table.", listen: "under. on the table is wrong." },
      { say: "What colour is the ball?", expected: "Red.", listen: "Colour." },
      { say: "Is the ball on the table?", expected: "No. It's under the table.", listen: "The on/under split." },
      { say: "What can you see in the window?", expected: "The sun. / It's sunny.", listen: "sun. It's raining means they are not looking at the picture." },
      { say: "Is there a dog?", expected: "No.", listen: "Invention. No, there isn't is strong." },
      { say: "What colour is the chair?", expected: "Green.", listen: "Colour." },
      { say: "Tell me three things in the picture.", expected: "A boy, a cat and a ball.", listen: "Three words, or one word?" },
    ],
  },
  {
    id: "classroom",
    code: "B",
    title: "The classroom",
    note: "The teacher is pointing at A B C on the board. A boy in a blue shirt is writing at a desk. A red bag is on the desk. A yellow pencil is on the floor under the desk. Two books are on the small table to the right. There is a clock on the wall.",
    questions: [
      { say: "What room is this?", expected: "A classroom. / It's a school.", listen: "classroom or school. If they do not know it, ask What can you see?" },
      { say: "What can you see?", expected: "A teacher, a boy, a bag and books.", listen: "Two objects is enough." },
      { say: "How many people are there?", expected: "Two.", listen: "two people. two person is also heard." },
      { say: "Is the teacher a man or a woman?", expected: "A woman. / She is a woman.", listen: "woman/girl. she." },
      { say: "What is the teacher doing?", expected: "She is teaching. / Pointing at the board.", listen: "An action. She is pointing is accepted. He is the pronoun." },
      { say: "What is on the board?", expected: "A, B, C. / Letters.", listen: "A letter. They do not have to know ABC. letters or the board is enough." },
      { say: "What is the boy doing?", expected: "He is writing.", listen: "write/writing. reading means they mixed the action." },
      { say: "What colour is his shirt?", expected: "Blue.", listen: "his. her shirt is the pronoun." },
      { say: "Where is the bag?", expected: "On the desk.", listen: "on." },
      { say: "What colour is the bag?", expected: "Red.", listen: "Colour." },
      { say: "Where is the pencil?", expected: "Under the desk.", listen: "under. on the desk is wrong. The bag is there." },
      { say: "What colour is the pencil?", expected: "Yellow.", listen: "Colour." },
      { say: "How many books are there?", expected: "Two. / There are two books.", listen: "two book is a missing plural. there are." },
      { say: "Where are the books?", expected: "On the small table.", listen: "on." },
      { say: "Is there a clock?", expected: "Yes. / Yes, there is.", listen: "there is." },
      { say: "Can you see a cat?", expected: "No.", listen: "An invention check." },
    ],
  },
  {
    id: "park",
    code: "C",
    title: "The park",
    note: "A sunny park. A red bird is in the tree. A blue hat is on the bench. A girl in a yellow dress, with a brown dog next to her. A boy in a green shirt is running toward a red ball on the grass. The ball is not in his hand.",
    questions: [
      { say: "Where are the children?", expected: "In the park. / Outside.", listen: "park. garden is accepted. Note it." },
      { say: "What can you see?", expected: "A boy, a girl, a dog, a tree and a ball.", listen: "How many objects do they name?" },
      { say: "How many children are there?", expected: "Two.", listen: "two child / two children." },
      { say: "What colour is the girl's dress?", expected: "Yellow.", listen: "Colour + dress." },
      { say: "What is next to the girl?", expected: "A dog.", listen: "dog. Naming the dog is enough if they do not know next to." },
      { say: "What colour is the dog?", expected: "Brown.", listen: "Colour." },
      { say: "Is the dog big or small?", expected: "Small. / It's small.", listen: "An adjective. Move on if they are not sure." },
      { say: "Where is the bird?", expected: "In the tree. / On the tree.", listen: "in the tree is expected. on the tree is also accepted in this picture. Not on the ground." },
      { say: "What colour is the bird?", expected: "Red.", listen: "Colour." },
      { say: "Where is the hat?", expected: "On the bench.", listen: "on. hat/cap." },
      { say: "What colour is the hat?", expected: "Blue.", listen: "Colour." },
      { say: "What is the boy doing?", expected: "He is running. / He is playing with a ball.", listen: "run or play. They should not say they are holding the ball. The ball is on the grass." },
      { say: "Where is the ball?", expected: "On the grass. / Next to the boy.", listen: "Place. in his hand is wrong." },
      { say: "What colour is the ball?", expected: "Red.", listen: "Colour." },
      { say: "Is it raining?", expected: "No. It's sunny.", listen: "Weather. sun." },
      { say: "Can you see a cat in the park?", expected: "No.", listen: "Invention." },
    ],
  },
  {
    id: "kitchen",
    code: "D",
    title: "The kitchen",
    note: "Mum is cooking at the stove. On the table: three red apples, a glass of milk, and bread. An orange cat is under the table. The cat is not on the table.",
    questions: [
      { say: "What room is this?", expected: "A kitchen.", listen: "kitchen. home is a weak accept." },
      { say: "What can you see?", expected: "A woman, apples, milk, bread and a cat.", listen: "Food words." },
      { say: "Who is in the kitchen?", expected: "A woman. / Mum.", listen: "woman/mum. she." },
      { say: "What is she doing?", expected: "She is cooking.", listen: "cook/cooking. he is the pronoun." },
      { say: "How many apples are there?", expected: "Three. / There are three apples.", listen: "three apple is the plural. there are." },
      { say: "What colour are the apples?", expected: "Red.", listen: "Plural colour: are. is may also be heard." },
      { say: "Where are the apples?", expected: "On the table.", listen: "on." },
      { say: "Is there any milk?", expected: "Yes. / Yes, there is.", listen: "milk. Write it if they link it to drink." },
      { say: "Where is the milk?", expected: "On the table.", listen: "on." },
      { say: "Can you see bread?", expected: "Yes.", listen: "bread." },
      { say: "Where is the cat?", expected: "Under the table.", listen: "under. on the table is wrong." },
      { say: "What colour is the cat?", expected: "Orange.", listen: "Colour." },
      { say: "Is the cat on the table?", expected: "No. It's under the table.", listen: "on/under." },
      { say: "How many people are there?", expected: "One.", listen: "A number." },
      { say: "Do you like apples?", expected: "Yes, I do. / No, I don't.", listen: "A personal bridge. don't." },
      { say: "What do you drink in the morning?", expected: "I drink milk.", listen: "drink + a drink. bread is a collocation error." },
    ],
  },
  {
    id: "bedroom",
    code: "E",
    title: "The bedroom",
    note: "Night. A moon in the window. The child is in bed, eyes closed, sleeping. A white cat is on the bed. Red shoes are under the bed. A green bag is on the chair. A book is on the floor, next to the bed.",
    questions: [
      { say: "What room is this?", expected: "A bedroom.", listen: "bedroom. room is a weak accept." },
      { say: "What can you see?", expected: "A boy, a bed, a cat, shoes and a bag.", listen: "How many objects." },
      { say: "What is the boy doing?", expected: "He is sleeping.", listen: "sleep/sleeping. reading is wrong. The book is on the floor, not in his hand." },
      { say: "Is he reading?", expected: "No. He is sleeping.", listen: "Negative." },
      { say: "Where is the boy?", expected: "In the bed. / On the bed.", listen: "in bed is natural. on the bed is also accepted in this picture." },
      { say: "Where is the cat?", expected: "On the bed.", listen: "on." },
      { say: "What colour is the cat?", expected: "White.", listen: "Colour." },
      { say: "Where are the shoes?", expected: "Under the bed.", listen: "under. Plural shoes." },
      { say: "What colour are the shoes?", expected: "Red.", listen: "Colour." },
      { say: "Where is the bag?", expected: "On the chair.", listen: "on. Saying chair for the chair is a separate word." },
      { say: "What colour is the bag?", expected: "Green.", listen: "Colour." },
      { say: "Where is the book?", expected: "On the floor. / Next to the bed.", listen: "On the floor. in his hand is wrong." },
      { say: "Is it day or night?", expected: "Night.", listen: "moon/night. sunny means they are not looking at the window." },
      { say: "How many cats are there?", expected: "One.", listen: "A number." },
      { say: "Is the cat under the bed?", expected: "No. The shoes are under the bed.", listen: "Two places at once. Mixing them is the preposition." },
      { say: "What do you do at night?", expected: "I sleep. / I go to bed.", listen: "A personal bridge. Routine." },
    ],
  },
  {
    id: "clothes",
    code: "F",
    title: "Clothes",
    note: "Two children standing. Boy: yellow hat, red T-shirt, blue trousers, black shoes. Girl: pink dress, white shoes. A small brown dog between them.",
    questions: [
      { say: "What can you see?", expected: "A boy, a girl and a dog.", listen: "Three figures." },
      { say: "How many children are there?", expected: "Two.", listen: "A number." },
      { say: "What is the boy wearing?", expected: "A hat, a red T-shirt and blue trousers.", listen: "Clothes words. wearing is not required. The names of the clothes are enough." },
      { say: "What colour is his T-shirt?", expected: "Red.", listen: "his." },
      { say: "What colour are his trousers?", expected: "Blue.", listen: "trousers/pants. Plural." },
      { say: "What colour are his shoes?", expected: "Black.", listen: "Colour." },
      { say: "Has he got a hat?", expected: "Yes.", listen: "hat/cap." },
      { say: "What colour is his hat?", expected: "Yellow.", listen: "Colour." },
      { say: "What is the girl wearing?", expected: "A pink dress.", listen: "dress. she." },
      { say: "What colour is her dress?", expected: "Pink.", listen: "her. his dress is the pronoun." },
      { say: "What colour are her shoes?", expected: "White.", listen: "Colour." },
      { say: "Where is the dog?", expected: "Between the children. / Next to the girl.", listen: "Place. If they do not know between, next to is accepted." },
      { say: "What colour is the dog?", expected: "Brown.", listen: "Colour." },
      { say: "Is the dog big or small?", expected: "Small.", listen: "An adjective." },
      { say: "Point to the dress. What is this?", expected: "A dress.", listen: "Naming." },
      { say: "What are you wearing today?", expected: "A blue T-shirt and black shoes.", listen: "Their own clothes. If you hear I wearing or I am wear, note it and take the meaning." },
    ],
  },
]

export const oralQuestionCount =
  warmUp.length + anyPicture.length + scenes.reduce((sum, scene) => sum + scene.questions.length, 0)
