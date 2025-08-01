/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Create a table manually so the header row can have colspan
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Header row, with colspan to span all columns
  const trHead = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns block (columns3)';
  if (columns.length > 1) th.setAttribute('colspan', columns.length);
  trHead.appendChild(th);
  thead.appendChild(trHead);
  table.appendChild(thead);

  // Content row
  const trBody = document.createElement('tr');
  columns.forEach(col => {
    const td = document.createElement('td');
    td.append(col);
    trBody.appendChild(td);
  });
  tbody.appendChild(trBody);
  table.appendChild(tbody);

  element.replaceWith(table);
}
