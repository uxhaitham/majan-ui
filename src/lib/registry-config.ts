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
    name: "task-card",
    description: "A composed card showing a task with status badge and actions.",
    category: "components",
    group: "Composed",
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
