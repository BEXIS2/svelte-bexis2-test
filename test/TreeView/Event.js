import Browser from '../../util/Browser';
import { assert } from 'chai';
import elements from '../../util/common/elements';


describe('Click an Element of a Tree View', () => {

  it('should test the tree view for events', async () => {

    const page = await Browser.openTab();

    // wait for Treeview button and click it
    await assert.isFulfilled(page.waitForSelector('#bexis2-treeview'), 'should wait for Treeview button on storybook explorer menu');
    await assert.isFulfilled(page.click('#bexis2-treeview'), 'should click Treeview button on storybook explorer menu');

    // wait for Examples button and click it
    await assert.isFulfilled(page.waitForSelector('#bexis2-treeview-examples'), 'should wait for Examples button under Treeview');
    await assert.isFulfilled(page.click('#bexis2-treeview-examples'), 'should click Examples button under Treeview');

    // click Events button and wait for navigation
    await Promise.all([
      page.waitForNavigation(),
      elements.clickAnyElementByText(page, 'Events')
    ]);

    // get storybook frame
    const frame = page.frames().find(f => f.name() === 'storybook-preview-iframe');

    // wait for header change to Events
    await assert.isFulfilled(frame.waitForXPath('//h2[text()="Events"]'), 'should wait for Events header');

    // click the first arrow to expand the tree view
    await assert.isFulfilled(frame.waitForSelector('#root > div > div.border.p-3 > div:nth-child(2) > div.col-md-5 > div > ul > li:nth-child(1) > div > span > svg'), 'should wait for the first arrow');
    const buttonArrowFirst = await frame.$('#root > div > div.border.p-3 > div:nth-child(2) > div.col-md-5 > div > ul > li:nth-child(1) > div > span > svg');
    await assert.isFulfilled(buttonArrowFirst.click(), 'should click the first arrow to exapand the tree view');

    // wait for the second arrow and click the second arrow to expand the tree view
    await assert.isFulfilled(frame.waitForSelector('#root > div > div.border.p-3 > div:nth-child(2) > div.col-md-5 > div > ul > li:nth-child(1) > div:nth-child(2) > ul > li:nth-child(2) > div:nth-child(1) > span > svg'), 'should wait for the second arrow');
    const buttonArrowSecond = await frame.$('#root > div > div.border.p-3 > div:nth-child(2) > div.col-md-5 > div > ul > li:nth-child(1) > div:nth-child(2) > ul > li:nth-child(2) > div:nth-child(1) > span > svg');
    await assert.isFulfilled(buttonArrowSecond.click(), 'should click the second arrow to expand the tree view');

    // wait for underlaying list and check it
    await assert.isFulfilled(frame.waitForXPath('//a[text()="underlaying"]'), 'should wait for underlaying');
    await assert.isFulfilled(elements.clickElementByLinkText(frame, 'underlaying'), 'should check underlaying input box');
  });
});