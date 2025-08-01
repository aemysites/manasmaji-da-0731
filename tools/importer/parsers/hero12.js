/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: block name
  const headerRow = ['Hero (hero12)'];

  // 2. Background image row: use first absolutely positioned .cover-image
  let bgImg = element.querySelector('img.cover-image.utility-position-absolute');
  let bgRow = [bgImg || ''];

  // 3. Content row: find the card body (to preserve structure)
  let contentCell;
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    contentCell = cardBody;
  } else {
    // fallback: get the largest content div within the section
    const container = element.querySelector('.container');
    contentCell = container || '';
  }

  // Compose the rows
  const rows = [headerRow, bgRow, [contentCell]];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
