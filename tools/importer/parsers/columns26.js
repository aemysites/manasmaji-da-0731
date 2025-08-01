/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we have the right container structure
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // The main two-column grid (columns)
  const grid = container.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of the main grid
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return;

  // First column: left (heading, avatar block)
  // Second column: right (testimonial text, logo)
  //
  // Structure of gridChildren:
  // 0: <p> heading
  // 1: <p> testimonial
  // 2: inner grid (divider, avatar block, logo svg)

  const heading = gridChildren[0];
  const testimonial = gridChildren[1];
  const innerGrid = gridChildren[2];

  // innerGrid children:
  // divider, flex-horizontal (avatar, name/title), utility-display-inline-block (contains svg)
  const innerGridChildren = Array.from(innerGrid.children);
  const avatarBlock = innerGridChildren.find(ch => ch.classList.contains('flex-horizontal'));
  const logoBlock = innerGridChildren.find(ch => ch.querySelector('svg'));

  // First column: heading + avatar block
  const leftCol = document.createElement('div');
  if (heading) leftCol.appendChild(heading);
  if (avatarBlock) leftCol.appendChild(avatarBlock);

  // Second column: testimonial + logo
  const rightCol = document.createElement('div');
  if (testimonial) rightCol.appendChild(testimonial);
  if (logoBlock) rightCol.appendChild(logoBlock);

  // Header row must match exactly
  const headerRow = ['Columns block (columns26)'];
  const contentRow = [leftCol, rightCol];

  // Build and replace
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(block);
}
