import { RoomScene } from "@/components/pictures"
import type { OralScene } from "@/lib/oral"

const ink = "#243044"
const skin = "#f3d2b0"
const hair = "#3a2e2a"
const navy = "#355c7d"
const coral = "#d65a45"
const sage = "#3e7c68"
const wood = "#c4894a"
const sky = "#d7ebf7"
const sun = "#f2c14e"
const cat = "#e39b4a"
const grass = "#8fbf78"
const night = "#243652"

const stroke = {
  stroke: ink,
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

function ClassroomScene() {
  return (
    <svg className="h-full w-full" viewBox="0 0 560 340" role="img" aria-label="Classroom: teacher at the board, boy writing, bag on the desk, pencil on the floor">
      <rect width="560" height="340" fill="#f7f1e6" />
      <rect y="248" width="560" height="92" fill="#eadcc8" />
      <g {...stroke} fill="none">
        <rect x="18" y="28" width="168" height="112" rx="4" fill="#243c34" />
        <text x="42" y="98" fill="#f4efe4" stroke="none" fontSize="42" fontFamily="Georgia, serif">
          A B C
        </text>

        <circle cx="232" cy="108" r="20" fill={skin} />
        <path d="M214 100c2-22 36-22 38 2v10h-38v-12z" fill={hair} />
        <circle cx="225" cy="108" r="1.7" fill={ink} stroke="none" />
        <circle cx="239" cy="108" r="1.7" fill={ink} stroke="none" />
        <path d="M214 128c6 36 10 78 8 112h48c-2-40 2-78 10-112" fill={coral} />
        <path d="M214 150c-16-8-40-28-58-62" />
        <circle cx="156" cy="82" r="5" fill={skin} />

        <path d="M318 214h148v16H318z" fill={wood} />
        <path d="M332 230v48M450 230v48" />
        <rect x="338" y="196" width="46" height="22" rx="2" fill="#fffdf8" />
        <path d="M346 204h30M346 210h22" />
        <circle cx="392" cy="156" r="18" fill={skin} />
        <path d="M376 148c1-16 32-16 34 2v8h-34v-10z" fill={hair} />
        <circle cx="386" cy="156" r="1.6" fill={ink} stroke="none" />
        <circle cx="398" cy="156" r="1.6" fill={ink} stroke="none" />
        <path d="M372 174h44l8 40h-60z" fill={navy} />
        <path d="M404 188l22 8" />
        <path d="M424 190l10 16" strokeWidth="3" />

        <path d="M430 186h34v28h-34z" fill={coral} />
        <path d="M438 186c4-12 18-12 22 0" />
        <path d="M436 196h22" />

        <path d="M368 268l42-8" stroke={sun} strokeWidth="8" />
        <path d="M368 268l42-8" />
        <path d="M408 260l8-2" stroke={coral} strokeWidth="6" />
        <path d="M364 270l-8 2" stroke={ink} strokeWidth="5" />

        <path d="M488 228h62v12h-62z" fill={wood} />
        <path d="M498 240v28M540 240v28" />
        <path d="M496 196h22v32h-22z" fill={navy} />
        <path d="M522 200h22v28h-22z" fill={coral} />
        <path d="M507 196v32M533 200v28" stroke="#fff8ee" />

        <circle cx="508" cy="78" r="28" fill="#fffdf8" />
        <path d="M508 78V60M508 78h16" />
        <circle cx="508" cy="78" r="2" fill={ink} stroke="none" />
      </g>
    </svg>
  )
}

function ParkScene() {
  return (
    <svg className="h-full w-full" viewBox="0 0 560 340" role="img" aria-label="Park: bird in the tree, hat on the bench, girl and dog, boy running toward the ball">
      <rect width="560" height="210" fill={sky} />
      <rect y="210" width="560" height="130" fill={grass} />
      <circle cx="500" cy="46" r="24" fill={sun} stroke={ink} strokeWidth="2.2" />
      <g {...stroke} fill="none">
        <path d="M46 210V128" stroke={wood} strokeWidth="10" />
        <ellipse cx="48" cy="108" rx="58" ry="46" fill={sage} />
        <ellipse cx="78" cy="96" rx="14" ry="9" fill={coral} />
        <path d="M90 94l10-2" />
        <circle cx="74" cy="94" r="1.3" fill={ink} stroke="none" />

        <path d="M156 148h100v10H156z" fill={wood} />
        <path d="M168 158v30M244 158v30" />
        <path d="M150 188h110v14H150z" fill={wood} />
        <path d="M162 202v28M246 202v28" />
        <ellipse cx="214" cy="186" rx="30" ry="9" fill={navy} />
        <path d="M196 186c0-24 36-24 36 0z" fill="#6ea0d4" />
        <path d="M214 162v-8" />

        <circle cx="318" cy="168" r="16" fill={skin} />
        <path d="M304 160c2-16 28-18 32 0v8h-32v-8z" fill={hair} />
        <circle cx="312" cy="168" r="1.5" fill={ink} stroke="none" />
        <circle cx="324" cy="168" r="1.5" fill={ink} stroke="none" />
        <path d="M304 186h28l14 64h-56z" fill={sun} />
        <path d="M312 186h16" />
        <path d="M300 250v28M336 250v28" />

        <ellipse cx="268" cy="236" rx="22" ry="12" fill="#8a5a32" />
        <circle cx="250" cy="226" r="10" fill="#8a5a32" />
        <path d="M242 218l-4-8 8 4M258 218l4-8-8 4" fill="#8a5a32" />
        <circle cx="246" cy="226" r="1.3" fill={ink} stroke="none" />
        <path d="M286 232c10 2 14 8 10 12" />

        <circle cx="456" cy="148" r="16" fill={skin} />
        <path d="M442 140c1-14 28-14 30 2v8h-30v-10z" fill={hair} />
        <path d="M432 166l40 16-8 34-42-14z" fill={sage} />
        <path d="M438 176l-24-6M468 180l22-14" />
        <path d="M438 208l-30 28M470 212l36 22" />
        <circle cx="530" cy="252" r="16" fill={coral} />
      </g>
    </svg>
  )
}

function KitchenScene() {
  return (
    <svg className="h-full w-full" viewBox="0 0 560 340" role="img" aria-label="Kitchen: mum cooking, three apples, milk and bread on the table, cat under the table">
      <rect width="560" height="340" fill="#f7f1e6" />
      <rect y="250" width="560" height="90" fill="#eadcc8" />
      <g {...stroke} fill="none">
        <rect x="28" y="150" width="78" height="100" rx="4" fill="#d9d3c8" />
        <circle cx="52" cy="176" r="8" />
        <circle cx="82" cy="176" r="8" />
        <path d="M46 132h28v22H46z" fill="#c5cdd4" />
        <path d="M52 132c2-16 4-16 6 0M62 128c2-18 4-18 6 0" />

        <circle cx="156" cy="112" r="20" fill={skin} />
        <path d="M138 104c2-20 36-22 40 0v10h-40v-10z" fill={hair} />
        <circle cx="149" cy="112" r="1.6" fill={ink} stroke="none" />
        <circle cx="163" cy="112" r="1.6" fill={ink} stroke="none" />
        <path d="M136 134h44l10 116h-64z" fill={navy} />
        <path d="M148 150h20v36H148z" fill="#fffdf8" />
        <path d="M136 156c-20 8-36 4-48-16" />

        <path d="M250 176h250v16H250z" fill={wood} />
        <path d="M268 192v68M480 192v68" />

        <g transform="translate(268 122)">
          <path d="M18 6c3-6 9-6 11-3" />
          <ellipse cx="28" cy="4" rx="7" ry="3.5" fill={sage} />
          <path d="M18 14c-14 2-20 14-18 28 2 12 12 16 18 16s16-4 18-16c2-14-4-26-18-28z" fill={coral} />
        </g>
        <g transform="translate(316 122)">
          <path d="M18 6c3-6 9-6 11-3" />
          <ellipse cx="28" cy="4" rx="7" ry="3.5" fill={sage} />
          <path d="M18 14c-14 2-20 14-18 28 2 12 12 16 18 16s16-4 18-16c2-14-4-26-18-28z" fill={coral} />
        </g>
        <g transform="translate(364 122)">
          <path d="M18 6c3-6 9-6 11-3" />
          <ellipse cx="28" cy="4" rx="7" ry="3.5" fill={sage} />
          <path d="M18 14c-14 2-20 14-18 28 2 12 12 16 18 16s16-4 18-16c2-14-4-26-18-28z" fill={coral} />
        </g>

        <path d="M400 128h22l4 48h-30z" fill="#f7f7f7" />
        <path d="M396 128h30" />
        <path d="M404 146h16" stroke="#d5e4f2" />

        <path d="M440 150c0-16 14-24 32-24s32 8 32 24v8H440v-8z" fill="#f0c27a" />
        <path d="M440 154h64v10H440z" fill="#e2a84a" />

        <ellipse cx="360" cy="230" rx="28" ry="16" fill={cat} />
        <circle cx="388" cy="216" r="12" fill={cat} />
        <path d="M378 206l-2-10 10 6M398 206l4-10-10 6" fill={cat} />
        <circle cx="384" cy="216" r="1.4" fill={ink} stroke="none" />
        <circle cx="394" cy="216" r="1.4" fill={ink} stroke="none" />
        <path d="M336 234c-16 8-18 16-8 18" />
      </g>
    </svg>
  )
}

function BedroomScene() {
  return (
    <svg className="h-full w-full" viewBox="0 0 560 340" role="img" aria-label="Bedroom: night, child sleeping, white cat on the bed, shoes under the bed">
      <rect width="560" height="340" fill={night} />
      <rect y="250" width="560" height="90" fill="#3a322c" />
      <g {...stroke} fill="none">
        <rect x="24" y="28" width="86" height="70" rx="3" fill="#1a2744" />
        <path d="M67 28v70M24 63h86" stroke="#8ea0b8" />
        <circle cx="48" cy="52" r="12" fill="#f4e7b0" stroke="#f4e7b0" />

        <path d="M118 168h250v18H118z" fill="#c9b59a" />
        <path d="M130 186v78M348 186v78" />
        <path d="M118 150h28v70h-28z" fill="#b08968" />
        <path d="M146 168h210v40H146z" fill="#d7e4f2" />
        <path d="M150 168h36v26h-36z" fill="#fffdf8" />

        <circle cx="176" cy="158" r="16" fill={skin} />
        <path d="M162 152c1-14 28-14 30 2" fill={hair} />
        <path d="M168 156c2 3 4 3 6 0M184 156c2 3 4 3 6 0" />
        <path d="M192 168h120v40H192z" fill={navy} />

        <ellipse cx="300" cy="176" rx="26" ry="14" fill="#fffdf8" />
        <circle cx="324" cy="166" r="11" fill="#fffdf8" />
        <path d="M316 156l-2-8 8 5M332 156l3-8-8 5" fill="#fffdf8" />
        <circle cx="320" cy="166" r="1.3" fill={ink} stroke="none" />
        <circle cx="330" cy="166" r="1.3" fill={ink} stroke="none" />
        <path d="M278 180c-12 6-14 12-6 14" />

        <g transform="translate(150 200) scale(1.15)">
          <path d="M8 40c2-8 10-12 22-12 10 0 20 4 26 10 2 4 0 8-4 8H14c-6 0-8-2-6-6z" fill={coral} />
          <path d="M10 46h42" stroke="#fff8ee" strokeWidth="3" />
          <path d="M18 32h7M30 31h7" />
        </g>
        <g transform="translate(230 200) scale(1.15)">
          <path d="M8 40c2-8 10-12 22-12 10 0 20 4 26 10 2 4 0 8-4 8H14c-6 0-8-2-6-6z" fill={coral} />
          <path d="M10 46h42" stroke="#fff8ee" strokeWidth="3" />
          <path d="M18 32h7M30 31h7" />
        </g>

        <path d="M500 150h12v52h-12z" fill={wood} />
        <path d="M534 150h12v52h-12z" fill={wood} />
        <path d="M496 150h54v16H496z" fill={wood} />
        <path d="M486 202h76v12H486z" fill={wood} />
        <path d="M498 214v36M548 214v36" />
        <path d="M508 168h32v34H508z" fill={sage} />
        <path d="M516 168c2-12 16-12 18 0" />

        <path d="M358 252h44v30H358z" fill="#fffdf8" />
        <path d="M402 252h44v30H402z" fill="#fffdf8" />
        <path d="M358 252h10v30h-10z" fill={coral} />
        <path d="M436 252h10v30h-10z" fill={navy} />
        <path d="M402 252v30" strokeWidth="3" />
        <path d="M374 260h20M374 266h16M374 272h18M410 260h20M410 266h16M410 272h14" />
      </g>
    </svg>
  )
}

function ClothesScene() {
  return (
    <svg className="h-full w-full" viewBox="0 0 560 340" role="img" aria-label="Clothes: boy in a hat, girl in a dress, small dog between them">
      <rect width="560" height="340" fill="#f7f1e6" />
      <rect y="268" width="560" height="72" fill="#eadcc8" />
      <g {...stroke} fill="none">
        <circle cx="170" cy="112" r="20" fill={skin} />
        <path d="M148 96c2-24 46-24 48 4v8H148z" fill={sun} />
        <path d="M136 106h70v8H136z" fill={sun} />
        <circle cx="162" cy="120" r="1.7" fill={ink} stroke="none" />
        <circle cx="178" cy="120" r="1.7" fill={ink} stroke="none" />
        <path d="M174 128c-2 2-6 2-8 0" />
        <path d="M142 132h56l6 58H136z" fill={coral} />
        <path d="M136 136c-14 8-16 20-8 28h16l-8-28z" fill={coral} />
        <path d="M198 136c14 8 16 20 8 28h-16l8-28z" fill={coral} />
        <path d="M148 190h22v62h-22z" fill={navy} />
        <path d="M174 190h22v62h-22z" fill={navy} />
        <path d="M148 248h24v12h-24z" fill="#1c2430" />
        <path d="M174 248h24v12h-24z" fill="#1c2430" />

        <circle cx="400" cy="108" r="20" fill={skin} />
        <path d="M380 100c2-22 40-22 42 4v16h-42v-20z" fill={hair} />
        <circle cx="392" cy="108" r="1.7" fill={ink} stroke="none" />
        <circle cx="408" cy="108" r="1.7" fill={ink} stroke="none" />
        <path d="M396 116c-2 2-6 2-8 0" />
        <path d="M378 132h44l4 16H374z" fill="#f7c1cf" />
        <path d="M366 146c8 2 10 10 6 16h-10l4-16z" fill="#f4a4b8" />
        <path d="M434 146c-8 2-10 10-6 16h10l-4-16z" fill="#f4a4b8" />
        <path d="M372 156h56l16 92H356z" fill="#f4a4b8" />
        <path d="M368 244h22v14h-22z" fill="#fffdf8" />
        <path d="M412 244h22v14h-22z" fill="#fffdf8" />

        <ellipse cx="286" cy="228" rx="28" ry="16" fill="#8a5a32" />
        <circle cx="262" cy="214" r="13" fill="#8a5a32" />
        <path d="M252 204l-4-10 10 6M272 204l5-10-10 6" fill="#8a5a32" />
        <circle cx="256" cy="214" r="1.5" fill={ink} stroke="none" />
        <circle cx="268" cy="214" r="1.5" fill={ink} stroke="none" />
        <path d="M248 224h8M310 224c12 4 16 12 10 16" />
        <path d="M270 242v22M302 242v22" />
      </g>
    </svg>
  )
}

const scenes = {
  classroom: ClassroomScene,
  park: ParkScene,
  kitchen: KitchenScene,
  bedroom: BedroomScene,
  clothes: ClothesScene,
}

export function ExamScene({
  id,
  className,
}: {
  id: OralScene["id"]
  className?: string
}) {
  if (id === "room") return <RoomScene className={className} />
  const Draw = scenes[id]
  return (
    <div className={className}>
      <Draw />
    </div>
  )
}
