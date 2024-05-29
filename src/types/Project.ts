import { HasTechTag } from "@/types/HasTechTag.ts"

export interface Project extends HasTechTag {
  title: string
  from: Date
  to: Date
  description: string
  roles: string[]
  teamSize: number | string
  employer: string
  achievements: string[]
  employmentType: string
  project?: Project
}
