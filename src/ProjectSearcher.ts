import Fuse from "fuse.js"
import { Project } from "@/types/Project.ts"
import projects from "@/data/projects.ts"
import { useEffect, useState } from "react"

const ProjectSearcher = (filterText: string) => {
  const projectSearchOptions = {
    threshold: 0.3,
    keys: ["tags", "title"],
  }
  const projectSearch = new Fuse<Project>(projects, projectSearchOptions)

  const [projectSearchResult, setProjectSearchResult] = useState<Project[]>([])

  useEffect(() => {
    if (filterText === "") {
      //setProjectSearchResult(projects)
      setProjectSearchResult([])
      return
    }
    const search = projectSearch.search(filterText)
    setProjectSearchResult(search.map((i) => i.item))
  }, [filterText])
  return projectSearchResult
}
export default ProjectSearcher
