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
    threshold: 0.3,
    distance: 100,
    keys: ["tech"],
  }

  interface Tech {
    tech: string
  }

  const resumeValues = [
    {
      tech: "React",
    },
    {
      tech: "Vue",
    },
    {
      tech: "Angular",
    },
  ]
  const fuse = new Fuse<Tech>(resumeValues, fuseOptions)

  const [result, setResult] = useState<Tech[]>([])

  useEffect(() => {
    if (filterText === "") {
      setResult(resumeValues)
      return
    }
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
