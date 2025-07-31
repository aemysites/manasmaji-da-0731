/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main card grid (should be the largest one)
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.w-layout-grid');
  if (!mainGrid) return;

  // Gather all cards: immediate <a> children of mainGrid, plus cards in any nested grid under mainGrid
  const cards = [];
  Array.from(mainGrid.children).forEach(child => {
    if (child.tagName === 'A' || child.matches('a.utility-link-content-block')) {
      cards.push(child);
    } else if (child.classList.contains('w-layout-grid')) {
      Array.from(child.children).forEach(grandchild => {
        if (grandchild.tagName === 'A' || grandchild.matches('a.utility-link-content-block')) {
          cards.push(grandchild);
        }
      });
    }
  });

  // Compose rows: [image, [heading, paragraph(s), CTA?]]
  const rows = cards.map(card => {
    // Image: first <img> inside the card
    const img = card.querySelector('img');
    // Text content: heading, paragraphs, then button if present
    const textParts = [];
    const heading = card.querySelector('h2, h3, h4, .h2-heading, .h4-heading');
    if (heading) textParts.push(heading);
    card.querySelectorAll('p').forEach(p => textParts.push(p));
    // CTA (e.g., .button), if present
    const cta = card.querySelector('.button');
    if (cta) textParts.push(cta);
    return [img, textParts];
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    ['Cards (cards37)'],
    ...rows
  ], document);

  element.replaceWith(table);
}
