/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per the specification
  const headerRow = ['Hero (hero6)'];

  // --- Row 2: Background Image ---
  // Find the grid container and its children
  const gridContainers = element.querySelectorAll(':scope > div.w-layout-grid > div');
  let backgroundImg = null;
  if (gridContainers.length > 0) {
    backgroundImg = gridContainers[0].querySelector('img');
  }

  // --- Row 3: Content Block ---
  let contentBlock = null;
  if (gridContainers.length > 1) {
    // The second grid cell contains the content grid
    const innerGrid = gridContainers[1].querySelector('.w-layout-grid');
    if (innerGrid) {
      const card = innerGrid.querySelector('.card');
      if (card) {
        const contentParts = [];
        // Heading (h1)
        const heading = card.querySelector('h1');
        if (heading) contentParts.push(heading);
        // Subheading (p)
        const subheading = card.querySelector('p');
        if (subheading) contentParts.push(subheading);
        // Call-to-action buttons
        const buttonGroup = card.querySelector('.button-group');
        if (buttonGroup) contentParts.push(buttonGroup);
        // Group all in a div for stacking
        if (contentParts.length) {
          const contentDiv = document.createElement('div');
          contentParts.forEach(part => contentDiv.appendChild(part));
          contentBlock = contentDiv;
        }
      }
    }
  }

  // Array for block table rows; each row is one cell
  const rows = [
    headerRow,
    [backgroundImg].filter(Boolean),
    [contentBlock].filter(Boolean)
  ];

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
