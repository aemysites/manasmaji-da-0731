/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Get all direct card anchors
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  cards.forEach(card => {
    // Get the first image (should be the card image)
    const img = card.querySelector('img');
    
    // Get the card's main info container: it's the div following the img
    let textContainer = null;
    // The card structure is: <a><div><img> <div>...</div></div></a>
    const topGrid = card.querySelector('.w-layout-grid');
    if (topGrid) {
      const gridChildren = Array.from(topGrid.children);
      textContainer = gridChildren.find(el => el !== img && el.tagName === 'DIV');
    }
    // fallback if structure differs
    if (!textContainer && img) {
      let sibling = img.nextElementSibling;
      while (sibling && sibling.tagName !== 'DIV') sibling = sibling.nextElementSibling;
      textContainer = sibling;
    }
    // As a last fallback, just use the whole card
    if (!textContainer) textContainer = card;

    rows.push([
      img,
      textContainer
    ]);
  });

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
