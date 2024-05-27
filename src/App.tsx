import { ChangeEvent, useEffect, useState } from "react"
import Fuse from "fuse.js"

import "@/App.css"

function App() {
  const [filterText, setFilterText] = useState("")
  const inputFilterText = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault()
    setFilterText(ev.target.value)
  }

  const fuseOptions = {
    keys: ["tech"],
  }

  interface Tech {
    tech: string
  }

  const fuse = new Fuse<Tech>(
    [
      {
        tech: "React",
      },
      {
        tech: "Vue",
      },
      {
        tech: "Angular",
      },
    ],
    fuseOptions
  )

  const [result, setResult] = useState<Tech[]>([])

  useEffect(() => {
    const search = fuse.search(filterText)
    setResult(search.map((i) => i.item))
  }, [filterText])

  return (
    <>
      <h1>Resume</h1>
      <h2>조석규</h2>
      <input type={"text"} onInput={inputFilterText} />
      {result.map((item) => (
        <div key={item.tech}>{item.tech}</div>
      ))}
    </>
  )
}

export default App
