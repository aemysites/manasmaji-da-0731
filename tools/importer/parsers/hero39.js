/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block definition
  const headerRow = ['Hero (hero39)'];

  // Find background image (optional)
  let bgImg = null;
  const gridRoot = element.querySelector('.w-layout-grid');
  if (gridRoot) {
    // The first child div typically contains the background image
    const bgDiv = gridRoot.children[0];
    if (bgDiv) {
      const testImg = bgDiv.querySelector('img');
      if (testImg) {
        bgImg = testImg;
      }
    }
  }

  // Find text content (title, subheading, CTA)
  let textCellContent = [];
  // The second child div of gridRoot typically has the text content
  if (gridRoot && gridRoot.children.length > 1) {
    const textDiv = gridRoot.children[1];
    // Find inner grid, then its direct children
    const innerGrid = textDiv.querySelector('.w-layout-grid');
    if (innerGrid) {
      // Heading
      const h1 = innerGrid.querySelector('h1');
      if (h1) textCellContent.push(h1);
      // flex-vertical (contains paragraph and button group)
      const flexVert = innerGrid.querySelector('.flex-vertical');
      if (flexVert) {
        // Paragraph (subheading)
        const para = flexVert.querySelector('p');
        if (para) textCellContent.push(para);
        // Button group (contains CTA button(s))
        const btnGroup = flexVert.querySelector('.button-group');
        if (btnGroup) {
          // Add all direct <a> children
          const links = btnGroup.querySelectorAll('a');
          links.forEach(a => textCellContent.push(a));
        }
      }
    }
  }
  // Defensive: If nothing found, add an empty string to keep structure
  if (textCellContent.length === 0) textCellContent = [''];
  // Compose table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [textCellContent]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
