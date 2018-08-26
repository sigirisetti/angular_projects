import { QuarkPage } from './app.po';

describe('quark App', () => {
  let page: QuarkPage;

  beforeEach(() => {
    page = new QuarkPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
