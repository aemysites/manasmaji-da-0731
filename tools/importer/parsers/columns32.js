/* global WebImporter */
export default function parse(element, { document }) {
  // Find the direct child with the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get its direct children (columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;
  // Use references to the existing elements for each column
  const firstCol = columns[0]; // image
  const secondCol = columns[1]; // content block (text, tags, heading, etc)
  // Build the table as per the block structure
  const cells = [
    ['Columns (columns32)'],
    [firstCol, secondCol],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
