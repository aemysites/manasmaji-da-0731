/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Cards (cards10)'];

  // Find all card links directly under the main container
  const cards = element.querySelectorAll(':scope > a.card-link');

  // Build each card row for the block table
  const rows = Array.from(cards).map(card => {
    // IMAGE COLUMN
    // Find the image inside the aspect ratio div
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    const image = imageDiv ? imageDiv.querySelector('img') : null;
    // TEXT COLUMN
    const textDiv = card.querySelector('.utility-padding-all-1rem');
    const cellParts = [];

    // Tag (optional, above the heading)
    const tag = textDiv && textDiv.querySelector('.tag-group .tag');
    if (tag) {
      // Place the original tag element inside a div for separation
      const tagWrap = document.createElement('div');
      tagWrap.append(tag);
      cellParts.push(tagWrap);
    }
    // Heading (h3)
    const heading = textDiv && textDiv.querySelector('h3');
    if (heading) cellParts.push(heading);
    // Description (p)
    const desc = textDiv && textDiv.querySelector('p');
    if (desc) cellParts.push(desc);
    // Output the row: [image, [tag, heading, desc]]
    return [image, cellParts];
  });

  // Build the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
