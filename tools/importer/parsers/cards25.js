/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row as in the example
  const rows = [['Cards (cards25)']];

  // 2. Get all direct children (cards) of the root element
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  cards.forEach(card => {
    // Find the main image in the card (always present)
    const img = card.querySelector('img');
    // Prepare image element reference for cell 1
    let imageCell = img || '';

    // Compose text container for cell 2
    let textCell = '';
    // Look for h3 and p within the card (they could be inside a nested container)
    const h3 = card.querySelector('h3');
    const p = card.querySelector('p');
    if (h3 || p) {
      const wrapper = document.createElement('div');
      if (h3) wrapper.appendChild(h3);
      if (p) wrapper.appendChild(p);
      textCell = wrapper;
    }
    // If neither h3 nor p exists, leave the cell blank

    rows.push([
      imageCell,
      textCell
    ]);
  });

  // 3. Create the block table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
