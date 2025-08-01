/* global WebImporter */
export default function parse(element, { document }) {
  // The table header must match exactly
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Select all card links that are direct children
  const cardLinks = element.querySelectorAll(':scope > a.card-link');

  cardLinks.forEach((card) => {
    // Get the image: in .utility-aspect-3x2 img
    let img = null;
    const imageContainer = card.querySelector('.utility-aspect-3x2');
    if (imageContainer) {
      img = imageContainer.querySelector('img'); // will be null if no image
    }

    // Get text content: in .utility-padding-all-1rem
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    const textCellContents = [];
    if (textContainer) {
      // Tag(s) (optional)
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        // push each .tag in the group
        tagGroup.querySelectorAll('.tag').forEach(tag => textCellContents.push(tag));
      }
      // Heading (optional)
      const heading = textContainer.querySelector('.h4-heading');
      if (heading) {
        textCellContents.push(heading);
      }
      // Description/paragraph (optional)
      const paragraph = textContainer.querySelector('.paragraph-sm');
      if (paragraph) {
        textCellContents.push(paragraph);
      }
    }

    // Add this card's row: always 2 columns
    rows.push([
      img,
      textCellContents.length === 1 ? textCellContents[0] : textCellContents
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
