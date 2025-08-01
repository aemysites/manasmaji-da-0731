/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row: one column, matching exactly the example
  const headerRow = ['Columns block (columns17)'];

  // Find all direct children divs (each is a column wrapper)
  const columnDivs = element.querySelectorAll(':scope > div');

  // Prepare the images as columns for the content row
  const images = Array.from(columnDivs).map(div => div.querySelector('img') || '');

  // Compose the table: header is a single cell, content row has as many columns as needed
  const tableRows = [headerRow, images];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
