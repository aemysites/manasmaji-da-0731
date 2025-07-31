/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container div that holds the grid
  const container = element.querySelector('.container');
  if (!container) return;
  // Find the grid-layout which contains the columns
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid, representing columns
  const gridChildren = Array.from(grid.children);

  // The structure in this case is image in first, text/buttons in second
  // Reference the actual elements directly for optimal block structure

  // Construct header row as in example
  const headerRow = ['Columns block (columns1)'];
  // Second row: one cell for each column in the grid
  const contentRow = gridChildren;

  // Build the table for the block
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table using the WebImporter helper
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block table
  element.replaceWith(table);
}
