/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header per block guidelines
  const headerRow = ['Table (bordered)'];
  // 2. Table columns per screenshot: Question | Answer
  const tableHeader = ['Question', 'Answer'];
  const rows = [];

  // Each Q/A pair is in a .divider child, containing a .w-layout-grid with 2 div children: [0]=question, [1]=answer
  const dividers = element.querySelectorAll(':scope > .divider');
  dividers.forEach(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    // Defensive: expect at least 2 children
    const children = grid.children;
    const question = children[0] || document.createElement('div');
    const answer = children[1] || document.createElement('div');
    rows.push([question, answer]);
  });

  // Final table data structure
  const tableData = [headerRow, tableHeader, ...rows];

  // Create and replace in DOM
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}