/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the correct block name as required
  const headerRow = ['Columns block (columns5)'];

  // Find the grid inside the section (two columns: content left, image right)
  const grid = element.querySelector(':scope > .w-layout-grid.grid-layout');
  if (!grid) return;

  // Get immediate children (the two columns)
  // One is a grid (content), the other is the image
  const colElements = Array.from(grid.children);

  // Column 1: the grid with the content block
  // Column 2: the img
  let leftContent = null;
  let rightContent = null;

  colElements.forEach((col) => {
    if (col.tagName === 'IMG') {
      rightContent = col;
    } else if (
      col.classList.contains('w-layout-grid') &&
      col.classList.contains('container')
    ) {
      // This grid should contain a single child div with all the content
      const blockDiv = col.querySelector(':scope > div');
      leftContent = blockDiv || col;
    }
  });

  // If something is missing, fill with empty string to preserve columns
  const dataRow = [leftContent || '', rightContent || ''];

  const cells = [headerRow, dataRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
