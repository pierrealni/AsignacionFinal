describe('login', function () {
    beforeEach(function () {
        browser.get('/login');
    });

    it('should have <my-login>', function () {
        var login = element(by.tagName('my-login'));
        expect(login.isPresent()).toEqual(true);
    });
    it('should have title', function () {
        var login = element(by.tagName('my-login'));
        expect(login.isPresent()).toEqual(true);
        var title = login.element(by.tagName("h2"));
        expect(title.getText()).toEqual("LOGIN");
    });
    it('should log in the page', function () {
        var login = element(by.tagName('my-login'));
        expect(login.isPresent()).toEqual(true);

        var email = login.element(by.id("inputEmail"));
        email.sendKeys('jcyovera@gmail.com');
        var passwd = login.element(by.id("inputPassword"));
        passwd.sendKeys('admin123');

        element(by.id('btnLogin')).click().then(function () {
            expect(eventual(protractor.ExpectedConditions.presenceOf(element(by.tagName('my-home'))))).toBe(true);
        });

        browser.waitForAngular();
    });
    it('should show error message if the credentials are wrong', function () {
        var login = element(by.tagName('my-login'));
        expect(login.isPresent()).toEqual(true);

        var email = login.element(by.id("inputEmail"));
        email.sendKeys('jcyovera@gmail.com');
        var passwd = login.element(by.id("inputPassword"));
        passwd.sendKeys('admin12');

        element(by.id('btnLogin')).click().then(function () {
            var message = element(by.id("errorMessage"));
            expect(message.isPresent()).toBe(true);
        });
        browser.waitForAngular();
    });
});
function eventual(expectedCondition) {
    return browser.wait(expectedCondition).then(function () {
        return true;
    }, function () {
        return false;
    });
}