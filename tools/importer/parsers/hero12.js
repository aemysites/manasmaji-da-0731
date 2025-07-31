/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: always the block name
  const headerRow = ['Hero (hero12)'];

  // 2. Background image row: The first grid child holds the background img
  let backgroundImg = '';
  const grid = element.querySelector('.w-layout-grid');
  if (grid && grid.children.length > 0) {
    const bgImgDiv = grid.children[0];
    const img = bgImgDiv.querySelector('img');
    if (img) backgroundImg = img;
  }
  const backgroundRow = [backgroundImg];

  // 3. Content row: headline, subheading, cta - inside the second grid child
  let contentCell = '';
  if (grid && grid.children.length > 1) {
    const contentDiv = grid.children[1];
    // Find card-body -> grid-layout (desktop-3-column)
    const cardBody = contentDiv.querySelector('.card-body');
    if (cardBody) {
      const innerGrid = cardBody.querySelector('.grid-layout');
      if (innerGrid) {
        // Compose a fragment for all actual content (image + content column)
        const fragment = document.createElement('div');
        // First: possible inner image (concert crowd)
        const possibleImg = innerGrid.querySelector('img');
        if (possibleImg) fragment.appendChild(possibleImg);
        // Second: headline, subtext, ctas, etc. (the grid has two columns, the 2nd is content)
        // We'll find the div with h2 in it
        const textCol = Array.from(innerGrid.children).find((c) => c.querySelector && c.querySelector('h2'));
        if (textCol) fragment.appendChild(textCol);
        if (fragment.childNodes.length) contentCell = fragment;
      }
    }
  }
  const contentRow = [contentCell];

  // Assemble block table
  const cells = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
