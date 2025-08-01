/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns in source)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // The header row must be a single cell
  const headerRow = ['Columns (columns38)'];

  // The content row must also be a single cell containing all columns side by side
  const contentRow = [columns];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}