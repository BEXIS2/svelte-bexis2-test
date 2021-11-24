import Browser from '../../util/Browser';
import { assert } from 'chai';
import dataTablesElements from './dataTablesElements';
import elements from '../../util/common/elements';


describe('Search an Entry In a Data Table and Descend the Columns', () => {

  it('should test searching for an existing entry on the data table for default setup', async () => {

    const page = await Browser.openTab();

    // wait for Data Table button and click it
    await assert.isFulfilled(page.waitForSelector('#bexis2-datatable'), 'should wait for DataTable button on storybook explorer menu');
    await assert.isFulfilled(page.click('#bexis2-datatable'), 'should click DataTable button on storybook explorer menu');

    // get storybook frame
    const frame = page.frames().find(f => f.name() === 'storybook-preview-iframe');

    // filter table and find a match
    await assert.isFulfilled(dataTablesElements.findMatchBySearch(frame, assert, elements, '#DataTables_Table_0', '#DataTables_Table_0_filter > label > input[type=search]', 'basilicum'), 'should find the entry on the table');

  });

  it('should test searching for a non-existing entry on the data table for default setup', async () => {

    const page = await Browser.openTab();

    // wait for Data Table button and click it
    await assert.isFulfilled(page.waitForSelector('#bexis2-datatable'), 'should wait for DataTable button on storybook explorer menu');
    await assert.isFulfilled(page.click('#bexis2-datatable'), 'should click DataTable button on storybook explorer menu');

    // get storybook frame
    const frame = page.frames().find(f => f.name() === 'storybook-preview-iframe');

    // filter table and don't find a match
    await assert.isFulfilled(dataTablesElements.failMatchBySearch(frame, assert, elements, '#DataTables_Table_0', '#DataTables_Table_0_filter > label > input[type=search]', 'basilicumX'), 'should find the entry on the table');

  });

  it('should test for sorting of a data table by ascending or descending order', async () => {

    const page = await Browser.openTab();

    // wait for Data Table button and click it
    await assert.isFulfilled(page.waitForSelector('#bexis2-datatable'), 'should wait for DataTable button on storybook explorer menu');
    await assert.isFulfilled(page.click('#bexis2-datatable'), 'should click DataTable button on storybook explorer menu');

    // get storybook frame
    const frame = page.frames().find(f => f.name() === 'storybook-preview-iframe');

    // Sort data table content in descending order by column header
    await assert.isFulfilled(dataTablesElements.descendDataTableByColumnHeader(frame, assert, elements, '#DataTables_Table_0', '#DataTables_Table_0 > thead > tr > th', 0, 1, 1), 'should find the entry on the table');

  });
});