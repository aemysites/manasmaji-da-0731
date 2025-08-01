/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid with direct column children
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid as columns
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Table header: must be exactly one cell per requirements
  const headerRow = ['Columns block (columns9)'];
  // Content row: one cell per column
  const contentRow = columns;

  // Create the block table: first row = header (1 cell), next row = N cells for each column
  const cells = [headerRow, contentRow];
  
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
