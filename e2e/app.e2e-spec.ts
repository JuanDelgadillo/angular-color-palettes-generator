import { PaletteColorGeneratorsPage } from './app.po';

describe('palette-color-generators App', () => {
  let page: PaletteColorGeneratorsPage;

  beforeEach(() => {
    page = new PaletteColorGeneratorsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
