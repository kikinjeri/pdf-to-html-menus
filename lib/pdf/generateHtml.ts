import { ParsedMenu } from "@/lib/types"

export function generateHtml(menu: ParsedMenu): string {
  return `
  <div class="menu-wrapper">
    <h1 class="menu-title">${menu.restaurantName}</h1>

    ${menu.sections
      .map(
        section => `
      <section class="menu-section">
        <h2 class="menu-section-title">${section.title}</h2>

        ${section.items
          .map(
            item => `
          <div class="menu-item">
            <span class="menu-item-name">${item.name}</span>
            ${
              item.price
                ? `<span class="menu-item-price">${item.price}</span>`
                : ""
            }
          </div>
          ${
            item.description
              ? `<p class="menu-item-description">${item.description}</p>`
              : ""
          }
        `
          )
          .join("")}
      </section>
    `
      )
      .join("")}
  </div>
  `
}
