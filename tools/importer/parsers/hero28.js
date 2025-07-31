/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header as per spec
  const headerRow = ['Hero (hero28)'];

  // 2. Extract background image (row 2)
  let imageEl = null;
  // Find the img inside a child of the grid
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (grid) {
    const imgCandidate = grid.querySelector('img');
    if (imgCandidate) {
      imageEl = imgCandidate;
    }
  }

  // 3. Extract text content (row 3)
  let textContentEl = null;
  if (grid) {
    // Look for the container with the heading
    // It's the div with class 'container' and inside it another div holding the h1
    const container = grid.querySelector('.container');
    if (container) {
      // Reference the div that contains the heading and possible CTAs
      // It's typically the first div inside 'container'
      const innerDiv = container.querySelector('div');
      if (innerDiv) {
        textContentEl = innerDiv;
      } else {
        // fallback: reference the container itself
        textContentEl = container;
      }
    }
  }

  // Edge case: fallback if grid missing
  if (!imageEl) {
    imageEl = element.querySelector('img');
  }
  if (!textContentEl) {
    // Look for any heading inside the element
    const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textContentEl = heading.parentElement;
  }

  // If still nothing found, put empty cells (shouldn't happen for this block)
  const rows = [headerRow];
  rows.push([imageEl ? imageEl : '']);
  rows.push([textContentEl ? textContentEl : '']);

  // 4. Create block table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
