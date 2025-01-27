import projectsData from "@lib/data/es/projects.json"

// Return all the projects, in default order
export const getAllProjects = (): Project[] => {
  return projectsData.projects
}

// Return a single project based on its slug
export const getProjectBySlug = (slug: string): Project => {
  return projectsData.projects.find((project) => project.slug === slug)
}

// Return all the projects that are marked as important
export const getImportantProjects = (): Project[] => {
  return projectsData.projects.filter((project) => project.important)
}

// Return all the projects, but sorthed by date, newest first
export const getSortedProjects = (): Project[] => {
  return projectsData.projects.sort((a, b) => {
    return b.year - a.year
  })
}
