fdescribe('books-crud', function () {
    beforeEach(function () {
        browser.get('/');
    });

    it('should have <books-crud>', function () {
        var crud = element(by.tagName('books-crud'));
        expect(crud.isPresent()).toEqual(true);
    });

    it('should have title', function () {
        var crud = element(by.tagName('books-crud'));
        expect(crud.isPresent()).toEqual(true);
        var title = crud.element(by.tagName("h2"));
        expect(title.getText()).toEqual("Books List");
    });

    it('should add a book', function () {
        var crud = element(by.tagName('books-crud'));
        expect(crud.isPresent()).toEqual(true);

        element(by.id('addBook')).click().then(function () {
            expect(eventual(protractor.ExpectedConditions.presenceOf(element(by.tagName('form'))))).toBe(true);

            var title = crud.element(by.id("title"));
            title.sendKeys('E2E Title');

            var author = crud.element(by.id("author"));
            author.sendKeys('E2E Author');

            var year_published = crud.element(by.id("year_published"));
            year_published.sendKeys('2014');

            var rating = crud.element(by.id("rating"));
            rating.sendKeys('4.2');

            var price = crud.element(by.id("price"));
            price.sendKeys('25');

            element(by.id('submit')).click().then(function () {
                expect(element(by.tagName('form')).isPresent()).toEqual(false);
            });
        });

        browser.waitForAngular();
    });

    it('should show error message if some input data (year input) is wrong', function () {
        var crud = element(by.tagName('books-crud'));
        expect(crud.isPresent()).toEqual(true);

        element(by.id('addBook')).click().then(function () {
            expect(eventual(protractor.ExpectedConditions.presenceOf(element(by.tagName('form'))))).toBe(true);

            var title = crud.element(by.id("title"));
            title.sendKeys('E2E Title');

            var author = crud.element(by.id("author"));
            author.sendKeys('E2E Author');

            var year_published = crud.element(by.id("year_published"));
            year_published.sendKeys('2014f');

            var rating = crud.element(by.id("rating"));
            rating.sendKeys('4.2');

            var price = crud.element(by.id("price"));
            price.sendKeys('25');

            element(by.id('submit')).click().then(function () {
                var message = element(by.id("mustBeAYear"));
                expect(message.isPresent()).toBe(true);
            });    

        });

        browser.waitForAngular();
    });
});

function eventual(expectedCondition) {
    return browser.wait(expectedCondition).then(function () {
        return true;
    }, function (err) {
        return false;
    });
}