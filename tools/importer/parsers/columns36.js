/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the left column (text/buttons) and right column (images)
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;
  const cols = Array.from(grid.children);
  if (cols.length < 2) return;

  // First column: title, subheading, buttons group
  const col1 = cols[0];
  // Reference the actual elements (not clones)
  const col1Els = [];
  Array.from(col1.children).forEach((child) => {
    // Only add if it's not empty
    if (child && (child.textContent.trim() !== '' || child.querySelector('img, a, button'))) {
      col1Els.push(child);
    }
  });

  // Second column: images
  const col2 = cols[1];
  // Find the (inner) grid containing the images
  const imgGrid = col2.querySelector('.w-layout-grid');
  let imgEls = [];
  if (imgGrid) {
    imgEls = Array.from(imgGrid.querySelectorAll('img'));
  } else {
    imgEls = Array.from(col2.querySelectorAll('img'));
  }
  // Reference the actual <img> elements

  // Table header as in the example
  const headerRow = ['Columns block (columns36)'];
  // One row with the two columns
  const row = [col1Els, imgEls];
  const cells = [headerRow, row];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}