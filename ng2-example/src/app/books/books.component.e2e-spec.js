describe('books', function () {

    beforeEach(function () {
        browser.get('/books');
    });

    it('should show loging when I go to books url', function () {
        var login = element(by.tagName('my-login'));
        expect(login.isPresent()).toEqual(true);
    });
    it('should redirect to books component when I logged', function () {
        login();
        element(by.id('btnLogin')).click().then(function () {
            expect(eventual(protractor.ExpectedConditions.presenceOf(element(by.tagName('books'))))).toBe(true);
        });
        browser.waitForAngular();
    });
    it('should return cards sorting by title when I selected title option in filter dropdownlist', function () {
        login();
        element(by.id('btnLogin')).click().then(function () {
            expect(eventual(protractor.ExpectedConditions.presenceOf(element(by.tagName('books'))))).toBe(true);
            var filters = element(by.tagName('book-filters'));
            expect(filters.isPresent()).toEqual(true);
            getFilterOptions().then(function (options) {
                options[1].click().then(function () {
                    getCards().then(function (cards) {
                        expect(cards.length > 0).toBe(true);
                        var title=cards[0].element(by.tagName("h4"))
                        expect(title.getText()).toEqual("AngularJS 2");

                    });
                });

            });

        });
        browser.waitForAngular();
    });


});
function getCards() {
    return element.all(by.className('card-outline-secondary'));
}
function getFilterOptions() {
    let dropDown = element(by.id("sortBy"));
    return getSelectOptions(dropDown);
}
function getSelectOptions(element) {
    return element.all(by.tagName('option'));
}
function login() {
    var login = element(by.tagName('my-login'));
    expect(login.isPresent()).toEqual(true);

    var email = login.element(by.id("inputEmail"));
    email.sendKeys('jcyovera@gmail.com');
    var passwd = login.element(by.id("inputPassword"));
    passwd.sendKeys('admin123');
}

function eventual(expectedCondition) {
    return browser.wait(expectedCondition).then(function () {
        return true;
    }, function () {
        return false;
    });
}