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

  const toYearMonth = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
  }

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

          {item.to || item.from ? (
            <p>
              <span>기간: </span>
              {item.from ? <span>{toYearMonth(item.from)}</span> : null}~
              {item.to ? <span>{toYearMonth(item.to)}</span> : "현재"}~
            </p>
          ) : null}
          {item.employer ? <div>업체: {item.employer}</div> : null}

          {item.teamSize ? <div>팀 규모: {item.teamSize} 인</div> : null}
          {item.roles ? (
            <div>
              역할:
              <ul className="flex flex-row gap-2">
                {item.roles.map((tag) => (
                  <div className="px-2 py-1 rounded bg-amber-200" key={tag}>
                    {tag}
                  </div>
                ))}
              </ul>
            </div>
          ) : null}
          <div>
            기술 스택:
            <ul className="flex flex-row gap-2">
              {item.tags.map((tag) => (
                <div className="px-2 py-1 rounded bg-amber-200" key={tag}>
                  {tag}
                </div>
              ))}
            </ul>
          </div>
          <div>
            성과:
            <ul className="flex flex-col gap-2">
              {item.achievements.map((tag) => (
                <li
                  className="before:content-['•'] before:px-1 before:font-bold"
                  key={tag}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </main>
  )
}

export default App
