/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner grid layout containing the columns content
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get the two primary columns
  // 1st: Content, 2nd: Image
  const gridChildren = Array.from(grid.children).filter(child => child.nodeType === 1);
  // Try to find leftCol (non-img) and rightCol (img)
  let leftCol = null;
  let rightCol = null;
  for (const child of gridChildren) {
    if (child.tagName.toLowerCase() === 'img') {
      rightCol = child;
    } else {
      leftCol = child;
    }
  }
  if (!leftCol || !rightCol) return;

  // Compose the table cells array
  const headerRow = ['Columns block (columns27)'];
  const contentRow = [leftCol, rightCol];
  const cells = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the element with the new block table
  element.replaceWith(table);
}
