/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout for the columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Prepare variables for left (text) and right (image) columns
  let leftCol = null;
  let rightCol = null;

  // Identify columns: one is text, one is image
  gridChildren.forEach(child => {
    if (!leftCol && (child.querySelector('h1') || child.querySelector('p') || child.querySelector('.button-group'))) {
      leftCol = child;
    }
    if (!rightCol && (child.tagName === 'IMG' || child.querySelector('img'))) {
      rightCol = (child.tagName === 'IMG') ? child : child.querySelector('img');
    }
  });

  // Fallbacks if not both columns identified
  if (!leftCol && gridChildren.length > 0) leftCol = gridChildren[0];
  if (!rightCol && gridChildren.length > 1) rightCol = gridChildren[1];

  // Ensure leftCol and rightCol are arrays for cell content
  const leftColContent = [];
  if (leftCol) {
    // Extract all h1-h6, p, and .button-group elements, preserving order and structure
    Array.from(leftCol.childNodes).forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE && (node.matches('h1,h2,h3,h4,h5,h6,p,.button-group'))) {
        leftColContent.push(node);
      }
    });
    // If nothing found, push the whole leftCol
    if (leftColContent.length === 0) leftColContent.push(leftCol);
  }
  const rightColContent = rightCol ? [rightCol] : [];

  // Compose table as per the example
  const headerRow = ['Columns block (columns15)'];
  const contentRow = [leftColContent, rightColContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
