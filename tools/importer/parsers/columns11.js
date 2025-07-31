/* global WebImporter */
export default function parse(element, { document }) {
  // Find left (headline/title) and right (desc, author/button) columns
  const container = element.querySelector(':scope > .container');
  let grid = container ? container.querySelector('.w-layout-grid.grid-layout.tablet-1-column') : null;
  if (!grid) grid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');

  let col1 = null;
  let col2 = null;
  if (grid) {
    const gridColumns = grid.querySelectorAll(':scope > div');
    col1 = gridColumns[0] || null;
    col2 = gridColumns[1] || null;
  }

  // Images for the second row
  let imagesGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let img1 = null, img2 = null;
  if (imagesGrid) {
    const imgDivs = imagesGrid.querySelectorAll(':scope > .utility-aspect-1x1');
    if (imgDivs[0]) img1 = imgDivs[0].querySelector('img');
    if (imgDivs[1]) img2 = imgDivs[1].querySelector('img');
  }

  // Build cells: header row is always a single column
  const cells = [];
  // Header row: always one cell
  cells.push(['Columns block (columns11)']);
  // First content row (two columns)
  cells.push([col1 || '', col2 || '']);
  // Second row (two columns)
  if (img1 || img2) {
    cells.push([img1 || '', img2 || '']);
  }

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Fix header cell to span all columns if necessary
  if (table.rows.length > 1 && table.rows[0].cells.length === 1) {
    table.rows[0].cells[0].setAttribute('colspan', String(table.rows[1].cells.length));
  }
  element.replaceWith(table);
}
