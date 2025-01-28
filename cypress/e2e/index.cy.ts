import {
  getImportantProjects,
  getAllProjects,
} from "../../src/lib/api/en/projects"

describe("Portfolio tests for english version", () => {
  it("checking titles", () => {
    const page = cy.visit("/en")

    page
      .get("title")
      .should("have.text", "Rafa Canosa | Engineer & Web Developer Portfolio")
    page.get("h1").should("have.text", "\nEngineer &\nWeb Developer ")
  })

  it("should navigate to the projects page", () => {
    cy.visit("/en")

    cy.contains("a", "Check more").click()

    cy.title().should("eq", "Projects | Rafa Canosa")
  })

  it("checking titles of projects page", () => {
    cy.visit("/en/projects")

    cy.title().should("eq", "Projects | Rafa Canosa")
    cy.contains("h1", "All Projects")
  })

  it("only display important projects in /en page", () => {
    cy.visit("/en")

    // check rendering correct page
    cy.contains("h2", "Projects")

    const importantProjects = getImportantProjects()

    importantProjects.forEach((project) => {
      cy.contains("h3", project.name)
    })

    cy.fixture("../../src/lib/data/en/projects.json").then((projects) => {
      const nonImportantProjects = projects.projects.filter(
        (project) => !project.important
      )

      nonImportantProjects.forEach((project) => {
        cy.contains("h3", project.name).should("not.exist")
      })
    })
  })

  it("checking projects in /en/projects page", () => {
    cy.visit("/en/projects")

    // check rendering correct page
    cy.contains("h1", "All Projects")

    cy.fixture("../../src/lib/data/en/projects.json").then((projects) => {
      expect(projects.projects).to.be.an("array")

      //check every project
      projects.projects.forEach((project: Project) => {
        // check rendering
        cy.contains("h3", project.name)

        //check fields
        expect(project).to.include.keys(
          "name",
          "slug",
          "languages",
          "year",
          "functionalities",
          "img",
          "important",
          "description",
          "github"
        )

        // check optional fields
        if (project.live) {
          expect(project.live).to.be.a("string")
        }
      })
    })
  })
})

describe("Project utility functions", () => {
  it("should return all projects", () => {
    cy.visit("/en")

    // get all projects
    cy.fixture("../../src/lib/data/en/projects.json").then((projects) => {
      const allProjects = getAllProjects()

      // checking all the projects
      expect(allProjects).to.be.an("array")
      expect(allProjects).to.have.length.greaterThan(0)

      // checking every project
      allProjects.forEach((project) => {
        expect(project).to.include.keys(
          "name",
          "slug",
          "languages",
          "year",
          "functionalities",
          "img",
          "important",
          "description",
          "github"
        )

        if (project.live) {
          expect(project.live).to.be.a("string")
        }
      })
    })
  })
})

describe("navigation tests", () => {
  it("should navigate to the projects page, english version", () => {
    cy.visit("/en")

    cy.contains("a", "Check more").click()

    cy.title().should("eq", "Projects | Rafa Canosa")
  })

  it("should navigate to the projects page, spanish version", () => {
    cy.visit("/")

    cy.contains("a", "Ver más").click()

    cy.title().should("eq", "Proyectos | Rafa Canosa")
  })

  it("should change the language to spanish", () => {
    cy.visit("/en")

    cy.get("a[title='Cambiar a la versión en español']").click()
    cy.title().should(
      "eq",
      "Rafa Canosa | Desarrollador de Aplicaciones Web Portfolio"
    )
  })

  it("should change to english version", () => {
    cy.visit("/")

    cy.get("a[title='Change to English version']").click()
    cy.title().should("eq", "Rafa Canosa | Engineer & Web Developer Portfolio")
  })
})
