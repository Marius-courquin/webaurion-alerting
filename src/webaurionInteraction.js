import puppeteer from "puppeteer";

export async function downloadNotes(downloadPath) {
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 1000 });

    await page._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: downloadPath
    });

    await page.goto(process.env.APP_URL);

    await page.type('#username', process.env.APP_ID);
    await page.type('#password', process.env.APP_PASSWORD);
    await page.click('.ui-button-text.ui-c');
    await page.waitForTimeout(4000);
    try {
        await page.waitFor('#mobile-menu-btn', { visible: true, timeout: 5000 });
        await page.click('#mobile-menu-btn');
    } catch {
        await page.click('#menu-resize-btn');
    }
    await page.click('ul.ui-menu-list li:nth-child(2)');
    await page.waitForTimeout(2000);

    await page.click('li.ui-menu-parent:nth-child(1) > a:nth-child(1)');
    await page.waitForTimeout(2000);

    await page.click('.item_3084597');

    await page.waitForTimeout(2000);

    await page.click('#form\\:exportButton');

    await page.click('#form\\:j_idt172');

    await page.waitForTimeout(10000);

    await browser.close();
}