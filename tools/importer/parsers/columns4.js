/* global WebImporter */
export default function parse(element, { document }) {
  // Get all columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Compose the header row: single cell, spanning all columns
  const headerRow = ['Columns block (columns4)'];
  // Compose the content row: one cell per column, each containing the image (or whole content if more exists)
  const contentRow = columns.map(col => {
    // For resilience, use the column div itself (will often just be an <img> in this specific case)
    return col;
  });
  // Construct the table with a single header cell row, and a content row of as many columns as needed
  const cells = [
    headerRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
