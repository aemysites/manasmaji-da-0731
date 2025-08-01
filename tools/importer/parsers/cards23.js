/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header as per example
  const headerRow = ['Cards (cards23)'];
  const cells = [headerRow];

  // 2. Gather all cards from all tab panes
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((pane) => {
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is a direct child <a> in the grid
    const cards = Array.from(grid.children).filter((child) => child.tagName.toLowerCase() === 'a');
    cards.forEach((card) => {
      // Check for image (required for cards23)
      let img = card.querySelector('img');
      let imgCell = '';
      if (img) {
        imgCell = img;
      }
      // Text: Heading and description (text-only card or with image)
      let textNodes = [];
      // If there's a .utility-text-align-center (for text-only card), get content from there, else from card
      let textScope = card.querySelector('.utility-text-align-center') || card;
      // Heading is h3.h4-heading
      const heading = textScope.querySelector('h3.h4-heading');
      if (heading) textNodes.push(heading);
      // Description is .paragraph-sm (avoid duplicates)
      // For robustness, find all .paragraph-sm within textScope, use the first one that isn't inside the heading
      const descs = textScope.querySelectorAll('.paragraph-sm');
      if (descs.length > 0) {
        // Only add if not already in textNodes
        descs.forEach((desc) => {
          if (!textNodes.includes(desc)) textNodes.push(desc);
        });
      }
      // Only push rows with at least one non-empty cell (as all cards must have text)
      if (imgCell || textNodes.length) {
        cells.push([imgCell, textNodes]);
      }
    });
  });

  // 3. Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
