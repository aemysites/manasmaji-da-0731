/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid inside the section (layout container)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // The grid has content (text/contacts) and an image, as two main columns
  // We'll extract the left cell (all but the image) and the right cell (image)

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // The left cell: the text and contact list (usually the first two children)
  // The right cell: the main image (typically the last child)

  // We'll be robust and search for the image element for the right cell
  let imgEl = null;
  for (const child of gridChildren) {
    if (child.tagName === 'IMG') {
      imgEl = child;
      break;
    }
  }
  // For left cell, gather the non-image children
  const leftCellContent = gridChildren.filter(child => child !== imgEl);

  // Combine all left cell elements into a fragment, preserving their structure
  const leftCellFragment = document.createDocumentFragment();
  leftCellContent.forEach(el => leftCellFragment.appendChild(el));

  // Compose final cells for the table
  const headerRow = ['Columns block (columns18)'];
  const secondRow = [leftCellFragment, imgEl || ''];

  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
