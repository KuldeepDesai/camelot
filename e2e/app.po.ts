export class MhvresidentsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('mhvresidents-app h1')).getText();
  }
}
