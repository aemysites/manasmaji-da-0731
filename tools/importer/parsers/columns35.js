/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get direct children (the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 1) return;

  // Build header row with correct colspan (must match number of columns)
  // We create an element for the header which spans the correct number of columns
  const headerCell = document.createElement('th');
  headerCell.textContent = 'Columns block (columns35)';
  headerCell.colSpan = columns.length;
  const headerRow = [headerCell];

  // Build the content row (each cell is one column's content)
  const row = columns;

  // Compose the table data for createTable
  const cells = [headerRow, row];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
