/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout container with columns
  let gridContainer = null;
  const children = Array.from(element.children);
  for (let i = 0; i < children.length; i++) {
    if (children[i].classList.contains('grid-layout')) {
      gridContainer = children[i];
      break;
    }
  }
  if (!gridContainer) return;
  // Get each immediate child (column) of the grid layout
  const columns = Array.from(gridContainer.children);
  // Defensive: if there are no columns, bail
  if (!columns.length) return;
  // Compose the table: first row is header, second row is the actual columns content
  const headerRow = ['Columns block (columns31)'];
  // Each column cell is the original element reference
  const contentRow = columns;
  const tableArr = [headerRow, contentRow];
  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableArr, document);
  // Replace the original element
  element.replaceWith(block);
}
