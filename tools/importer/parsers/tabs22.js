/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab menu and tabs content by class
  const children = Array.from(element.children);
  let tabMenu = null;
  let tabsContent = null;
  for (const child of children) {
    if (child.classList.contains('w-tab-menu')) {
      tabMenu = child;
    } else if (child.classList.contains('w-tab-content')) {
      tabsContent = child;
    }
  }
  if (!tabMenu || !tabsContent) return;

  // Get all tab links (labels)
  const tabLinks = Array.from(tabMenu.querySelectorAll('a'));
  const tabLabels = tabLinks.map(link => {
    // Prefer a child div for label (as in provided HTML)
    const labelDiv = link.querySelector('div');
    if (labelDiv && labelDiv.textContent.trim()) {
      return labelDiv.textContent.trim();
    }
    return link.textContent.trim();
  });

  // Get tab panes (each represents a tab's content)
  const tabPanes = Array.from(tabsContent.querySelectorAll(':scope > .w-tab-pane'));
  
  // Construct rows: header + each tab (label, content)
  const cells = [];
  // Header row: single cell only
  cells.push(['Tabs']);
  for (let i = 0; i < tabLabels.length; i++) {
    const label = tabLabels[i];
    const pane = tabPanes[i];
    // Ensure pane exists
    let tabContentElem = null;
    if (pane) {
      // If pane has exactly 1 div, use that as cell (matches example structure)
      const mainDivs = Array.from(pane.children).filter(c => c.tagName === 'DIV');
      if (mainDivs.length === 1) {
        tabContentElem = mainDivs[0];
      } else {
        // Fallback: use pane itself
        tabContentElem = pane;
      }
    }
    cells.push([
      label,
      tabContentElem
    ]);
  }

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
