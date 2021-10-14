const NewBrowser = require('../NewBrowser');
const { processoSession } = require('../util/logger');
const { USER_POWERBI, PASS_POWERBI } = require('../../config');

(async () => {
    processoSession.log('info', 'Iniciando sessão no PowerBi.')
    const browser = await NewBrowser();

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto('https://login.microsoftonline.com/common/oauth2/authorize?client_id=871c010f-5e61-4fb1-83ac-98610a7e9110&response_type=code%20id_token&scope=openid%20profile%20offline_access&state=OpenIdConnect.AuthenticationProperties%3DuOfzLfSCh4qHamJYrMgRKW03duliP8TVjtIdDiEJmQySHb3oFYaeieniKOynlJxkaH25nCD3BZJ3AoaBiUT6ifn3HaMpBuTNGS_0VKwKvIrb0oozawYcvfJ9u6XeXvHDGXYkcw1thF07eSq3XwB33COW0JvBHKOLA1Knb6GSTjqsqEuP9lc4oL7Q8azc2wannurWjTbxkjwZnOMzXiSPu12ypWVY6jg_TFg-gj73WTy5RW1aWpXNZklkXhi7pWTFJ7K1WZEF7F-eFe04fEUNBOppj9f1ttALClUv02RjjuwMrCEEYsePDmBRKz3BD0NXrtTSOhzbbcQJKi47I7ZLDG5wsRQ3KVd84AezVc9hj-XiKDLM1zb1gdEt1qe-y5nO&response_mode=form_post&nonce=637694005573011829.ZjgxZGY1ZmMtNzFlNy00YzAzLWFlZjktY2U2ODVkM2IyNmMyYzZmM2RmNTAtNjRmNS00MWEyLWE5N2UtZTc2MDZmMjQ0NmI4&site_id=500453&redirect_uri=https%3A%2F%2Fapp.powerbi.com%2Fgroups%2F77ff3217-ae8b-4332-8a70-cd1000b9ed1e%2Freports%2F871cf139-a42c-4bda-9c98-456979b26f6d%2FReportSection1153bbfc1f779b491975&post_logout_redirect_uri=https%3A%2F%2Fapp.powerbi.com%2Fgroups%2F77ff3217-ae8b-4332-8a70-cd1000b9ed1e%2Freports%2F871cf139-a42c-4bda-9c98-456979b26f6d%2FReportSection1153bbfc1f779b491975&resource=https%3A%2F%2Fanalysis.windows.net%2Fpowerbi%2Fapi&nux=1&msafed=0&x-client-SKU=ID_NET461&x-client-ver=5.6.0.0&sso_reload=true', {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']
    });
    await page.type('[name="loginfmt"]', USER_POWERBI)
    await page.$eval('#idSIButton9', btn => btn.click());
    await page.type('[name="passwd"]', PASS_POWERBI)

    await page.waitFor(3000)
    await page.$eval('#idSIButton9', btn => btn.click());
    await page.waitFor(3000)
    await page.$eval('#idSIButton9', btn => btn.click());
    await page.waitFor(3000)

    await browser.close();

    processoSession.log('info', 'Sessão iniciada com sucesso.')
})();