/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  let grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) {
    // Fallback: look for a div with multiple children
    grid = Array.from(element.querySelectorAll('div')).find(div => div.children.length > 1);
  }
  if (!grid) return;

  // Get all direct column DIVs
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // For columns block (columns3), the header row is one cell, all content is in rows after
  // Each row should have the same number of columns as the number of columns in the grid
  // For this HTML, first column is title/text, second is buttons.
  // But for row construction, treat each column as a cell in the same row

  // Build the header row (single-cell)
  const headerRow = ['Columns block (columns3)'];
  // Build subsequent row(s): each row is an array of column content
  // Since this HTML is just a single row of columns, add just one content row
  const contentRow = columns.map(col => col);
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
