/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first-level grid inside the section
  const outerGrid = element.querySelector('.grid-layout.grid-gap-xxl');
  if (!outerGrid) return;

  // This grid contains two children: one is a content block (div), the other is an image (img)
  const columns = [];

  // Content column: should be a div with heading, paragraph, buttons
  const contentColumn = Array.from(outerGrid.children).find(child => {
    return child.tagName === 'DIV' && child.querySelector('h2');
  });
  if (contentColumn) columns.push(contentColumn);

  // Image column: the image element
  const imageColumn = Array.from(outerGrid.children).find(child => child.tagName === 'IMG');
  if (imageColumn) columns.push(imageColumn);

  // If we didn't find both columns, abort (preserves resilience, prevents bad output)
  if (columns.length !== 2) return;

  // Construct the columns block table as per guidelines
  const headerRow = ['Columns block (columns5)'];
  const columnsRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
