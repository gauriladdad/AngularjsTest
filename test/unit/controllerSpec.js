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
			var todo = { title: "test", completed: false };
			todoCtrl.editTodo(todo);
			expect(todoCtrl.editedTodo).toBe(todo);
		});
	});	
});
