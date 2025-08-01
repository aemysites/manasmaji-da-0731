/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as required
  const headerRow = ['Cards (cards24)'];
  // Find all immediate card <a> children
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cards.map(card => {
    // Get image container (first div child, usually with image)
    const imgDiv = card.querySelector(':scope > div');
    // Use the div directly as the image cell (preserves padding/aspect wrappers for grid)
    const imageCell = imgDiv;
    // Meta (tag, date)
    const metaDiv = card.querySelector('.flex-horizontal');
    // Heading (title)
    const heading = card.querySelector('h3, .h4-heading');
    // Create text container
    const textContainer = document.createElement('div');
    // Add tag and date from metaDiv (if present)
    if (metaDiv) {
      Array.from(metaDiv.children).forEach(child => {
        textContainer.appendChild(child);
      });
    }
    // Add heading/title (if present)
    if (heading) {
      textContainer.appendChild(heading);
    }
    return [imageCell, textContainer];
  });
  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
