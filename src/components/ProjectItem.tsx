import TagItem from "@/components/TagItem.tsx"
import { Project } from "@/types/Project.ts"
import { toYearMonth } from "@/libs/DateFormatter.ts"

const ProjectItem = ({ project }: { project: Project }) => (
  <div key={project.title}>
    <h3>{project.title}</h3>
    <p>{project.description}</p>

    {project.to || project.from ? (
      <p>
        <span>기간: </span>
        {project.from ? <span>{toYearMonth(project.from)}</span> : null}~
        {project.to ? <span>{toYearMonth(project.to)}</span> : "현재"}~
      </p>
    ) : null}
    {project.employer ? <div>업체: {project.employer}</div> : null}

    {project.teamSize ? <div>팀 규모: {project.teamSize} 인</div> : null}
    {project.roles ? (
      <div>
        역할:
        <ul className="flex flex-row gap-2">
          {project.roles.map((i) => (
            <TagItem key={i}>{i}</TagItem>
          ))}
        </ul>
      </div>
    ) : null}
    <div>
      기술 스택:
      <ul className="flex flex-row gap-2">
        {project.tags.map((i) => (
          <TagItem key={i}>{i}</TagItem>
        ))}
      </ul>
    </div>
    <div>
      성과:
      <ul className="flex flex-col gap-2">
        {project.achievements.map((tag) => (
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
)
export default ProjectItem
