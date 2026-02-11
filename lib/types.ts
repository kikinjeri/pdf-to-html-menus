export interface MenuItem {
  name: string
  description?: string
  price?: string
  imageUrl?: string
}

export interface MenuSection {
  title: string
  items: MenuItem[]
}

export interface ParsedMenu {
  restaurantName: string
  sections: MenuSection[]
}
