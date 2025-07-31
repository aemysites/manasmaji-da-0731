/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid of columns - the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  // There must be at least two columns for a columns block
  if (columns.length < 2) return;

  // Table header row exactly as specified
  const headerRow = ['Columns block (columns30)'];

  // Table content row: each cell is a column's DOM element as-is
  // By referencing the actual elements, we ensure all children are preserved
  const contentRow = columns;

  // Compose the block table data
  const cells = [
    headerRow,
    contentRow,
  ];

  // Create and insert the table, replacing the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
