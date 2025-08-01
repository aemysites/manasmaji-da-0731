/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: block name
  const cells = [
    ['Hero (hero28)'],
  ];

  // 2. Second row: Background image (optional)
  let bgImg = null;
  // The structure is: header > .w-layout-grid > first div > ... > img
  const grid = element.querySelector('.w-layout-grid');
  if (grid && grid.children.length > 0) {
    const visualDiv = grid.children[0];
    if (visualDiv) {
      // Search for img inside this block
      bgImg = visualDiv.querySelector('img');
    }
  }
  cells.push([bgImg ? bgImg : '']);

  // 3. Third row: Headline, subheading, CTA, etc.
  const textContent = [];
  if (grid && grid.children.length > 1) {
    const textDiv = grid.children[1];
    // Always add h1 if present
    const h1 = textDiv.querySelector('h1');
    if (h1) textContent.push(h1);
    // Optionally, add more headings, p, CTAs in order if present (here, there are none, but allow for generality)
    // Exclude h1 if already included
    const others = textDiv.querySelectorAll('h2, h3, h4, p, span, a, button');
    others.forEach((el) => {
      if (!textContent.includes(el)) textContent.push(el);
    });
  }
  cells.push([textContent.length > 0 ? textContent : '']);

  // 4. Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
