/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell with block name
  const headerRow = ['Columns (columns38)'];

  // Columns: each direct child div is a column
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Content row: one cell for each column
  const contentRow = columns;

  // Construct table with header row as single cell, content row as multiple columns
  const cells = [
    headerRow,
    contentRow
  ];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}