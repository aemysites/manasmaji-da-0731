/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that defines the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all immediate children of the grid
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Build header row: must be a single-cell row with correct text
  const headerRow = ['Columns block (columns35)'];

  // Build the second row: as many columns as present in the grid
  const contentRow = columns;

  // Compose the table structure
  const cells = [headerRow, contentRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
