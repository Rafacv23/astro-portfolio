import projectsData from "../../data/es/projects.json"

export const findProjectBySlug = (slug) => {
  return projectsData.projects.find((project) => project.slug === slug)
}
