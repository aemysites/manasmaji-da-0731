/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid which contains all columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // The visual layout is two columns:
  // Left: info panel (heading, subheading, desc) + contact list (ul)
  // Right: image
  // The HTML structure is: [info panel div, ul contact list, image]

  // Compose left column from the first two children
  const leftColElems = [];
  if (gridChildren[0]) leftColElems.push(gridChildren[0]); // heading, subheading, desc
  if (gridChildren[1]) leftColElems.push(gridChildren[1]); // contact list

  // Wrap in a container for resilience
  const leftCol = document.createElement('div');
  leftCol.append(...leftColElems);

  // Right column is the image
  const rightCol = gridChildren[2] || null;

  // Table structure: header row, content row (2 columns)
  const cells = [
    ['Columns block (columns18)'],
    [leftCol, rightCol]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
