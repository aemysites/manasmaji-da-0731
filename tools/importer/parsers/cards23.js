/* global WebImporter */
export default function parse(element, { document }) {
  // Find the active tab pane (or fallback to first tab pane)
  let tabPane = element.querySelector('.w-tab-pane.w--tab-active') || element.querySelector('.w-tab-pane');
  if (!tabPane) return;
  // Find the grid that holds the cards
  const grid = tabPane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all card-like items (they are all <a> elements in grid)
  const cards = Array.from(grid.children).filter(el => el.tagName === 'A');

  // Start rows with header, must match exactly
  const rows = [['Cards (cards23)']];

  cards.forEach(card => {
    // Image: first <img> in the card (required per block spec)
    const image = card.querySelector('img') || '';

    // For text cell, we want all relevant blocks in correct order
    // - heading (h3.h4-heading, .h4-heading, h4, etc)
    // - subtext/description (.paragraph-sm, .paragraph-sm.utility-margin-bottom-0, etc)
    // We'll push them in order of appearance
    const textCellContent = [];
    // Traverse children of card (not deep)
    Array.from(card.children).forEach(child => {
      // If it's a container (eg. .flex-horizontal or .utility-text-align-center), go one level deeper
      if (
        child.children.length &&
        (child.classList.contains('flex-horizontal') || child.classList.contains('utility-text-align-center'))
      ) {
        Array.from(child.children).forEach(grandchild => {
          if (grandchild.matches('h3, h4, .h4-heading')) textCellContent.push(grandchild);
          if (grandchild.classList.contains('paragraph-sm')) textCellContent.push(grandchild);
        });
      } else {
        if (child.matches('h3, h4, .h4-heading')) textCellContent.push(child);
        if (child.classList.contains('paragraph-sm')) textCellContent.push(child);
      }
    });
    // Edge: Sometimes some elements can be outside of above, so we fallback to querySelectorAll if none found
    if (textCellContent.length === 0) {
      card.querySelectorAll('h3, h4, .h4-heading, .paragraph-sm').forEach(el => textCellContent.push(el));
    }
    // If still nothing, fallback to card.textContent (rare case, shouldn't happen)
    if (textCellContent.length === 0 && card.textContent.trim()) {
      const div = document.createElement('div');
      div.textContent = card.textContent.trim();
      textCellContent.push(div);
    }
    // Only push rows with at least an image and some text
    if (image && textCellContent.length) rows.push([image, textCellContent.length === 1 ? textCellContent[0] : textCellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
