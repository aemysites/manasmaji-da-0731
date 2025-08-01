/* global WebImporter */
export default function parse(element, { document }) {
  // Collect the FAQ rows from the HTML
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));
  const rows = dividers.map(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return null;
    const question = grid.children[0];
    const answer = grid.children[1];
    if (question && answer) {
      return [question, answer];
    }
    return null;
  }).filter(Boolean);

  // Determine correct column count (for this FAQ, always 2)
  const colCount = 2;

  // Create the header row as a single cell spanning all columns
  // The WebImporter.DOMUtils.createTable helper does not support colspans directly,
  // but will render the first row as a single cell as in the example.
  // All subsequent rows must have exactly colCount items.
  const tableData = [ ['Table (bordered)'], ...rows ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
