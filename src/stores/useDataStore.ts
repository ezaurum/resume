import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Entity, Company, Project, Skill, Tag, Person, GraphNode, GraphEdge, SearchItem } from '@/types'
import { getPerson, getCompanies, getProjects, getSkills, getTags } from '@/services/dataService'

export const useDataStore = defineStore('data', () => {
  const { locale } = useI18n()

  // Reactive merged data — re-computed when locale changes
  const person   = computed((): Person    => getPerson(locale.value))
  const companies = computed((): Company[] => getCompanies(locale.value))
  const projects  = computed((): Project[] => getProjects(locale.value))
  const skills    = computed((): Skill[]   => getSkills(locale.value))
  const tags      = computed((): Tag[]     => getTags(locale.value))

  // Build entity map
  const entityMap = computed(() => {
    const map = new Map<string, Entity>()
    map.set(person.value.id, person.value)
    companies.value.forEach(c => map.set(c.id, c))
    projects.value.forEach(p => map.set(p.id, p))
    skills.value.forEach(s => map.set(s.id, s))
    tags.value.forEach(t => map.set(t.id, t))
    return map
  })

  function getEntityById(id: string): Entity | undefined {
    return entityMap.value.get(id)
  }

  // Helper: ID → display name for search index
  function skillNames(ids: string[]): string[] {
    return ids.map(id => skills.value.find(s => s.id === id)?.name ?? id)
  }
  function tagNames(ids: string[]): string[] {
    return ids.map(id => tags.value.find(t => t.id === id)?.name ?? id)
  }

  const searchItems = computed((): SearchItem[] => {
    const items: SearchItem[] = []

    // Person
    items.push({
      id: person.value.id,
      type: 'person',
      name: person.value.name,
      description: person.value.summary,
      tags: tagNames(person.value.tags),
      skills: skillNames(person.value.skills),
      searchText: [person.value.name, person.value.nameEn, person.value.title, ...person.value.strengths].join(' '),
      entity: person.value
    })

    // Companies
    companies.value.forEach(c => {
      items.push({
        id: c.id,
        type: 'company',
        name: c.name,
        description: `${c.role} | ${c.description}`,
        tags: tagNames(c.tags),
        skills: skillNames(c.skills),
        searchText: [c.name, c.role, c.period].join(' '),
        entity: c
      })
    })

    // Projects
    projects.value.forEach(p => {
      items.push({
        id: p.id,
        type: 'project',
        name: p.name,
        description: p.description,
        tags: tagNames(p.tags),
        skills: skillNames(p.skills),
        searchText: [p.name, p.projectType].join(' '),
        entity: p
      })
    })

    // Skills
    skills.value.forEach(s => {
      items.push({
        id: s.id,
        type: 'skill',
        name: s.name,
        description: s.description ?? '',
        tags: [s.category, s.level],
        skills: [],
        searchText: s.name,
        entity: s
      })
    })

    // Tags
    tags.value.forEach(t => {
      items.push({
        id: t.id,
        type: 'tag',
        name: t.name,
        description: t.description,
        tags: [],
        skills: [],
        searchText: t.name,
        entity: t
      })
    })

    return items
  })

  // Get related entities for an entity
  function getRelatedEntities(id: string): Entity[] {
    const entity = entityMap.value.get(id)
    if (!entity) return []

    const relatedIds = new Set<string>()

    if (entity.type === 'person') {
      companies.value.forEach(c => relatedIds.add(c.id))
    } else if (entity.type === 'company') {
      const company = entity as Company
      relatedIds.add(person.value.id)
      company.projects.forEach(pid => relatedIds.add(pid))
      company.skills.forEach(sid => relatedIds.add(sid))
      const myTags = new Set(company.tags)
      companies.value.forEach(c => {
        if (c.id !== id && c.tags.some(t => myTags.has(t))) relatedIds.add(c.id)
      })
    } else if (entity.type === 'project') {
      const project = entity as Project
      if (project.company) relatedIds.add(project.company)
      project.skills.forEach(sid => relatedIds.add(sid))
      const myTags = new Set(project.tags)
      projects.value.forEach(p => {
        if (p.id !== id && p.tags.some(t => myTags.has(t))) relatedIds.add(p.id)
      })
    } else if (entity.type === 'skill') {
      companies.value.forEach(c => { if (c.skills.includes(id)) relatedIds.add(c.id) })
      projects.value.forEach(p => { if (p.skills.includes(id)) relatedIds.add(p.id) })
    } else if (entity.type === 'tag') {
      companies.value.forEach(c => { if (c.tags.includes(id)) relatedIds.add(c.id) })
      projects.value.forEach(p => { if (p.tags.includes(id)) relatedIds.add(p.id) })
    }

    return Array.from(relatedIds)
      .filter(rid => rid !== id)
      .map(rid => entityMap.value.get(rid))
      .filter((e): e is Entity => e !== undefined)
      .slice(0, 12)
  }

  // Build graph data
  const graphData = computed(() => {
    const nodes: GraphNode[] = []
    const edges: GraphEdge[] = []
    const addedEdges = new Set<string>()

    function addEdge(source: string, target: string, relation: string) {
      const key = `${source}-${target}`
      if (!addedEdges.has(key)) {
        addedEdges.add(key)
        edges.push({ source, target, relation })
      }
    }

    nodes.push({ id: person.value.id, type: 'person', name: person.value.name, description: person.value.title })

    companies.value.forEach(c => {
      nodes.push({ id: c.id, type: 'company', name: c.name, description: `${c.role} | ${c.period}` })
      addEdge(person.value.id, c.id, '근무')
      c.projects.forEach(pid => addEdge(c.id, pid, '프로젝트'))
      c.tags.slice(0, 3).forEach(tid => addEdge(c.id, tid, '태그'))
    })

    projects.value.forEach(p => {
      nodes.push({ id: p.id, type: 'project', name: p.name, description: p.projectType })
      p.skills.slice(0, 3).forEach(sid => addEdge(p.id, sid, '기술'))
    })

    const usedSkillIds = new Set<string>()
    companies.value.forEach(c => c.skills.forEach(s => usedSkillIds.add(s)))
    projects.value.forEach(p => p.skills.forEach(s => usedSkillIds.add(s)))
    skills.value.forEach(s => {
      if (usedSkillIds.has(s.id)) {
        nodes.push({ id: s.id, type: 'skill', name: s.name, description: s.category })
      }
    })

    const usedTagIds = new Set<string>()
    companies.value.forEach(c => c.tags.slice(0, 3).forEach(t => usedTagIds.add(t)))
    tags.value.forEach(t => {
      if (usedTagIds.has(t.id)) {
        nodes.push({ id: t.id, type: 'tag', name: t.name, description: t.description })
      }
    })

    return { nodes, edges }
  })

  const stats = computed(() => {
    const earliestYear = Math.min(
      ...companies.value
        .filter(c => c.id !== 'company-airforce')
        .map(c => c.startYear)
    )
    const yearsOfExperience = new Date().getFullYear() - earliestYear
    return {
      yearsOfExperience,
      companiesCount: companies.value.length,
      projectsCount: projects.value.length,
      skillsCount: skills.value.length
    }
  })

  return {
    person,
    companies,
    projects,
    skills,
    tags,
    entityMap,
    searchItems,
    getEntityById,
    getRelatedEntities,
    graphData,
    stats
  }
})
