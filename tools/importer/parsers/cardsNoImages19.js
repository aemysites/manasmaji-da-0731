/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (should be the card wrappers)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Create the header row
  const rows = [['Cards']];

  cardDivs.forEach(cardDiv => {
    // For each card, get its direct p tag, ignore icons
    // The p tag contains the actual text for the card
    const p = cardDiv.querySelector('p');
    if (p && p.textContent.trim()) {
      rows.push([p]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
