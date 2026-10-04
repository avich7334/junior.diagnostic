import type { PictureId } from "@/lib/types"

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

const line = {
  fill: "none",
  stroke: ink,
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

function Rabbit() {
  return (
    <g {...line}>
      <ellipse cx="28" cy="22" rx="6" ry="14" fill="#f7f1e6" />
      <ellipse cx="52" cy="22" rx="6" ry="14" fill="#f7f1e6" />
      <ellipse cx="28" cy="24" rx="3" ry="8" fill="#f3c1c1" stroke="none" />
      <ellipse cx="52" cy="24" rx="3" ry="8" fill="#f3c1c1" stroke="none" />
      <ellipse cx="40" cy="46" rx="18" ry="16" fill="#f7f1e6" />
      <circle cx="33" cy="44" r="1.6" fill={ink} stroke="none" />
      <circle cx="47" cy="44" r="1.6" fill={ink} stroke="none" />
      <path d="M37 50h6" />
      <path d="M40 50v3" />
      <path d="M22 48h8M50 48h8" />
    </g>
  )
}

function WindowPic() {
  return (
    <g {...line}>
      <rect x="18" y="14" width="44" height="48" rx="2" fill={sky} />
      <path d="M40 14v48M18 38h44" />
      <rect x="14" y="62" width="52" height="6" rx="1" fill="#efe6d6" />
    </g>
  )
}

function Book() {
  return (
    <g {...line}>
      <path d="M14 22h24v40H14a4 4 0 0 1-4-4V26a4 4 0 0 1 4-4z" fill={coral} />
      <path d="M42 22h24a4 4 0 0 1 4 4v32a4 4 0 0 1-4 4H42V22z" fill={navy} />
      <path d="M40 20v44" strokeWidth="2.4" />
      <path d="M22 32h10M22 38h10M48 32h10M48 38h8" stroke="#fff8ee" />
    </g>
  )
}

function Bread() {
  return (
    <g {...line}>
      <path d="M12 46c0-14 12-22 28-22s28 8 28 22v6H12v-6z" fill="#f0c27a" />
      <path d="M12 46h56v8a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6v-8z" fill="#e2a84a" />
      <path d="M28 34c2 6 2 6 0 10M40 32c2 7 2 7 0 12M52 34c2 6 2 6 0 10" />
    </g>
  )
}

function Dress() {
  return (
    <g {...line}>
      <path d="M34 16c2 6 10 6 12 0" fill="none" />
      <path d="M32 20h16l2 12H30l2-12z" fill="#f7c1cf" />
      <path d="M18 30c4 2 6 8 4 12h-6l2-12z" fill={coral} />
      <path d="M62 30c-4 2-6 8-4 12h6l-2-12z" fill={coral} />
      <path d="M26 36h28l8 32H18l8-32z" fill={coral} />
      <path d="M34 36h12" />
    </g>
  )
}

function Foot() {
  return (
    <g fill={skin} stroke={ink} strokeWidth="1.8" strokeLinejoin="round">
      <ellipse cx="42" cy="48" rx="16" ry="20" />
      <ellipse cx="24" cy="34" rx="6.5" ry="8" />
      <ellipse cx="32" cy="22" rx="5.5" ry="7" />
      <ellipse cx="43" cy="18" rx="5" ry="6.5" />
      <ellipse cx="53" cy="22" rx="4.5" ry="6" />
      <ellipse cx="60" cy="30" rx="4" ry="5.5" />
    </g>
  )
}

function Swim() {
  return (
    <g {...line}>
      <path d="M4 56c8 7 16 7 24 0s16-7 24 0 16 7 24 0v16H4V56z" fill={sky} />
      <circle cx="20" cy="38" r="7" fill={skin} />
      <path d="M14 34c2-6 12-6 14 0" fill={hair} />
      <path d="M26 40c14 1 26-2 36-8" strokeWidth="3.2" />
      <path d="M34 38 44 24M50 34l8 10" />
    </g>
  )
}

function Rain() {
  return (
    <g {...line}>
      <path d="M22 40a12 12 0 0 1 2-22 14 14 0 0 1 26-2 10 10 0 0 1 12 12 12 12 0 0 1-4 12H22z" fill="#e7eef3" />
      <path d="M28 50v10M40 52v12M52 50v10" />
    </g>
  )
}

function Grandmother() {
  return (
    <g {...line}>
      <circle cx="40" cy="28" r="12" fill="#cfd0d2" />
      <circle cx="40" cy="40" r="14" fill={skin} />
      <path d="M28 36c6-8 18-8 24 0" fill="#cfd0d2" />
      <circle cx="34" cy="40" r="4" fill="none" />
      <circle cx="46" cy="40" r="4" fill="none" />
      <path d="M30 40h20" />
      <path d="M36 47c2 2 6 2 8 0" />
      <path d="M22 68c2-14 8-18 18-18s16 4 18 18" fill="#7d9a78" />
    </g>
  )
}

function Ruler() {
  return (
    <g {...line}>
      <rect x="10" y="32" width="60" height="16" rx="2" fill="#f0d7a2" />
      <path d="M18 32v8M26 32v5M34 32v8M42 32v5M50 32v8M58 32v5" />
    </g>
  )
}

function Shoes() {
  return (
    <g {...line}>
      <path d="M8 40c2-8 10-12 22-12 10 0 20 4 26 10 2 4 0 8-4 8H14c-6 0-8-2-6-6z" fill={navy} />
      <path d="M10 46h40" strokeWidth="2.6" />
      <path d="M18 34h6M28 33h6" />
      <path d="M12 54c2-8 12-12 24-12 10 0 20 4 26 10 2 4 0 8-4 8H18c-6 0-8-2-6-6z" fill={coral} />
      <path d="M14 60h42" strokeWidth="2.6" />
      <path d="M24 48h6M34 47h6" />
    </g>
  )
}

function Breakfast() {
  return (
    <g {...line}>
      <path d="M6 66h68" />
      <rect x="8" y="40" width="16" height="24" rx="2" fill="#f0d2a0" />
      <path d="M12 46h8M12 52h8" />
      <path d="M32 30h14l-2 36H34L32 30z" fill="#f7fbff" />
      <path d="M33 44h12" stroke={sky} strokeWidth="4" />
      <ellipse cx="64" cy="50" rx="8" ry="12" fill="#fffdf8" />
    </g>
  )
}

function Bed() {
  return (
    <g {...line}>
      <path d="M14 58V28h8v30" />
      <path d="M18 40h50v18H18z" fill={navy} />
      <path d="M22 40v-6h16v6" fill="#fff8ee" />
      <path d="M66 58V36" />
    </g>
  )
}

function Bird() {
  return (
    <g {...line}>
      <ellipse cx="34" cy="46" rx="16" ry="11" fill={sage} />
      <circle cx="52" cy="36" r="8" fill={sage} />
      <path d="M58 36h12l-10 4z" fill={sun} />
      <circle cx="54" cy="34" r="1.3" fill={ink} stroke="none" />
      <path d="M24 42c-12-10-16-4-14 4 6-2 10 0 14 4z" fill="#2f6a58" />
      <path d="M28 40c6-12 16-8 12 4z" fill="#2f6a58" />
      <path d="M30 56v8M40 56v8" />
    </g>
  )
}

function Pencil() {
  return (
    <g {...line}>
      <path d="M18 58l28-36 8 6-28 36z" fill={sun} />
      <path d="M46 22l8 6-4 6-8-6z" fill="#f3c1c1" />
      <path d="M18 58l6 4 4-8" fill={ink} />
    </g>
  )
}

function Snow() {
  return (
    <g {...line}>
      <path d="M16 32a10 10 0 0 1 8-14 12 12 0 0 1 22 0 9 9 0 0 1 12 10 8 8 0 0 1-4 6H16z" fill="#e7eef3" />
      <path d="M28 44v10M23 49h10M25 46l6 6M31 46l-6 6" />
      <path d="M46 48v10M41 53h10M43 50l6 6M49 50l-6 6" />
      <path d="M8 66c14-8 22-8 32 0s18 8 32 0v8H8v-8z" fill="#fff" />
    </g>
  )
}

function Apple() {
  return (
    <g {...line}>
      <path d="M40 18c4-6 10-6 12-4" />
      <ellipse cx="48" cy="16" rx="6" ry="3" fill={sage} />
      <path d="M40 24c-12 2-20 14-18 28 2 12 12 16 18 16s16-4 18-16c2-14-6-26-18-28z" fill={coral} />
    </g>
  )
}

function TwoCats() {
  return (
    <g {...line}>
      <ellipse cx="28" cy="50" rx="12" ry="10" fill={cat} />
      <circle cx="28" cy="38" r="8" fill={cat} />
      <path d="M22 32l-2-8 8 4M34 32l2-8-8 4" fill={cat} />
      <ellipse cx="54" cy="52" rx="14" ry="11" fill="#f0c27a" />
      <circle cx="56" cy="38" r="9" fill="#f0c27a" />
      <path d="M49 32l-2-9 9 5M63 32l3-9-9 5" fill="#f0c27a" />
    </g>
  )
}

function CatInBox() {
  return (
    <g {...line}>
      <path d="M14 40h52l-6 24H20L14 40z" fill="#f0d7a2" />
      <path d="M14 40l8-8h36l8 8" />
      <circle cx="40" cy="36" r="10" fill={cat} />
      <path d="M32 30l-2-8 8 4M48 30l2-8-8 4" fill={cat} />
      <circle cx="36" cy="36" r="1.2" fill={ink} stroke="none" />
      <circle cx="44" cy="36" r="1.2" fill={ink} stroke="none" />
      <path d="M18 48h44" />
    </g>
  )
}

function Maya() {
  return (
    <g {...line}>
      <circle cx="40" cy="28" r="12" fill={hair} />
      <circle cx="40" cy="36" r="13" fill={skin} />
      <path d="M28 32c2-10 22-10 24 0" fill={hair} />
      <circle cx="35" cy="36" r="1.3" fill={ink} stroke="none" />
      <circle cx="45" cy="36" r="1.3" fill={ink} stroke="none" />
      <path d="M36 42c2 2 6 2 8 0" />
      <path d="M24 70c2-16 8-20 16-20s14 4 16 20" fill={navy} />
    </g>
  )
}

const art: Record<PictureId, () => React.ReactNode> = {
  rabbit: Rabbit,
  window: WindowPic,
  book: Book,
  bread: Bread,
  dress: Dress,
  foot: Foot,
  swim: Swim,
  rain: Rain,
  grandmother: Grandmother,
  ruler: Ruler,
  shoes: Shoes,
  breakfast: Breakfast,
  bed: Bed,
  bird: Bird,
  pencil: Pencil,
  snow: Snow,
  apple: Apple,
  "two-cats": TwoCats,
  "cat-in-box": CatInBox,
  maya: Maya,
}

export function Picture({
  name,
  className,
  label = "Picture",
}: {
  name: PictureId
  className?: string
  label?: string
}) {
  const Draw = art[name]
  return (
    <svg viewBox="0 0 80 80" className={className} role="img" aria-label={label}>
      <Draw />
    </svg>
  )
}

export function RoomScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 250" className={className} role="img" aria-label="Living room: boy reading, cat on the chair, ball under the table">
      <rect width="400" height="250" fill="#f7f1e6" />
      <rect y="168" width="400" height="82" fill="#eadcc8" />
      <g stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="22" y="20" width="72" height="58" fill={sky} />
        <path d="M58 20v58M22 49h72" />
        <circle cx="46" cy="38" r="9" fill={sun} stroke={ink} />

        <ellipse cx="118" cy="198" rx="62" ry="16" fill="#e4d2b4" />
        <path d="M78 176c8 18 22 28 40 26 10-2 16-12 14-24" fill={navy} />
        <path d="M96 150h36v28H96z" fill={navy} />
        <circle cx="114" cy="128" r="16" fill={skin} />
        <path d="M100 122c1-14 28-14 30 2v8h-30v-10z" fill={hair} />
        <circle cx="108" cy="128" r="1.5" fill={ink} stroke="none" />
        <circle cx="120" cy="128" r="1.5" fill={ink} stroke="none" />
        <path d="M102 158h34v18H102z" fill="#fffdf8" />
        <path d="M119 158v18M106 164h8M124 164h8M106 170h8M124 170h8" />

        <path d="M214 168V108h16v60" fill={sage} />
        <path d="M206 156h62v14h-70l8-14z" fill={sage} />
        <path d="M214 170v28M258 170v28" />
        <ellipse cx="236" cy="146" rx="20" ry="12" fill={cat} />
        <circle cx="256" cy="136" r="10" fill={cat} />
        <path d="M248 128l-2-10 10 6M264 128l3-10-9 6" fill={cat} />
        <path d="M218 150c8 6 14 4 16-2" />

        <path d="M300 170V128" />
        <path d="M372 170V128" />
        <circle cx="336" cy="156" r="15" fill={coral} />
        <path d="M292 118h88v14H292z" fill={wood} />
      </g>
    </svg>
  )
}
