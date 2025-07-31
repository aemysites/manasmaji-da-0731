/* global WebImporter */
export default function parse(element, { document }) {
  // Table header from the block spec
  const headerRow = ['Cards (cards24)'];

  // Get all direct card <a> children
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build each card row: [image, content]
  const rows = cards.map(card => {
    // Image: first img in card, if present
    const img = card.querySelector('img');
    
    // Textual content: wrap tag/date and heading into a single div
    const textFrag = document.createElement('div');
    
    // Tag and date (usually a flex row)
    const metaRow = card.querySelector('.flex-horizontal');
    if (metaRow) {
      textFrag.appendChild(metaRow);
    }
    // Heading (h3)
    const heading = card.querySelector('h3, h4, h5, h6');
    if (heading) {
      textFrag.appendChild(heading);
    }
    return [img, textFrag];
  });

  // Compose the final table data
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
