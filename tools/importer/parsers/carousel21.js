/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Carousel'];

  // Find the card body that contains slide content
  const cardBody = element.querySelector('.card-body');

  // Extract image for the first cell (mandatory)
  let img = null;
  if (cardBody) {
    img = cardBody.querySelector('img');
  }

  // Extract heading (if any)
  let textCellContent = [];
  if (cardBody) {
    let heading = cardBody.querySelector('.h4-heading, h1, h2, h3, h4, h5, h6');
    if (heading) {
      // If it's not a heading element, wrap in <h2>
      if (!/^H[1-6]$/i.test(heading.tagName)) {
        const h2 = document.createElement('h2');
        h2.innerHTML = heading.innerHTML;
        textCellContent.push(h2);
      } else {
        textCellContent.push(heading);
      }
    }
    // Extract additional text content (e.g., paragraphs not in heading)
    // Only include <p> elements that are not descendants of a heading
    const ps = Array.from(cardBody.querySelectorAll('p')).filter(p => {
      let parent = p.parentElement;
      while (parent && parent !== cardBody) {
        if (/^H[1-6]$/i.test(parent.tagName)) return false;
        parent = parent.parentElement;
      }
      return true;
    });
    textCellContent.push(...ps);
  }

  if (textCellContent.length === 0) {
    textCellContent = [''];
  }

  const slideRow = [img, textCellContent];
  const cells = [headerRow, slideRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}