/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header as in the example: one row, one cell, with block name
  const rows = [['Accordion']];

  // All accordion items are top-level children with class 'accordion'
  const accordions = element.querySelectorAll(':scope > .accordion');

  accordions.forEach((accordion) => {
    // Title: the .w-dropdown-toggle contains the title, usually inside .paragraph-lg
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg');
      if (!titleEl) {
        // Fallback: use the toggle itself if no .paragraph-lg
        titleEl = toggle;
      }
    } else {
      titleEl = document.createElement('div');
    }
    
    // Content: the .accordion-content contains the content
    const content = accordion.querySelector('.accordion-content');
    let contentCell = null;
    if (content) {
      // Only the first child of .accordion-content contains the actual visible content
      // Sometimes there may be wrappers, so use the whole .accordion-content
      contentCell = content;
    } else {
      // Defensive: empty cell
      contentCell = document.createElement('div');
    }

    rows.push([titleEl, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
