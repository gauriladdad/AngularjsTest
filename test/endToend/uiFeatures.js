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
  
    it("Verify title on launching the app", function() {
    	 expect(browser.getTitle()).toBe('AngularJS • TodoMVC');
    });

    var todoPage = new TodoPage();

    describe('Check default screen elements', function() {
		it('Todos list should be empty', function() {
            element.all(by.repeater('todo in TC.todos')).count().then(function(count) {
                expect(count).toEqual(0);
            });
    	});

		it('Footer should not be displayed', function() {
			expect(todoPage.footer.isDisplayed()).toBeFalsy();
		});
	
    	it('Clear completed button should not be displayed', function() {
    	  	expect(todoPage.clearCompletedButton.isDisplayed()).toBeFalsy();
    	});
    });

    describe('Verify Add ToDo', function() {
    	it('Todo should be successfully added to list', function() {
    	  	todoPage.setNewTodo('test');
    	  	todoPage.newTodoInput.sendKeys(protractor.Key.ENTER);
            //again get the list because it's now updated
            element.all(by.repeater('todo in TC.todos')).count().then(function(count) {
            expect(count).toEqual(1); });
        });
		
		it('Footer should be displayed after adding a to do', function() {
			expect(todoPage.footer.isDisplayed()).toBeTruthy();
		});
    });

    describe('Verify remaining todo count display', function() {
        it('Upon adding todos remaining count should equal number of todos created', function() {
            todoPage.setNewTodo('test 1');
            todoPage.newTodoInput.sendKeys(protractor.Key.ENTER);
            todoPage.setNewTodo('test 2');
            todoPage.newTodoInput.sendKeys(protractor.Key.ENTER);
            
            expect(todoPage.remainingCount.getText()).toEqual('3 items left');
        });
    });
	
	describe('Verify in place editing', function() {
		it('Double click on a Todo should show editable text, it should save the change successfully', function() {
			element.all(by.repeater('todo in TC.todos')).then(function(todos) {
				var label = todos[0].element(by.tagName('label'));
				browser.actions().doubleClick(label).perform();
				var input = todos[0].element(by.css('.edit'));
				input.sendKeys(" edit");
				input.sendKeys(protractor.Key.ENTER);
				expect(label.getText()).toEqual('test edit');
			});
		});
	});
	
	describe('Verify marking Todos as completed/incomplete', function() {
  		
		it('All todos should be incomplete after creation', function() {
			element.all(by.repeater('todo in TC.todos')).each(function(todo, index) {
				var activeTodo = todo.element(by.model('todo.completed'));
				expect(activeTodo.isSelected()).toBeFalsy();
			});
		});
		
		it('Clicking on checkbox of first Todo should mark it as complete', function() {
			element.all(by.repeater('todo in TC.todos')).then(function(todos) {
                var activePost = todos[0].element(by.model('todo.completed'));
				activePost.click();
                expect(activePost.isSelected()).toBeTruthy();
				
				expect(todoPage.remainingCount.getText()).toEqual('2 items left');
            });
		});
		
		it('Click and unclick of checkbox for a Todo should leave the Todo as incomplete', function() {
			element.all(by.repeater('todo in TC.todos')).then(function(todos) {
                var activePost = todos[1].element(by.model('todo.completed'));
				activePost.click();
                expect(activePost.isSelected()).toBeTruthy();
				
				activePost.click();
                expect(activePost.isSelected()).toBeFalsy();
				//just to observer the behaviour while running
				browser.sleep(1000);
			});
		});
    });
	
	//at this point there are 3 todos and 1 has been marked as completed
	describe('Verify active link', function() {
        it('Clicking on active list should change URL and update list items to 2', function() {
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
	describe('Verify completed link', function() {
        it('Clicking on completed link should change URL and update list items to 1', function() {
			element.all(by.tagName('a')).filter(function(elem, index) {
				return elem.getAttribute('href').then(function(text) {
					return text === 'http://localhost:9000/#/completed';
				});
			}).click();
			
			expect(browser.getCurrentUrl()).toEqual('http://localhost:9000/#/completed');
				
			element.all(by.repeater( 'todo in TC.todos')).count().then(function(count) {
				expect(count).toEqual(1); 
			});
			
			//reset the UI on original page
			element.all(by.tagName('a')).filter(function(elem, index) {
				return elem.getAttribute('href').then(function(text) {
					return text === 'http://localhost:9000/#/';
				});
			}).click();
		});
	});
	
	describe('Verify clear completed button behaviour', function() {
        it('Clear completed button should be visible as we have a completed todo', function() {
            expect(todoPage.clearCompletedButton.isDisplayed()).toBeTruthy();
        });
        
		//upon click of clear completed button, it should be hidden as there are no more complete todos
        it('Clear completed button should be hidden once clicked, number of items in the list should be updated', function() {
            todoPage.clearCompletedButton.click();
			
			element.all(by.repeater('todo in TC.todos')).count().then(function(count) {
				expect(count).toEqual(2); 
			});
			
            expect(todoPage.clearCompletedButton.isDisplayed()).toBeFalsy();
        });
    });
	/* This test doesn't run consistently. Even adding sleep (amongst other solutions) between actions results in same.
	describe('verify delete todo', function() {
        it('delete all todos', function() {
			element.all(by.repeater('todo in TC.todos')).then(function(todos) {
				browser.actions().mouseMove(todos[0]).perform().then(function(){
					var deleteTodoButton = todos[0].element(by.tagName('button'));
					//browser.wait(waitForCssValue(obj, 'color', color2), 5000);
					browser.actions().click(deleteTodoButton).perform().then(function() {
						element.all(by.repeater('todo in TC.todos')).count().then(function(count) {
							expect(count).toEqual(1); 
						}); 						
					});
				}) 
			});
		});
    });	*/
});
/* tests covered in below sequence 
launch application- 
- to do list should be empty
- footer should not be displayed
- clear completed button should not be displayed

add to do -
- add a single to do and verify total number of items shown in the list
- footer should be displayed at this point

remaining todo count - 
add 2 more todos and verify remaining text is coming up right as - 3 items left

verify edit item (by double clicking the first item in todo list)
- double click the label, which will display the input component - add edit to it's text - verify text is "test edit"

marking item as complete/incomplete
1. by default all todos created should be incomplete
2. now mark first todo in the list as complete - 
- at this point remaining item count should be updated
3. mark 2nd to do in the list as complete - check the status of checkbox
now mark the same to do as incomplete - check the status of checkbox 

click on link to view "Active" items
- find the active todos link and click on it
- the total number of todos in list should be 2

click on link to view "Completed" items
- find the completed todos link and click on it
- the total number of todos in list should be 1
- click on All items link

verify clear all completed button
- now that we have todos created clear completed button should be visible
- click on clear completed button - total items reamining in list should be 2 and clear completed button not
visible any more

verify delete to do 
- take the first to do in the list 
- hover on the list to make delete button visible
- click on delete button 
This test however is not running currently as it doesn't run consistently
*/


