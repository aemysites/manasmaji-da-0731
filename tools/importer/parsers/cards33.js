/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches example
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Each card is a direct child <a>
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // First cell: img (mandatory, always present in these cards)
    const img = card.querySelector('img');
    // Second cell: all content except img
    const contentDiv = card.querySelector('div > div:last-child');
    const contentArr = [];
    if (contentDiv) {
      // Tag bar (first horizontal info row: tag + read time)
      const tagRow = contentDiv.querySelector('.flex-horizontal');
      if (tagRow) contentArr.push(tagRow);
      // Card title (h3 or .h4-heading)
      const heading = contentDiv.querySelector('h3, .h4-heading');
      if (heading) contentArr.push(heading);
      // Description (first p)
      const desc = contentDiv.querySelector('p');
      if (desc) contentArr.push(desc);
      // CTA (Read) - look for last div containing 'Read'
      const divs = contentDiv.querySelectorAll('div');
      let cta = null;
      for (let i = divs.length - 1; i >= 0; i--) {
        if (/read/i.test(divs[i].textContent.trim())) {
          cta = divs[i];
          break;
        }
      }
      if (cta) {
        // Create a link element referencing the card's href and the CTA text
        const a = document.createElement('a');
        a.href = card.href;
        a.textContent = cta.textContent.trim();
        contentArr.push(a);
      }
    }
    // Add card row: always 2 cells (img, text-content)
    rows.push([img, contentArr]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
