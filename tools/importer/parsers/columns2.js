/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // There are three immediate children, representing the three columns
  const mainColumns = Array.from(grid.children);
  if (mainColumns.length !== 3) return; // Defensive: must be three columns

  const [leftFeature, middleCards, rightLinks] = mainColumns;

  // 1. Left Feature: a single anchor with all content
  // Use as-is
  const leftCol = leftFeature;

  // 2. Middle Cards: a flex div, each child is an anchor card
  // Collect all direct <a> children and put them together in a fragment
  let middleCol;
  if (middleCards && middleCards.nodeType === 1) {
    const anchors = Array.from(middleCards.querySelectorAll(':scope > a.utility-link-content-block'));
    if (anchors.length) {
      const frag = document.createDocumentFragment();
      anchors.forEach(a => frag.appendChild(a));
      middleCol = frag;
    } else {
      // If not found, reference the whole div (should not happen)
      middleCol = middleCards;
    }
  } else {
    middleCol = middleCards;
  }

  // 3. Right Links: a flex div, alternating a.utility-link-content-block and .divider
  // Use the whole div so that all structure is preserved
  const rightCol = rightLinks;

  // Compose the cells for the columns2 block
  const header = ['Columns block (columns2)'];
  const row = [leftCol, middleCol, rightCol];
  const cells = [header, row];

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
