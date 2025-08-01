/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all direct children with given selector
  function directChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Compose header row: always one column only
  const headerRow = ['Columns block (columns11)'];

  // Find the two grids: the main content grid and the image grid
  const container = element.querySelector(':scope > .container');
  let firstGrid = null;
  if (container) {
    firstGrid = container.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  }

  let leftColEls = [];
  if (firstGrid) {
    const firstGridCols = directChildren(firstGrid, 'div');
    firstGridCols.forEach(col => leftColEls.push(col));
  }
  const leftColDiv = document.createElement('div');
  leftColEls.forEach(el => leftColDiv.appendChild(el));

  // Image grid
  const imageGrid = element.querySelector('.w-layout-grid.mobile-portrait-1-column');
  let imageCells = [];
  if (imageGrid) {
    const imgDivs = directChildren(imageGrid, '.utility-aspect-1x1');
    imgDivs.forEach(div => {
      const img = div.querySelector('img');
      if (img) {
        imageCells.push(div);
      } else {
        imageCells.push('');
      }
    });
  }

  // The header must always be a single cell (one column),
  // but subsequent rows can have two columns
  const cells = [
    headerRow,
    [leftColDiv, imageCells[0] || ''],
    [imageCells[1] || '', '']
  ];

  // Patch: force the header to be a single cell spanning all columns
  // WebImporter.DOMUtils.createTable expects: if the first row has 1 cell, it will span all columns

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
