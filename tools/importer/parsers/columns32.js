/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all immediate grid children (the columns)
  const columns = Array.from(grid.children);
  // Defensive: Only proceed if two columns (image and content)
  if (columns.length < 2) return;

  // Table header as in example
  const headerRow = ['Columns (columns32)'];
  // Second row: left (image), right (content)
  const contentRow = [columns[0], columns[1]];
  
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
