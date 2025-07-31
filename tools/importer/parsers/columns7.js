/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Defensive: If no columns, do nothing
  if (!columns.length) return;

  // Header row must be a single cell, as per the example
  const headerRow = ['Columns block (columns7)'];
  // Content row, each column as a cell
  const contentRow = columns;

  // Compose cells array
  const cells = [headerRow, contentRow];
  
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}