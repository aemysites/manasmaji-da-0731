/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Get tab labels
  const tabMenu = element.querySelector('.w-tab-menu');
  let labels = [];
  if (tabMenu) {
    const tabLinks = tabMenu.querySelectorAll('a');
    labels = Array.from(tabLinks).map(link => {
      const labelDiv = link.querySelector('div');
      return labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
    });
  }

  // 2. Get tab contents
  const tabContentContainer = element.querySelector('.w-tab-content');
  let contents = [];
  if (tabContentContainer) {
    const tabPanes = tabContentContainer.children;
    contents = Array.from(tabPanes).map(pane => {
      const grid = pane.querySelector('.w-layout-grid');
      return grid || pane;
    });
  }

  // Defensive: Make sure labels and contents arrays match
  const maxLen = Math.max(labels.length, contents.length);

  // 3. Build the table rows
  // Header row: one cell, exactly 'Tabs'
  const cells = [ [ 'Tabs' ] ];
  // Data rows: [label, content]
  for (let i = 0; i < maxLen; i++) {
    cells.push([
      labels[i] !== undefined ? labels[i] : '',
      contents[i] !== undefined ? contents[i] : document.createTextNode('')
    ]);
  }

  // 4. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Ensure the header row has only a single (colspan) th if needed
  const headerRow = table.querySelector('tr:first-child');
  if (headerRow && headerRow.children.length === 1 && (maxLen > 0 && cells[1].length > 1)) {
    headerRow.children[0].setAttribute('colspan', cells[1].length);
  }
  element.replaceWith(table);
}
