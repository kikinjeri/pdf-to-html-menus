export function generateMenuCss(): string {
  return `
  /* ------------------------------
     Classic Bistro + Minimal Menu
     Responsive, SEO-friendly
  ------------------------------ */

  .menu-wrapper {
    max-width: 760px;
    margin: 0 auto;
    padding: 32px 20px;
    background: #ffffff;
    color: #111;
    font-family: "Georgia", "Times New Roman", serif;
    line-height: 1.6;
  }

  /* Restaurant Title */
  .menu-title {
    text-align: center;
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 2rem;
    letter-spacing: 0.5px;
  }

  /* Section Titles */
  .menu-section-title {
    font-size: 1.4rem;
    font-weight: 700;
    margin-top: 2.2rem;
    margin-bottom: 0.8rem;
    padding-bottom: 6px;
    border-bottom: 2px solid #111;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* Menu Items */
  .menu-item {
    padding: 8px 0;
    font-size: 1.05rem;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .menu-item-name {
    font-weight: 500;
  }

  .menu-item-price {
    font-weight: 600;
    color: #111;
    margin-left: 12px;
    white-space: nowrap;
  }

  /* Optional descriptions */
  .menu-item-description {
    font-size: 0.95rem;
    color: #444;
    margin-top: 2px;
    margin-bottom: 6px;
  }

  /* Divider */
  .menu-divider {
    margin: 2rem 0;
    border: none;
    border-top: 1px solid #ccc;
  }

  /* Responsive */
  @media (max-width: 600px) {
    .menu-title {
      font-size: 2rem;
    }

    .menu-section-title {
      font-size: 1.2rem;
    }

    .menu-item {
      flex-direction: column;
      align-items: flex-start;
    }

    .menu-item-price {
      margin-top: 4px;
    }
  }
  `;
}
