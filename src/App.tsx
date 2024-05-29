import { ChangeEvent, useState } from "react"
import profile from "@/data/profile.ts"

import "@/App.css"
import LinkSection from "@/LinkSection.tsx"

import ProjectItem from "@/components/Project.tsx"
import ProjectSearcher from "@/ProjectSearcher.ts"

function App() {
  const [filterText, setFilterText] = useState("")

  const inputFilterText = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault()
    setFilterText(ev.target.value)
  }

  const projectSearchResult = ProjectSearcher(filterText)

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

        {projectSearchResult.map((item, index) => (
          <p key={index}>{item.title}</p>
        ))}
        <h3>프로젝트</h3>
        {projectSearchResult.map((item, index) => (
          <ProjectItem key={index} project={item} />
        ))}
      </div>
    </main>
  )
}

export default App
