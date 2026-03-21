/**
 * Data service — abstracts the data source so it can be swapped for API calls later.
 *
 * Current: merges language-neutral base JSON with locale-specific i18n JSON.
 * Future:  replace merge functions with async API calls returning the same types.
 */
import type { Person, Company, Project, Skill, Tag } from '@/types'

import basePerson    from '@/data/base/person.json'
import baseCompanies from '@/data/base/companies.json'
import baseProjects  from '@/data/base/projects.json'
import baseSkills    from '@/data/base/skills.json'
import baseTags      from '@/data/base/tags.json'

import koData from '@/data/i18n/ko.json'
import enData from '@/data/i18n/en.json'
import jaData from '@/data/i18n/ja.json'

type I18nData = typeof koData

const i18nMap: Record<string, I18nData> = { ko: koData, en: enData, ja: jaData }

function getI18n(locale: string): I18nData {
  return i18nMap[locale] ?? i18nMap['ko']
}

export function getPerson(locale: string): Person {
  const i18n = getI18n(locale)
  return { type: 'person', ...basePerson, ...i18n.person } as Person
}

export function getCompanies(locale: string): Company[] {
  const i18n = getI18n(locale)
  return baseCompanies.map(base => ({
    type: 'company' as const,
    ...base,
    ...(i18n.companies as Record<string, Partial<Company>>)[base.id],
  })) as Company[]
}

export function getProjects(locale: string): Project[] {
  const i18n = getI18n(locale)
  return baseProjects.map(base => ({
    type: 'project' as const,
    ...base,
    ...(i18n.projects as Record<string, Partial<Project>>)[base.id],
  })) as Project[]
}

export function getSkills(locale: string): Skill[] {
  const i18n = getI18n(locale)
  return baseSkills.map(base => ({
    type: 'skill' as const,
    ...base,
    ...(i18n.skills as Record<string, Partial<Skill>>)[base.id],
  })) as Skill[]
}

export function getTags(locale: string): Tag[] {
  const i18n = getI18n(locale)
  return baseTags.map(base => ({
    type: 'tag' as const,
    ...base,
    ...(i18n.tags as Record<string, Partial<Tag>>)[base.id],
  })) as Tag[]
}
