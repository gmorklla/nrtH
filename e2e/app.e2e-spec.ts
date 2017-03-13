import { NrtHPage } from './app.po';

describe('nrt-h App', function() {
  let page: NrtHPage;

  beforeEach(() => {
    page = new NrtHPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
