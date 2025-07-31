/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the container
  const grid = element.querySelector('.w-layout-grid');
  let columns = [];
  if (grid) {
    // Get all direct children of the grid
    columns = Array.from(grid.children);
  } else {
    // If the grid is not found, treat the entire element as a single column
    columns = [element];
  }

  // The header row must be a single column (one cell)
  const headerRow = ['Columns block (columns14)'];
  // The content row should have as many columns as there are direct children in the grid
  const contentRow = columns;

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
