/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches the block name exactly
  const headerRow = ['Hero (hero39)'];

  // Find background image: the <img> in the first grid column
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  for (const div of gridDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }

  // Find the content div: usually has h1 and button/paragraph
  let contentDiv = null;
  for (const div of gridDivs) {
    if (div.querySelector('h1')) {
      contentDiv = div;
      break;
    }
  }

  // Defensive fallback: search all descendants if above fails
  if (!bgImg) {
    const img = element.querySelector('img');
    if (img) bgImg = img;
  }
  if (!contentDiv) {
    const h1 = element.querySelector('h1');
    if (h1) contentDiv = h1.closest('div');
  }

  // Compose the text/call-to-action cell
  let textCellContent = [];
  if (contentDiv) {
    // Title (h1)
    const h1 = contentDiv.querySelector('h1');
    if (h1) textCellContent.push(h1);
    // Subheading (first p)
    const p = contentDiv.querySelector('p');
    if (p) textCellContent.push(p);
    // Call-to-action (first a inside .button-group)
    const buttonGroup = contentDiv.querySelector('.button-group');
    if (buttonGroup) {
      const btn = buttonGroup.querySelector('a');
      if (btn) textCellContent.push(btn);
    } else {
      // Fallback: any link
      const btn = contentDiv.querySelector('a');
      if (btn) textCellContent.push(btn);
    }
  }

  // Always create 3 rows, even if some content is missing
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [textCellContent.length > 0 ? textCellContent : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
