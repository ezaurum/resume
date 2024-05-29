import stringHash from "@sindresorhus/string-hash"
import { CSSProperties } from "react"

const colorSchema = [
  { background: "#ea7961", text: "#FFFFFF" },
  { background: "#40b355", text: "#000000" },
  { background: "#e0da69", text: "#2b1d1d" },
  { background: "#FF33A8", text: "#FFFFFF" },
  { background: "#A833FF", text: "#FFFFFF" },
  { background: "#33FFF3", text: "#000000" },
  { background: "#FF8F33", text: "#000000" },
  { background: "#8FFF33", text: "#000000" },
  { background: "#7c2f2f", text: "#FFFFFF" },
  { background: "#8dd9ae", text: "#000000" },
  { background: "#338FFF", text: "#FFFFFF" },
  { background: "#FF338F", text: "#FFFFFF" },
  { background: "#8F33FF", text: "#FFFFFF" },
  { background: "#c7e6d9", text: "#000000" },
  { background: "#FFAA33", text: "#000000" },
  { background: "#3374ff", text: "#FFFFFF" },
  { background: "#33AAFF", text: "#FFFFFF" },
  { background: "#FF33AA", text: "#FFFFFF" },
  { background: "#AAFF33", text: "#000000" },
  { background: "#0fdf87", text: "#000000" },
]

const hashNumberToRGB = (t: number) => {
  const r = (t & 0xff0000) >> 16
  const g = (t & 0x00ff00) >> 8
  const b = t & 0x0000ff
  return { r, g, b }
}

const rgbToComplementary = (r: number, g: number, b: number) => {
  return { r: 255 - r, g: 255 - g, b: 255 - b }
}

// 밝기 계산 함수
function getBrightness(r: number, g: number, b: number) {
  return (r * 299 + g * 587 + b * 114) / 1000
}

const adjustColorBrightness = (
  r: number,
  g: number,
  b: number,
  factor: number
) => {
  const adjust = (color: number) => {
    const amount = Math.floor(color * factor)
    return Math.max(0, Math.min(255, color + amount))
  }
  return {
    r: adjust(r),
    g: adjust(g),
    b: adjust(b),
  }
}

function getContrastingTextColor(r: number, g: number, b: number) {
  const { r: r1, g: g1, b: b1 } = rgbToComplementary(r, g, b)
  // 밝기가 128보다 크면 어두운 글자색(검정색)을, 작으면 밝은 글자색(흰색)을 선택
  // 128은 밝기의 중간값 - 결과는 -1 ~ 1 사이의 값
  // 값을 과장되게 하기 위해 128대신 64를 나누어 조정
  const adjustFactor = (128 - getBrightness(r, g, b)) / 64
  return adjustColorBrightness(r1, g1, b1, adjustFactor)
}

const rgbString = (hash: number) => {
  const { r, g, b } = hashNumberToRGB(hash)
  const { r: r2, g: g2, b: b2 } = getContrastingTextColor(r, g, b)
  return {
    "--bg-color-tag": `rgb(${r},${g},${b})`,
    "--text-color-tag": `rgb(${r2},${g2},${b2})`,
  } as CSSProperties
}

const schemeStyle = (hash: number) => {
  const index = hash % colorSchema.length
  const s = colorSchema[index]
  return {
    "--bg-color-tag": s.background,
    "--text-color-tag": s.text,
  } as CSSProperties
}

const TagItem = ({
  children: tag,
  type = "scheme",
}: {
  children: string
  type?: "scheme" | "generated"
}) => {
  const hash = stringHash(tag)
  const styleValue = type === "scheme" ? schemeStyle(hash) : rgbString(hash)
  return (
    <li
      className={`px-2 py-1 rounded-md bg-[--bg-color-tag] text-[--text-color-tag]`}
      style={styleValue}
      key={tag}
    >
      {tag}
    </li>
  )
}
export default TagItem
