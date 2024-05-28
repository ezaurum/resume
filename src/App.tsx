import { ChangeEvent, useEffect, useState } from "react"
import Fuse from "fuse.js"
import profile from "@/data/profile.ts"
import projects from "@/data/projects.ts"

import "@/App.css"
import LinkSection from "@/LinkSection.tsx"

import { Project } from "@/types/Project.ts"

function App() {
  const [filterText, setFilterText] = useState("")
  const inputFilterText = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault()
    setFilterText(ev.target.value)
  }

  const projectSearchOptions = {
    threshold: 0.3,
    keys: ["tags", "title"],
  }
  const projectSearch = new Fuse<Project>(projects, projectSearchOptions)

  const [projectSearchResult, setProjectSearchResult] = useState<Project[]>([])

  useEffect(() => {
    if (filterText === "") {
      setProjectSearchResult(projects)
      return
    }
    const search = projectSearch.search(filterText)
    setProjectSearchResult(search.map((i) => i.item))
  }, [filterText])

  return (
    <main className="p-2 flex flex-col gap-4">
      <h1>Resume</h1>
      <h2>{profile.fullName}</h2>
      <LinkSection />
      <input className="p-2 border-2" type={"text"} onInput={inputFilterText} />

      {projectSearchResult.map((item) => (
        <div key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <ul>
            {item.tags.map((tag) => (
              <div key={tag}>{tag}</div>
            ))}
          </ul>
        </div>
      ))}
    </main>
  )
}

export default App
