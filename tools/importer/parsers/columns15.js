/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (expect two: left content div, right image)
  const gridChildren = Array.from(grid.children);

  // We'll treat each grid child as a column, referencing their content directly
  // For a DIV, include all of its content (including headings, paragraphs, buttons)
  // For IMG, include as is
  const columns = gridChildren.map(child => {
    if (child.tagName === 'IMG') {
      return child;
    } else {
      // For div or other element, use the element directly to keep all inner content/text/formatting
      return child;
    }
  });

  // If the columns array is empty, abort
  if (!columns.length) return;

  // Build the block table with a SINGLE-CELL header row and one row for the columns
  const cells = [
    ['Columns block (columns15)'],
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
