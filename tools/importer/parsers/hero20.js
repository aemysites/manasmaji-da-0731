/* global WebImporter */
export default function parse(element, { document }) {
  // Select the grid wrapper holding the background collage and the content column
  const grid = element.querySelector('.w-layout-grid');
  let backgroundCell = [''];
  let contentCell = [''];

  if (grid) {
    // First column: background collage
    const imageBlockWrapper = grid.children[0];
    if (imageBlockWrapper) {
      const collageDiv = imageBlockWrapper.querySelector('.ix-hero-scale-3x-to-1x');
      if (collageDiv) {
        const collageGrid = collageDiv.querySelector('.grid-layout');
        if (collageGrid) {
          const imgs = Array.from(collageGrid.querySelectorAll('img'));
          // Only push images if found
          if (imgs.length > 0) {
            backgroundCell = imgs;
          }
        }
      }
    }

    // Second column: content (headline, subheading, ctas)
    const contentWrapper = grid.children[1];
    let cellContent = [];
    if (contentWrapper) {
      const container = contentWrapper.querySelector('.container');
      if (container) {
        // Heading (h1...h6)
        const heading = container.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) cellContent.push(heading);
        // Subheading
        const subheading = container.querySelector('p.subheading');
        if (subheading) cellContent.push(subheading);
        // Button group (if any)
        const buttonGroup = container.querySelector('.button-group');
        if (buttonGroup) {
          // Place each button (anchor) in order
          const buttons = Array.from(buttonGroup.querySelectorAll('a'));
          if (buttons.length) cellContent.push(...buttons);
        }
      }
    }
    if (cellContent.length > 0) {
      contentCell = cellContent;
    }
  }

  const cells = [
    ['Hero (hero20)'],
    [backgroundCell],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
