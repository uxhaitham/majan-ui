export interface ComponentMeta {
  name: string
  description: string
  category: "components" | "blocks" | "charts"
  group?: string
}

export const components: ComponentMeta[] = [
  {
    name: "button",
    description: "Displays a button or a component that looks like a button.",
    category: "components",
    group: "Inputs",
  },
  {
    name: "badge",
    description: "Displays a badge or a component that looks like a badge.",
    category: "components",
    group: "Data Display",
  },
  {
    name: "card",
    description: "Displays a card with header, content, and footer.",
    category: "components",
    group: "Data Display",
  },
  {
    name: "input",
    description: "Displays a form input field.",
    category: "components",
    group: "Inputs",
  },
  {
    name: "label",
    description: "Renders an accessible label for form controls.",
    category: "components",
    group: "Inputs",
  },
  {
    name: "separator",
    description: "Visually separates content horizontally or vertically.",
    category: "components",
    group: "Layout",
  },
  {
    name: "tooltip",
    description: "A popup that displays information on hover or focus.",
    category: "components",
    group: "Overlay",
  },
  {
    name: "skeleton",
    description: "A placeholder loading animation for content.",
    category: "components",
    group: "Feedback",
  },
  {
    name: "avatar",
    description: "Displays a user avatar image with a fallback.",
    category: "components",
    group: "Data Display",
  },
  {
    name: "sheet",
    description: "A panel that slides in from the edge of the screen.",
    category: "components",
    group: "Overlay",
  },
  {
    name: "checkbox",
    description: "A control that allows the user to toggle between checked and not checked.",
    category: "components",
    group: "Inputs",
  },
  {
    name: "select",
    description: "Displays a list of options for the user to pick from.",
    category: "components",
    group: "Inputs",
  },
  {
    name: "table",
    description: "A responsive table component for displaying tabular data.",
    category: "components",
    group: "Data Display",
  },
  {
    name: "tabs",
    description: "A set of layered sections of content displayed one at a time.",
    category: "components",
    group: "Navigation",
  },
  {
    name: "dropdown-menu",
    description: "Displays a menu triggered by a button with keyboard navigation.",
    category: "components",
    group: "Overlay",
  },
  {
    name: "drawer",
    description: "A panel that slides in from the edge of the screen, typically from the bottom on mobile.",
    category: "components",
    group: "Overlay",
  },
  {
    name: "task-card",
    description: "A composed card showing a task with status badge and actions.",
    category: "components",
    group: "Composed",
  },
  {
    name: "dashboard-01",
    description: "A full dashboard with sidebar navigation, stat cards, area chart, and data table.",
    category: "blocks",
    group: "Dashboards",
  },
]

export function getComponentsByCategory(category: ComponentMeta["category"]) {
  return components.filter((c) => c.category === category)
}

export function getComponentGroups(category: ComponentMeta["category"]) {
  const items = getComponentsByCategory(category)
  const groups: Record<string, ComponentMeta[]> = {}
  for (const item of items) {
    const group = item.group || "Other"
    if (!groups[group]) groups[group] = []
    groups[group].push(item)
  }
  return groups
}
