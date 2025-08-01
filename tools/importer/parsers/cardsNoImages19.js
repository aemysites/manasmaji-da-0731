/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row according to the block name
  const cells = [['Cards']];

  // Each direct child div is a card
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // The icon is a .icon div containing an SVG, usually followed by a <p>
    const iconDiv = cardDiv.querySelector('.icon');
    const svg = iconDiv ? iconDiv.querySelector('svg') : null;
    const p = cardDiv.querySelector('p');

    // Build cell content: icon + linebreak + text, if icon exists
    const cellContent = [];
    if (svg) {
      cellContent.push(svg);
      // Use a BR to separate icon from text
      cellContent.push(document.createElement('br'));
    }
    if (p) {
      cellContent.push(p);
    }
    // If no icon and no text, skip this card
    if (cellContent.length === 0) return;

    cells.push([cellContent]);
  });

  // Create block table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
