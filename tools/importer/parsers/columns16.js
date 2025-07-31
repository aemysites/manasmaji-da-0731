/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid element containing all columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct child divs of the grid (each is a column)
  const columnDivs = Array.from(grid.children);

  // For each column, grab ALL direct children (not just img)
  // This is more robust to text, images, links, etc in a column
  const columnsRow = columnDivs.map(col => {
    // Get all elements inside the column (usually a wrapper div or content)
    // If there's only one child, use it; if more, bundle them as an array
    const content = Array.from(col.childNodes).filter(
      node => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())
    );
    if (content.length === 1) {
      return content[0];
    } else if (content.length > 1) {
      return content;
    }
    // If empty, return empty string
    return '';
  });

  const headerRow = ['Columns block (columns16)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
