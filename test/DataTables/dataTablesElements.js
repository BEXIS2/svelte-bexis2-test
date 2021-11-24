/**
 * handle data tables elements
 */


export default {
  findMatchBySearch,
  failMatchBySearch,
  descendDataTableByColumnHeader
};


/** Search for an entry in a data tables with success
 *
 * @param {Object} page
 * @param {Object} assert
 * @param {Object} elements
 * @param {string} tableId
 * @param {string} searchField
 * @param {string} searchText
 */

async function findMatchBySearch(page, assert, elements, tableId, searchField, searchText) {

  // wait for Search input field and type an entry property that exists
  await page.waitForSelector(searchField);
  await page.type(searchField, searchText);

  // get the contents of the Data Table in 2D array after the search
  const arrayDataTableContent = await elements.tableContent2D(page, tableId);

  // check if the searched item exist
  const entryText = arrayDataTableContent[0].some(element => element.includes(searchText));
  assert.isTrue(entryText, 'the entry property should exist in the table');

}

/** Search for an entry in a data tables with fail
 *
 * @param {Object} page
 * @param {Object} assert
 * @param {Object} elements
 * @param {string} tableId
 * @param {string} searchField
 * @param {string} searchText
 */

async function failMatchBySearch(page, assert, elements, tableId, searchField, searchText) {

  // wait for Search input field and type an entry property that exists
  await page.waitForSelector(searchField);
  await page.type(searchField, searchText);

  // get the contents of the Data Table in 2D array after the search
  const arrayDataTableContent = await elements.tableContent2D(page, tableId);

  // check if the searched item exist
  const entryText = arrayDataTableContent[0].some(element => element.includes(searchText));

  // check if the 'No matching records found' exist on the table
  const noMatch = arrayDataTableContent[0].includes('No matching records found');

  assert.isFalse(entryText, 'the searched entry property should not exist on the table');
  assert.isTrue(noMatch, 'after not finding the searched entry, it should show a message "No matching records found"');
}

/** Sort data table content in descending order by column header
 *
 * @param {Object} page
 * @param {Object} assert
 * @param {number} tableId must be an integer greater than zero
 * @param {number} tableHeaders must be an integer greater than zero
 * @param {number} columnHeaderIndex must be an integer greater than zero
 * @param {number} firstRowIndex must be an integer greater than zero
 * @param {number} lastRowIndex must be an integer greater than zero
 */

async function descendDataTableByColumnHeader(page, assert, elements, tableId, tableHeaders, columnHeaderIndex, firstRowIndex, lastRowIndex) {

  // wait for Data Table
  await page.waitForSelector(tableId);

  // check if the column is already in ascending order
  const checkAscClass = await page.$$eval(tableHeaders, (headers, columnHeaderIndex) => headers[columnHeaderIndex].classList.contains('sorting_asc'), columnHeaderIndex);

  // click one of the headers to ascend the column under the header
  if (!checkAscClass)
    await page.$$eval(tableHeaders, (headers, columnHeaderIndex) => headers[columnHeaderIndex].click(), columnHeaderIndex);

  // get the contents of a column after the first click
  const afterFirstClickColumnContent = await elements.returnColumnContent(page, tableId, columnHeaderIndex, firstRowIndex, lastRowIndex);

  // click one of the headers to descend the column under the header
  await page.$$eval(tableHeaders, (headers, columnHeaderIndex) => headers[columnHeaderIndex].click(), columnHeaderIndex);

  // get the contents of a column after the second click
  const afterSecondClickColumnContent = await elements.returnColumnContent(page, tableId, columnHeaderIndex, firstRowIndex, lastRowIndex);

  // the before column content of a table should be equal to reverse of the after column content
  assert.equal(JSON.stringify(afterFirstClickColumnContent), JSON.stringify(afterSecondClickColumnContent.sort()), ' the column content of a table in ascending order should be equal to reverse of the descending column content order');
}