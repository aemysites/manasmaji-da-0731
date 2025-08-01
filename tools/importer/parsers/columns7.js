/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with exactly one column as required
  const headerRow = ['Columns block (columns7)'];

  // All direct child divs are columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // The second row should have one cell per column
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    if (img) return img;
    // fallback if no img
    return '';
  });

  const cells = [
    headerRow,       // Single-cell header row
    contentRow       // Content row with a cell for each column
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
