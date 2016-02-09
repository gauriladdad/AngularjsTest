localStorage.clear();

describe('Directives ::', function() {
  beforeEach(module('todomvc'));

  describe('todoFocus', function() {
    var scope, compile, browser;

    beforeEach(inject(function ($rootScope, $compile, $browser) {
        scope = $rootScope.$new();
        compile = $compile;
        browser = $browser;
    }));

    it('should focus on truthy expression', function () {
        //directive is defined as todoFocus but used as todo-focus - thats how angular defines it
        var el = angular.element('<input todo-focus="focus">');
        scope.focus = false;

        compile(el)(scope);
        expect(browser.deferredFns.length).toBe(0);

        scope.$apply(function () {
          scope.focus = true;
        });

        expect(browser.deferredFns.length).toBe(1);
      });
   });
});