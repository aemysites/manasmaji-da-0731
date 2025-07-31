/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container (should be .container)
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // Find the main grid (should be .grid-layout that's a direct child of .container)
  const grids = Array.from(container.querySelectorAll(':scope > .grid-layout'));
  if (!grids.length) return;
  const mainGrid = grids[0];

  // The mainGrid has: [heading <p>][paragraph <p>][nested grid]
  // We want: left column = heading + avatar/name; right column = testimonial + svg logo
  const children = Array.from(mainGrid.children);
  if (children.length < 3) return; // Defensive: Not enough children

  // The pieces:
  const heading = children[0];
  const testimonial = children[1];
  const nestedGrid = children[2];

  // From nestedGrid, get the avatar/name (flex-horizontal) and svg logo
  let avatarBlock = null;
  let logoBlock = null;
  if (nestedGrid && nestedGrid.classList.contains('grid-layout')) {
    const nestedChildren = Array.from(nestedGrid.children);
    nestedChildren.forEach(child => {
      if (child.classList.contains('flex-horizontal')) {
        avatarBlock = child;
      } else if (child.querySelector('svg')) {
        logoBlock = child;
      }
    });
  }

  // Compose left and right columns as arrays of elements (order matters)
  const leftCol = [];
  if (heading) leftCol.push(heading);
  if (avatarBlock) leftCol.push(avatarBlock);
  const rightCol = [];
  if (testimonial) rightCol.push(testimonial);
  if (logoBlock) rightCol.push(logoBlock);

  // If a column is empty, provide an empty string as fallback for cell
  const leftCell = leftCol.length ? leftCol : [''];
  const rightCell = rightCol.length ? rightCol : [''];

  // Block table header: must match the example exactly
  const headerRow = ['Columns block (columns26)'];
  // Now build the table data
  const cells = [
    headerRow,
    [leftCell, rightCell]
  ];

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
