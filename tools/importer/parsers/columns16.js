/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Each immediate child is a column wrapper
  const columnDivs = Array.from(grid.children);
  // For each column, get its direct content (not just the image!)
  // Robust: include the entire inner structure of each column
  const columnContents = columnDivs.map(colDiv => {
    // Find the innermost div that actually contains the content
    // If there's only one child, return it, otherwise gather all
    const innerDivs = Array.from(colDiv.children);
    if (innerDivs.length === 1) {
      return innerDivs[0];
    }
    // If multiple, return as an array (WebImporter supports this)
    return innerDivs;
  });
  // Build the cells array
  const headerRow = ['Columns block (columns16)'];
  const contentRow = columnContents;
  const cells = [headerRow, contentRow];
  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the table
  element.replaceWith(block);
}