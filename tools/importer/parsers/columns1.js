/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get columns (should be two)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column (image)
  const leftCell = columns[0];
  // Right column (content: h1, p, buttons, etc)
  const rightCol = columns[1];
  // Gather all non-empty children of the right column
  const rightCellContent = Array.from(rightCol.childNodes).filter(node => {
    return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
  });

  // Header row: single cell, but must span all columns (using colspan)
  const headerRow = [document.createElement('th')];
  headerRow[0].textContent = 'Columns block (columns1)';
  // We'll set colspan on this header after table creation

  // Content row: each cell is a column
  const contentRow = [leftCell, rightCellContent];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix: set colspan of header cell to number of columns
  const th = table.querySelector('th');
  if (th) th.setAttribute('colspan', String(contentRow.length));

  element.replaceWith(table);
}
