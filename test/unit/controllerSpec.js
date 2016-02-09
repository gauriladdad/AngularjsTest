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
   

   

    it('should be defined', function() {
      expect(todoCtrl).toBeDefined();
    });
    
	
    // addTodo
    it('should have an addTodo function', function() {
      expect(todoCtrl.addTodo).toBeDefined();
    });
  });

	describe('adding todos', function() {
      afterEach(function() {
        todoStorageMock.storage = [];
      });

      it('should not add blank todos', function() {
        todoCtrl.newTodo.title = '';
        todoCtrl.addTodo();
        expect(todoCtrl.todos.length).toBe(0);
      });
      });
});
