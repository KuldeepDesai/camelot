import { MhvresidentsPage } from './app.po';

describe('mhvresidents App', function() {
  let page: MhvresidentsPage;

  beforeEach(() => {
    page = new MhvresidentsPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('mhvresidents works!');
  });
});
