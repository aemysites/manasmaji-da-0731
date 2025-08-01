/* global WebImporter */
export default function parse(element, { document }) {
  // Header is always as specified
  const headerRow = ['Cards (cards25)'];
  const rows = [];
  // Get all direct children representing cards
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  cardDivs.forEach(div => {
    // Find mandatory image in the card
    const img = div.querySelector('img');
    if (!img) return; // Only process cards with images

    // Try to find the descriptive text content
    let textContent = '';
    // Prefer the .utility-padding-all-2rem wrapper (contains h3/p)
    const textWrapper = div.querySelector('.utility-padding-all-2rem');
    if (textWrapper) {
      textContent = textWrapper;
    }
    rows.push([img, textContent]);
  });

  // Compose the table rows
  const tableRows = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
