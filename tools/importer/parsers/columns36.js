/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid inside the section
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  // Get all top-level grid columns
  const gridChildren = grid.querySelectorAll(':scope > div');
  if (gridChildren.length < 2) return;

  // Left cell: heading, subheading, and buttons (reference actual elements)
  const left = gridChildren[0];
  const leftCellElements = [];
  // Heading
  const heading = left.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) leftCellElements.push(heading);
  // Subheading/paragraph
  const subheading = left.querySelector('p');
  if (subheading) leftCellElements.push(subheading);
  // Button group
  const buttonGroup = left.querySelector('.button-group');
  if (buttonGroup) leftCellElements.push(buttonGroup);

  // Right cell: grid of images (reference actual img elements)
  const right = gridChildren[1];
  const imagesGrid = right.querySelector('.w-layout-grid');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Compose the block table
  const headerRow = ['Columns block (columns36)'];
  const contentRow = [leftCellElements, images];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
