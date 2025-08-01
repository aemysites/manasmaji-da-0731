/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner grid that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Immediate children of the grid are the columns
  const columns = Array.from(grid.children);
  // If there are no columns, do not replace
  if (!columns.length) return;

  // Block name header row matches exactly
  const headerRow = ['Columns block (columns31)'];

  // The content row: each cell is the full original column
  const contentRow = columns;

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
