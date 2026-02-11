export function generateHtml(menu: any): string {
  return `
    <div class="menu-wrapper">
      <h1 class="menu-title">${menu.title || "Menu"}</h1>

      ${menu.sections
        .map(
          (section: any) => `
          <div class="menu-section">
            <h2 class="menu-section-title">${section.title}</h2>

            ${section.items
              .map(
                (item: any) => `
                <div class="menu-item">
                  <span class="menu-item-name">${item.name}</span>
                  <span class="menu-item-price">${item.price || ""}</span>
                </div>

                ${
                  item.description
                    ? `<p class="menu-item-description">${item.description}</p>`
                    : ""
                }
              `
              )
              .join("")}
          </div>
        `
        )
        .join("")}
    </div>
  `;
}
