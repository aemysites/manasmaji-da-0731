/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct child divs representing columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  const numColumns = columnDivs.length;
  if (numColumns === 0) return;

  // Header row: single cell with block name, followed by (numColumns-1) empty cells
  const headerRow = ['Columns (columns29)'];
  for (let i = 1; i < numColumns; i++) {
    headerRow.push('');
  }

  // Content row: each column div as a cell
  const contentRow = columnDivs;

  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
