/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs for columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, use the contained img if present, else the div's content
  const columns = columnDivs.map(div => {
    const img = div.querySelector('img');
    if (img) return img;
    // fallback for non-image content:
    const childNodes = Array.from(div.childNodes).filter(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim().length > 0;
      }
      return true;
    });
    return childNodes.length === 1 ? childNodes[0] : childNodes;
  });

  // The header row must be a single cell, matching the example structure
  const headerRow = ['Columns block (columns4)'];
  const contentRow = columns;
  // Create the table with the correct block structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
