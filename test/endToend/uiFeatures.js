// Page objects
var TodoPage = function() {
    
    this.newTodoInput = element(by.id('new-todo'));
    this.footer = element(by.id('footer'));
    this.remainingCount = element(by.id('todo-count'));
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

		it('footer should not be displayed', function() {
			expect(todoPage.footer.isDisplayed()).toBeFalsy();
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
		
		it('footer should be displayed', function() {
			expect(todoPage.footer.isDisplayed()).toBeTruthy();
		});
    });

    describe('Remaining todo count', function() {
        it('upon adding todos remaining count should equal to number of items', function() {
            todoPage.setNewTodo('test 1');
            todoPage.newTodoInput.sendKeys(protractor.Key.ENTER);
            todoPage.setNewTodo('test 2');
            todoPage.newTodoInput.sendKeys(protractor.Key.ENTER);
            
            expect(todoPage.remainingCount.getText()).toEqual('3 items left');
        });
    });
	
	describe('verify in place editing', function() {
		it('edit item through double click', function() {
			element.all(by.repeater('todo in TC.todos')).then(function(posts) {
				var label = posts[0].element(by.tagName('label'));
				browser.actions().doubleClick(label).perform();
				var input = posts[0].element(by.css('.edit'));
				input.sendKeys(" edit");
				input.sendKeys(protractor.Key.ENTER);
				expect(label.getText()).toEqual('test edit');
			});
		});
	});
	
	describe('Mark todos as completed/incomplete', function() {
  		
		it('all todos should be incomplete', function() {
			element.all(by.repeater('todo in TC.todos')).each(function(todo, index) {
				var activePost = todo.element(by.model('todo.completed'));
				expect(activePost.isSelected()).toBeFalsy();
			});
		});
		
		it('mark first todo as complete', function() {
			element.all(by.repeater('todo in TC.todos')).then(function(posts) {
                var activePost = posts[0].element(by.model('todo.completed'));
				activePost.click();
                expect(activePost.isSelected()).toBeTruthy();
				
				expect(todoPage.remainingCount.getText()).toEqual('2 items left');
            });
		});
    });
	
	//at this point there are 3 todos and 1 has been marked as completed
	describe('Active items link test', function() {
        it('Active items list should change URL and list items to 2', function() {
			element.all(by.tagName('a')).filter(function(elem, index) {
				return elem.getAttribute('href').then(function(text) {
					return text === 'http://localhost:9000/#/active';
				});
			}).click();
			
			expect(browser.getCurrentUrl()).toEqual('http://localhost:9000/#/active');
				
			element.all(by.repeater('todo in TC.todos')).count().then(function(count) {
				expect(count).toEqual(2); 
			});
		});
	});
	
	//at this point there are 3 todos and 1 has been marked as completed
	describe('Completed items link test', function() {
        it('Completed items list should change URL and list items to 1', function() {
			element.all(by.tagName('a')).filter(function(elem, index) {
				return elem.getAttribute('href').then(function(text) {
					return text === 'http://localhost:9000/#/completed';
				});
			}).click();
			
			expect(browser.getCurrentUrl()).toEqual('http://localhost:9000/#/completed');
				
			element.all(by.repeater('todo in TC.todos')).count().then(function(count) {
				expect(count).toEqual(1); 
			});
		});
	});
	
	describe('Clear completed button working', function() {
        it('Clear completed button visible after a complete item', function() {
		
			//reset the UI on original page
			element.all(by.tagName('a')).filter(function(elem, index) {
				return elem.getAttribute('href').then(function(text) {
					return text === 'http://localhost:9000/#/';
				});
			}).click();
			
            expect(todoPage.clearCompletedButton.isDisplayed()).toBeTruthy();
        });
        
        it('Clear completed button should be hidden after click', function() {
            todoPage.clearCompletedButton.click();
            expect(todoPage.clearCompletedButton.isDisplayed()).toBeFalsy();
        });
    });

	
});
