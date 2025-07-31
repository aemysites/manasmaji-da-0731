/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that holds the footer columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each direct child of grid is a column; first is logo+socials, rest are nav columns
  const gridChildren = Array.from(grid.children);

  // Create the block table structure: header with ONE column, then a row with all columns
  const headerRow = ['Columns block (columns9)'];
  const columnsRow = gridChildren;

  const tableRows = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
