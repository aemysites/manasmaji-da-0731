/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Hero (hero6)'];

  // Get the background image (img tag)
  const bgImg = element.querySelector('img');
  const imageRow = [bgImg ? bgImg : ''];

  // Get the card with the text content (title, subtitle, CTAs)
  const card = element.querySelector('.card');
  const contentItems = [];
  if (card) {
    // Title
    const title = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (title) contentItems.push(title);
    // Subheading (prefer .subheading, else first <p>)
    const subheading = card.querySelector('p.subheading') || card.querySelector('p');
    if (subheading) contentItems.push(subheading);
    // CTA group (button group container)
    const ctaGroup = card.querySelector('.button-group');
    if (ctaGroup) {
      contentItems.push(ctaGroup);
    } else {
      // If no .button-group, check for loose <a> buttons
      const looseLinks = Array.from(card.querySelectorAll('a'));
      if (looseLinks.length) contentItems.push(looseLinks);
    }
  }
  // Always make content cell an array, even if empty
  const contentRow = [contentItems];

  // Assemble rows according to requirements
  const rows = [headerRow, imageRow, contentRow];
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
