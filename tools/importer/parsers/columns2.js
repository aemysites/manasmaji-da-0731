/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // We expect:
  // 0: big left card (main)
  // 1: right top two cards (with images)
  // 2: right bottom six cards (text-only, with dividers)

  // Left/Main card (first child is an <a> with .utility-link-content-block)
  let mainCard = null;
  for (const child of gridChildren) {
    if (child.matches('a.utility-link-content-block')) {
      mainCard = child;
      break;
    }
  }
  if (!mainCard) return;

  // The next two children are flex-horizontal wrappers for right-side columns
  // (2nd and 3rd columns stacked vertically - but we want to merge their contents into one column)
  const rightFlexBlocks = gridChildren.filter(c => c.classList.contains('flex-horizontal'));

  // Gather all cards and dividers from both right flex blocks
  const rightContentNodes = [];
  rightFlexBlocks.forEach(flexBlock => {
    Array.from(flexBlock.childNodes).forEach(node => {
      // Ignore empty text nodes
      if (node.nodeType === 3 && !node.textContent.trim()) return;
      rightContentNodes.push(node);
    });
  });

  // Create a DocumentFragment for the right column
  const rightColFragment = document.createDocumentFragment();
  rightContentNodes.forEach(node => rightColFragment.appendChild(node));

  // Table: header row matches exactly as per requirements
  const rows = [
    ['Columns block (columns2)'],
    [mainCard, rightColFragment]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
