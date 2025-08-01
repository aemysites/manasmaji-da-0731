/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row - must match example exactly
  const headerRow = ['Hero (hero20)'];

  // 2. Background images (row 2)
  // Find the montage-image grid container
  let backgroundCell = null;
  const grid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  if (grid) {
    // Use a container to hold all images
    const container = document.createElement('div');
    // Only include direct children that are DIVs with image children
    const cells = Array.from(grid.children).filter(child =>
      child.querySelector('img')
    );
    cells.forEach(cell => {
      const img = cell.querySelector('img');
      if (img) container.appendChild(img);
    });
    // Only use the container if at least one image
    if (container.childElementCount > 0) {
      backgroundCell = container;
    }
  }

  // 3. Title, subheading, CTA (row 3)
  let textCell = null;
  // Find the hero content container (centered text/buttons)
  const contentRoot = element.querySelector('.ix-hero-scale-3x-to-1x-content .container, .ix-hero-scale-3x-to-1x-content');
  if (contentRoot) {
    const bits = [];
    // Heading (h1)
    const heading = contentRoot.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) bits.push(heading);
    // Subheading (first p following the heading)
    const subheading = contentRoot.querySelector('p');
    if (subheading) bits.push(subheading);
    // CTA buttons (group)
    const btnGroup = contentRoot.querySelector('.button-group');
    if (btnGroup) bits.push(btnGroup);
    if (bits.length > 0) {
      const div = document.createElement('div');
      bits.forEach(node => div.appendChild(node));
      textCell = div;
    }
  }

  // Build the table: always 1 column, 3 rows
  const cells = [
    headerRow,
    [backgroundCell],
    [textCell],
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
