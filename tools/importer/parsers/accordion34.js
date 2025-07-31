/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct accordion items (should be .accordion under the top container)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Prepare table rows, starting with the header
  const rows = [['Accordion']];

  accordionItems.forEach(item => {
    // Title: the clickable area with the label
    const toggle = item.querySelector(':scope > .w-dropdown-toggle');
    let titleCell = null;
    if (toggle) {
      // Prefer the .paragraph-lg element inside the toggle
      const paragraph = toggle.querySelector('.paragraph-lg');
      titleCell = paragraph || toggle;
    } else {
      // Fallback: empty div to avoid null cell
      titleCell = document.createElement('div');
    }

    // Content: the expandable area
    const content = item.querySelector(':scope > .accordion-content');
    // The actual visible content is usually inside .w-richtext or .rich-text below content
    let contentCell = null;
    if (content) {
      // Try to find the rich-text inside content
      const rich = content.querySelector('.w-richtext, .rich-text');
      contentCell = rich || content;
    } else {
      // Fallback: empty div to avoid null cell
      contentCell = document.createElement('div');
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the Accordion block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
