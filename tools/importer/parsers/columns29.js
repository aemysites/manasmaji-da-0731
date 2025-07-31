/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct column div children
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, get the main content (the .utility-aspect-1x1 div, which contains the img)
  const contentCells = columns.map((col) => {
    const aspect = col.querySelector(':scope > .utility-aspect-1x1');
    return aspect || col;
  });

  // The header row must be a single cell array, matching the example exactly
  // The next row is one cell per column
  const tableRows = [
    ['Columns (columns29)'],
    contentCells
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
