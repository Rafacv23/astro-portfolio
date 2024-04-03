import projectsData from "../../data/en/projects.json"

export const findProjectBySlug = (slug) => {
  return projectsData.projects.find((project) => project.slug === slug)
}
