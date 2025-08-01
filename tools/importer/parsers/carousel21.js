/* global WebImporter */
export default function parse(element, { document }) {
  // We'll collect all slides, header row first
  // According to the markdown example, the first row is a single cell with the block name, then each row has 2 cells
  const cells = [['Carousel']];

  // Find all possible slides (generalized for multiple slides)
  let slideNodes = [];
  const directSlides = element.querySelectorAll(':scope > .ix-card-rotate-2');
  if (directSlides.length > 0) {
    slideNodes = Array.from(directSlides);
  } else {
    const cardSlides = element.querySelectorAll('.ix-card-rotate-2');
    if (cardSlides.length > 0) {
      slideNodes = Array.from(cardSlides);
    } else {
      slideNodes = [element];
    }
  }

  // For each slide, extract image and text
  slideNodes.forEach((slideEl) => {
    const cardBody = slideEl.querySelector('.card-body') || slideEl;
    const img = cardBody.querySelector('img');
    const heading = cardBody.querySelector('.h4-heading, h1, h2, h3, h4, h5, h6, .heading, .card-title, [class*=heading]');
    let description = null;
    // Find next sibling of heading that is not the image
    if (heading) {
      let next = heading.nextElementSibling;
      while (next && next.tagName === 'IMG') {
        next = next.nextElementSibling;
      }
      if (next && next !== img) {
        description = next;
      }
    }
    const textCell = [];
    if (heading) textCell.push(heading);
    if (description) textCell.push(description);
    cells.push([
      img,
      textCell.length ? textCell : ''
    ]);
  });

  // Ensure all table rows after header are arrays of length 2
  // (the header row is length 1, as in the markdown)
  // This matches the markdown structure for WebImporter

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
