import { ChangeEvent, useEffect, useState } from "react"
import Fuse from "fuse.js"
import profile from "@/data/profile.ts"
import projects from "@/data/projects.ts"

import "@/App.css"
import LinkSection from "@/LinkSection.tsx"

import { Project } from "@/types/Project.ts"
import Tag from "@/components/Tag.tsx"

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

  const [isBig, setIsBig] = useState(false)

  return (
    <main className="p-2 flex flex-col gap-4 relative">
      <div className="absolute h-28 left-2 top-2 right-2 flex flex-col gap-6 items-center justify-center">
        <h1
          className={`
        transition-all duration-200 ease-linear 
        ${isBig ? `text-xl` : `text-4xl`}`}
        >
          어떤 사람을 찾고 계시나요?
        </h1>
        <input
          className={`w-full box-border transition-all duration-200 ease-linear border-2 ${isBig ? "text-4xl p-4" : "text-xl p-2"}`}
          type={"text"}
          onInput={inputFilterText}
          onFocus={() => setIsBig(true)}
          onBlur={() => setIsBig(false)}
        />
      </div>
      <div className="mt-32">
        <h2>{profile.fullName}</h2>
        <LinkSection />

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
                  {item.roles.map((i) => Tag(i))}
                </ul>
              </div>
            ) : null}
            <div>
              기술 스택:
              <ul className="flex flex-row gap-2">
                {item.tags.map((i) => Tag(i))}
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
      </div>
    </main>
  )
}

export default App
