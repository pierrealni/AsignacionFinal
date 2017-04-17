describe('Home', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have <my-home>', function () {
    var home = element(by.css('my-app my-home'));
    expect(home.isPresent()).toEqual(true);
    var title= home.element(by.tagName("h2"));
    expect(title.getText()).toEqual("Home Works!");
  });

});
