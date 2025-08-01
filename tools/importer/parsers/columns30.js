/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner grid layout which holds each column (3 columns expected)
  const grid = element.querySelector('.grid-layout');
  let columns = [];
  if (grid) {
    // Get all immediate children of the grid - each is a column
    columns = Array.from(grid.children);
  } else {
    // Fallback: just grab all immediate children under the container
    const container = element.querySelector('.container');
    if (container) {
      columns = Array.from(container.children);
    }
  }
  // If columns are still missing, fallback to direct children
  if (columns.length === 0) {
    columns = Array.from(element.children);
  }
  // Defensive: filter out empty columns (shouldn't be needed here, but makes robust)
  columns = columns.filter(col => col && (col.textContent.trim() || col.querySelector('*')));
  // Prepare the table structure: header and content row
  const headerRow = ['Columns block (columns30)'];
  const columnsRow = columns;
  const cells = [headerRow, columnsRow];
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(table);
}
