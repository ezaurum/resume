export type EntityType = 'person' | 'company' | 'project' | 'skill' | 'tag'
export type SkillCategory = 'language' | 'framework' | 'database' | 'infrastructure' | 'protocol'
export type SkillLevel = 'expert' | 'proficient' | 'familiar'

export interface Person {
  id: string
  type: 'person'
  name: string
  nameEn: string
  title: string
  yearsOfExperience: number
  summary: string
  highlights: string[]
  strengths: string[]
  education: { school: string; major: string; degree: string }[]
  certifications: string[]
  skills: string[]
  tags: string[]
}

export interface Company {
  id: string
  type: 'company'
  name: string
  period: string
  startYear: number
  endYear: number | null
  role: string
  description: string
  projects: string[]
  skills: string[]
  tags: string[]
  achievements: string[]
}

export interface Project {
  id: string
  type: 'project'
  name: string
  company: string | null
  description: string
  projectType: string
  period?: string
  skills: string[]
  tags: string[]
  achievements: string[]
}

export interface Skill {
  id: string
  type: 'skill'
  name: string
  category: SkillCategory
  level: SkillLevel
  description?: string
}

export interface Tag {
  id: string
  type: 'tag'
  name: string
  description: string
}

export type Entity = Person | Company | Project | Skill | Tag

export interface SearchItem {
  id: string
  type: EntityType
  name: string
  description: string
  tags: string[]
  skills: string[]
  searchText: string
  entity: Entity
}

export interface GraphNode {
  id: string
  type: EntityType
  name: string
  description: string
  x?: number
  y?: number
  vx?: number
  vy?: number
  fx?: number | null
  fy?: number | null
}

export interface GraphEdge {
  source: string | GraphNode
  target: string | GraphNode
  relation: string
}

export const ENTITY_COLORS: Record<EntityType, string> = {
  person: '#4285F4',
  company: '#34A853',
  project: '#FBBC04',
  skill: '#EA4335',
  tag: '#9C27B0'
}

export const ENTITY_LABELS: Record<EntityType, string> = {
  person: '사람',
  company: '경력/회사',
  project: '프로젝트',
  skill: '기술',
  tag: '태그'
}

export const NODE_SIZES: Record<EntityType, number> = {
  person: 28,
  company: 20,
  project: 16,
  skill: 9,
  tag: 8
}
