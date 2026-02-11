import { ParsedMenu } from "@/lib/types"

export function generateSchema(menu: ParsedMenu) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: menu.restaurantName,
    hasMenuSection: menu.sections.map(section => ({
      "@type": "MenuSection",
      name: section.title,
      hasMenuItem: section.items.map(item => ({
        "@type": "MenuItem",
        name: item.name
      }))
    }))
  }
}
