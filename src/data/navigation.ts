export type PortfolioFileView = "summary" | "profile" | "project" | "contact";

export interface PortfolioFile {
  id: string;
  folder: "ABOUT" | "PROJECTS" | "CONTACT";
  label: string;
  view: PortfolioFileView;
  slug?: string;
}

export const portfolioFiles: PortfolioFile[] = [
  { id: "Profile.md", folder: "ABOUT", label: "Profile.md", view: "profile" },
  { id: "README.md", folder: "ABOUT", label: "README.md", view: "summary" },
  {
    id: "Projects/hola-climbing.md",
    folder: "PROJECTS",
    label: "hola-climbing.md",
    view: "project",
    slug: "hola-climbing",
  },
  {
    id: "Projects/cafe-gamsugwang.md",
    folder: "PROJECTS",
    label: "cafe-gamsugwang.md",
    view: "project",
    slug: "cafe-gamsugwang",
  },
  {
    id: "Projects/jsonstore.md",
    folder: "PROJECTS",
    label: "jsonstore.md",
    view: "project",
    slug: "jsonstore",
  },
  {
    id: "Projects/readandshare.md",
    folder: "PROJECTS",
    label: "readandshare.md",
    view: "project",
    slug: "readandshare",
  },
  {
    id: "Projects/the-last-supper.md",
    folder: "PROJECTS",
    label: "the-last-supper.md",
    view: "project",
    slug: "the-last-supper",
  },
  { id: "Contact.txt", folder: "CONTACT", label: "Contact.txt", view: "contact" },
];

export const portfolioFolders = [
  {
    label: "ABOUT",
    files: portfolioFiles.filter((file) => file.folder === "ABOUT"),
  },
  {
    label: "PROJECTS",
    files: portfolioFiles.filter((file) => file.folder === "PROJECTS"),
  },
  {
    label: "CONTACT",
    files: portfolioFiles.filter((file) => file.folder === "CONTACT"),
  },
];

export const defaultFileId = "Profile.md";
