const rootPath = "/react-projects";

export const data: {
  title: string;
  href: string;
  description: string;
  isNew: boolean;
  inProgress: boolean;
  github_URL: string;
}[] = [
  {
    title: "React Table",
    href: `${rootPath}/react-table`,
    description: "In-line editable react table.",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "Shopping Cart",
    href: `${rootPath}/shopping-cart`,
    description:
      "Shopping cart built using React useReducer hook, json server.",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "Image Drag & Drop",
    href: `${rootPath}/image-drag-drop`,
    description:
      "Create a component to drag and drop files, using react dropzone or plain html5 drag and drop.",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "Drag & Drop",
    href: `${rootPath}/dndkit`,
    description: "Create a component to drag and drop components.",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "Unsplash",
    href: `${rootPath}/unsplash`,
    description: "Learn to use context, search, react-query, and unsplash API.",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "CMS",
    href: `${rootPath}/cms`,
    description: "Learn to integrate CMS(Content Management System)",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "Multi-Page Form",
    href: `${rootPath}/forms/multi-page-forms`,
    description: "Create a multi-page form with React and React Hook Form",
    isNew: false,
    inProgress: true,
    github_URL: ``,
  },
  {
    title: "Form Builder",
    href: `${rootPath}/forms/form-builder`,
    description: "Drag and drop input fields to create forms",
    isNew: false,
    inProgress: true,
    github_URL: ``,
  },
  {
    title: "Server Action Form",
    href: `${rootPath}/forms/form-server-action`,
    description: "How to create a form and use server actions",
    isNew: true,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "React Hook Form: Basic",
    href: `${rootPath}/forms/react-hook-form`,
    description: "Implementation of React hook forms, using normal inputs",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "React Hook Form: Zod Integration",
    href: `${rootPath}/forms/hook-form`,
    description: "Implementation of Zod with React hook forms, using ShadCN",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "Menu",
    href: `${rootPath}/menu`,
    description:
      "Learn to filter the data when clicking on filters of the menu to show filtered items",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "Tabs",
    href: `${rootPath}/tabs`,
    description: "Create your own tabs to display different content",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "Zustand Demo",
    href: `${rootPath}/zustand`,
    description: "A simple implementation of zustand",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "Framer Motion",
    href: `${rootPath}/framer-motion`,
    description: "A simple implementation of framer motion library",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "Progress on Scroll",
    href: `${rootPath}/progress-on-scroll`,
    description:
      "Create a progress bar that shows the progress as user's scroll.",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "Tailwind",
    href: `${rootPath}/tailwind`,
    description: "Some awesome tailwind tricks",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "MUI",
    href: `${rootPath}/mui`,
    description:
      "Playing around with MUI base components and styling them with Tailwind CSS",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "Image Slider",
    href: `${rootPath}/image-slider`,
    description: "Create your own image slider with React and Tailwind CSS",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "Shad CN",
    href: `${rootPath}/shadcn`,
    description: "Checking out few shadcn components",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "Class component",
    href: `${rootPath}/class-component`,
    description:
      "Playing around with class and functional components (See how things can work between them)",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "Basic",
    href: `${rootPath}/basic`,
    description: "Basic stuff to get you started",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "Redux",
    href: `${rootPath}/redux`,
    description: "Basic redux setup",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "JavaScript",
    href: `${rootPath}/js`,
    description: "Basic javascript related code snippets",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "React Data Sheet Grid",
    href: `${rootPath}/react-datasheet-grid`,
    description: "React Datasheet Grid library",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
  {
    title: "Render Component via Fetch",
    href: `${rootPath}/fetch-component`,
    description:
      "Fetching a component via fetch and render it, use server actions",
    isNew: false,
    inProgress: false,
    github_URL: ``,
  },
];

export const projects = data.sort((a, b) => a.title.localeCompare(b.title));
