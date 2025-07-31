/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children for columns
  const columns = Array.from(element.querySelectorAll(':scope > .utility-aspect-1x1'));
  // Extract images from each column
  const images = columns.map(col => {
    const img = col.querySelector('img');
    return img || '';
  });
  // Header row should be a single cell, as in the example
  const headerRow = ['Columns block (columns17)'];
  // Second row: all column content in their own cells
  const contentRow = images;
  const tableRows = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}