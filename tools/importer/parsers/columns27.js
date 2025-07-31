/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get top-level columns (should be 2: left = text, right = image)
  const columns = Array.from(grid.children);

  // Defensive: fallback for missing columns
  const col1 = columns[0] || document.createElement('div');
  const col2 = columns[1] || document.createElement('div');

  // Table structure: header then content row
  const headerRow = ['Columns block (columns27)'];
  const colsRow = [col1, col2];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    colsRow
  ], document);

  // Replace only the targeted element
  element.replaceWith(table);
}
