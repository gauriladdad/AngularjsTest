localStorage.clear();

describe('Controllers ::', function() {
	beforeEach(module('todomvc'));
	var scope, todoCtrl, location;
    var todoStorageMock = {
		storage: [],
		get: function () {
			return this.storage;
		},
		put: function (value) {
			this.storage = value;
		}
    };
	
	beforeEach(inject(function ($controller, $rootScope, $location) {
		scope = $rootScope.$new();
		todoStorageMock.storage = [];
		location = $location;
		todoCtrl = $controller('TodoCtrl', {
			$scope: scope,
			todoStorage: todoStorageMock
		});
    }));
	
	
	describe('todoCtrl', function() {

		it('todoCtrl instance should be available', function() {
		  expect(todoCtrl).toBeDefined();
		});
		
		// addTodo
		it('todoCtrl should have an addToDo function', function() {
		  expect(todoCtrl.addTodo).toBeDefined();
		});
		
		it('should have an editTodo function', function() {
			expect(todoCtrl.editTodo).toBeDefined();
		});
		
		it('should have an doneEditing function', function() {
			expect(todoCtrl.doneEditing).toBeDefined();
		});
		
		it('should have an revertEditing function', function() {
			expect(todoCtrl.revertEditing).toBeDefined();
		});
		
		it('should have an removeTodo function', function() {
			expect(todoCtrl.removeTodo).toBeDefined();
		});
		
		it('should have a clearCompletedTodos function', function() {
			expect(todoCtrl.removeTodo).toBeDefined();
		});
		
		it('should have a markAll function', function() {
			expect(todoCtrl.markAll).toBeDefined();
		});
	});

	describe('adding todos', function() {
		afterEach(function() {
			todoStorageMock.storage = [];
		});

		it('addToDo blank title check should be performed', function() {
			todoCtrl.newTodo.title = '';
			todoCtrl.addTodo();
			expect(todoCtrl.todos.length).toBe(0);
		});
		
		it('addToDo should not create an item with spaces', function () {
			todoCtrl.newTodo.title = '   ';
			todoCtrl.addTodo();
			expect(todoCtrl.todos.length).toBe(0);
		});

		it('addToDo should remove all trailing and following spaces in todo title', function () {
			todoCtrl.newTodo.title = '  have probiotic  ';
			todoCtrl.addTodo();
			expect(todoCtrl.todos.length).toBe(1);
			expect(todoCtrl.todos[0].title).toBe('have probiotic');
		});
		
		it('addToDo should reset the newTodo object post creation of todo', function () {
			todoCtrl.newTodo.title = 'get milk';
			todoCtrl.addTodo();
			expect(todoCtrl.todos.length).toBe(1);
			expect(todoCtrl.newTodo.title).toBe('');
		});
    });
	
	describe('editing todos', function() {
		it('editedTodo object should be set with editTodo is invoked', function() {
			var todo = { title: "tests2", completed: false };
			todoCtrl.editTodo(todo);
			expect(todoCtrl.editedTodo).toBe(todo);
		});
	});

	describe('doneEditing todos', function() {
		var todo = { title: "editing this todo", completed: false };
		beforeEach(function() {
			todoCtrl.newTodo.title = "new todo";
			todoCtrl.addTodo();
			todoCtrl.editTodo(todo);
		}); 
		
		afterEach(function() {
			todoStorageMock.storage = [];
		});
		
		it('editedTodo should be set to empty object', function() {
			expect(todoCtrl.editedTodo).not.toEqual({});
			todoCtrl.doneEditing(todo);
			expect(todoCtrl.editedTodo).toEqual({});
		});

		it('doneEditing should remove all trailing and following spaces in todo title', function () {
			var todo = todoStorageMock.storage[0];
			todo.title = ' update timesheet  ';

			todoCtrl.doneEditing(todo);
			expect(todoCtrl.todos[0].title).toBe('update timesheet');
		});

		it('doneEditing blank title check should be performed', function() {
			todo.title = "";
			todoCtrl.doneEditing(todo);
			expect(todoStorageMock.storage.length).toBe(0);
		});

		it('doneEditing should update the item title right', function() {
			var todo = todoStorageMock.storage[0];
			todo.title = "check PR";
			todoCtrl.doneEditing(todo);
			expect(todoCtrl.todos[0].title).toBe('check PR');
		});
	});	
	
	describe('revertEditing todos', function() {
	
		var todo = { title: "editing this todo", completed: false };
		beforeEach(function() {
			todoCtrl.newTodo.title = "new todo";
			todoCtrl.addTodo();
			todoCtrl.editTodo(todo);
		}); 
		
		it('revertEditing should set with editTodo is editedTodo to empty object', function() {
			todoCtrl.revertEditing(0);
			expect(todoCtrl.editedTodo).toEqual({});
		});
		
		it('revertEditing should set Todo being edited to originalTodo object', function() {
			var original = todoCtrl.originalTodo;
			todoCtrl.revertEditing(0);
			expect(todoCtrl.todos[0]).toEqual(original);
		});
	});
	
	describe('removing a todo', function() {
		beforeEach(function() {
			todoCtrl.newTodo.title = "to do 1";
			todoCtrl.addTodo();
			todoCtrl.newTodo.title = "to do 2";
			todoCtrl.addTodo();
		});

		afterEach(function() {
			todoStorageMock.storage = [];
		});

		it('removeTodo should remove the item specified by index', function() {
			var todo = todoStorageMock.storage[1];
			todoCtrl.removeTodo(todo);
			expect(todoStorageMock.storage.length).toBe(1);
		});
    });
	
	describe('clearing completed Todos', function() {
		it('clearCompletedTodos should remove all completed todos', function() {
			todoCtrl.newTodo = {title : "to do 1", completed: false};
			todoCtrl.addTodo();
			todoCtrl.newTodo = {title : "to do 2", completed: true};
			todoCtrl.addTodo();
			todoCtrl.newTodo = {title : "to do 3", completed: true};
			todoCtrl.addTodo();
			
			expect(todoCtrl.todos.length).toBe(3);
			todoCtrl.clearCompletedTodos();
			expect(todoCtrl.todos.length).toBe(1);
		});
    });
	
	describe('markAll todos', function() {
		beforeEach(function() {
			todoCtrl.newTodo = {title : "to do 1"};
			todoCtrl.addTodo();
			todoCtrl.newTodo = {title : "to do 2"};
			todoCtrl.addTodo();
			todoCtrl.newTodo = {title : "to do 3"};
			todoCtrl.addTodo();
		});

		afterEach(function() {
			todoStorageMock.storage = [];
		});

		it('markAll should set all todos as completed', function() {
			todoCtrl.markAll(true);
			for(var i; i < todoStorageMock.storage.length; i++) {
			  expect(todoStorageMock.storage[i].completed).toBe(true);
			}
		});
		
		it('markAll should set all todos as not completed', function() {
			todoCtrl.markAll(false);

			for(var i; i < todoStorageMock.storage.length; i++) {
			  expect(todoStorageMock.storage[i].completed).toBe(false);
			}
		});
    });
	
});
