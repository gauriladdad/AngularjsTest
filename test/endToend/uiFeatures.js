// Page objects
var TodoPage = function() {
    
    this.newTodoInput = element(by.id('new-todo'));
    this.footer = element(by.id('footer'));
    this.remainingCount = element(by.binding('remainingCount'));
  	this.clearCompletedButton = element(by.id('clear-completed'));
  	
    this.get = function() {
      browser.get('/');
    };
    this.setNewTodo = function(title) {
      this.newTodoInput.sendKeys(title);
    };
};

describe('todomvc', function() {
  browser.get('/');
  
    it("should load", function() {
    	 expect(browser.getTitle()).toBe('AngularJS • TodoMVC');
    });

    var todoPage = new TodoPage();

    describe('while loading the site', function() {

    	it('todos list should be empty', function() {
            element.all(by.repeater('todo in TC.todos')).count().then(function(count) {
                expect(count).toEqual(0);
            });
    	});

    	it('clear completed button should not be displayed', function() {
    	  	expect(todoPage.clearCompletedButton.isDisplayed()).toBeFalsy();
    	});
    });

    describe('Add ToDo', function() {
    	it('todo shold be successfully added to list', function() {
    	  	todoPage.setNewTodo('test');
    	  	todoPage.newTodoInput.sendKeys(protractor.Key.ENTER);
            //again get the list because it's now updated
            element.all(by.repeater('todo in TC.todos')).count().then(function(count) {
            expect(count).toEqual(1); });
        });
    });
});
