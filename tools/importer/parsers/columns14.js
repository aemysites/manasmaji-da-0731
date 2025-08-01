/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Group h2 (heading) and content (text + button) to left and right columns as in the example
  // LEFT: heading only (h2)
  const leftCol = columns[0];
  // RIGHT: everything else (for this HTML, just the div with paragraph and button)
  const rightCol = columns[1];

  // Table header row (EXACTLY as in the markdown/example)
  const headerRow = ['Columns block (columns14)'];
  const contentRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);
  element.replaceWith(table);
}
