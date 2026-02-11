import { ParsedMenu, MenuSection, MenuItem } from "@/lib/types"

export function detectSections(rawText: string): ParsedMenu {
  const lines = rawText
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean)

  const sections: MenuSection[] = []
  let currentSection: MenuSection | null = null

  for (const line of lines) {
    const isSectionHeader = line === line.toUpperCase() && line.length > 2

    if (isSectionHeader) {
      if (currentSection) sections.push(currentSection)
      currentSection = { title: line, items: [] }
      continue
    }

    if (currentSection) {
      const item: MenuItem = { name: line }
      currentSection.items.push(item)
    }
  }

  if (currentSection) sections.push(currentSection)

  return {
    restaurantName: "Menu",
    sections
  }
}
