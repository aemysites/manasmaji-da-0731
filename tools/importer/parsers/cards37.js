/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card anchor/divs from a grid
  function extractCards(grid) {
    // Cards can be anchor or div with utility-link-content-block (Webflow)
    return Array.from(grid.querySelectorAll(':scope > a.utility-link-content-block, :scope > div.utility-link-content-block'));
  }

  // Find the main cards grid
  let mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  // If multiple, pick the first with direct card children
  if (mainGrid) {
    let candidateGrids = Array.from(element.querySelectorAll('.w-layout-grid.grid-layout'));
    for (let grid of candidateGrids) {
      if (extractCards(grid).length > 0) {
        mainGrid = grid;
        break;
      }
    }
  } else {
    // fallback: maybe element IS the grid
    mainGrid = element;
  }

  // Extract card elements (may include nested grid, so flatten)
  let cards = extractCards(mainGrid);
  // If fewer than 2, look for nested grid(s)
  if (cards.length < 2) {
    Array.from(mainGrid.querySelectorAll('.w-layout-grid.grid-layout')).forEach(grid => {
      let nestedCards = extractCards(grid);
      if (nestedCards.length > 0) {
        cards = cards.concat(nestedCards);
      }
    });
  }

  // If still no cards, fall back to all children with utility-link-content-block
  if (cards.length === 0) {
    cards = Array.from(mainGrid.querySelectorAll('.utility-link-content-block'));
  }

  // Build table rows: header, then one row per card
  const tableRows = [
    ['Cards (cards37)'],
  ];

  cards.forEach(card => {
    // IMAGE: find first <img> inside a .utility-aspect-* or direct child
    let img = null;
    let aspect = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    if (aspect && aspect.querySelector('img')) {
      img = aspect.querySelector('img');
    } else {
      img = card.querySelector('img');
    }
    // TEXT: heading (any h1-h6), paragraphs, CTA (button or .button div)
    const contentArr = [];
    // Title (any heading)
    let heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentArr.push(heading);
    // All paragraphs (in reading order)
    let ps = Array.from(card.querySelectorAll('p'));
    ps.forEach(p => contentArr.push(p));
    // CTA (button or link)
    let cta = card.querySelector('a.button, .button, .cta, .btn, a.cta');
    if (cta) contentArr.push(cta);
    // Only reference existing elements (not clone)
    tableRows.push([img, contentArr]);
  });

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
