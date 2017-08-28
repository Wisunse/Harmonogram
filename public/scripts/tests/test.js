// Testy jednostkowe powinny sprawdzać:
// * Czy moduł został poprawnie utworzony
// * Czy moduł posiada wszystkie zdefiniowane zależności

describe('Module "app"', function() {
    var module;
    var moduleDependencies;
    beforeEach(function() {
        module = angular.module('Warehouse');
        moduleDependencies = module.requires;
    });
    it('should be registered', function() {
        expect(module).toBeDefined();
    });
    it('should have "ui.router" as a dependency', function() {
        expect(moduleDependencies).toContain('ui.router');
    });
    it('should have "ngSanitize" as a dependency', function() {
        expect(moduleDependencies).toContain('ngSanitize');
    });
    it('should have "ui.bootstrap" as a dependency', function() {
        expect(moduleDependencies).toContain('ui.bootstrap');
    });
    it('should have "angularModalService" as a dependency', function() {
        expect(moduleDependencies).toContain('angularModalService');
    });
});

// Testy jednostkowe kontrolera powinny obejmować sprawdzenie:
// * Czy kontroler został utworzony
// * Czy kontroler (lub obiekt $scope) posiada właściwości i metody przypisane w trakcie jego tworzenia
// * Czy metody kontrolera działają poprawnie

describe('data in history modal', function() {

    beforeEach(module('Warehouse'));
    beforeEach(module(function ($provide) {
        $provide.value('products', {
            item:
                {id: 1, id_product: 2, spend: 20, id_target: 30, beneficiary_id: 2, info: ' ', new_count: 22}
        });
    }));
    beforeEach(inject(function($controller, $rootScope) {
        $scope = $rootScope.$new();
        ctrl = $controller('HistoryModalController', {
            $scope: $scope
        });
    }));
    it('Can get an instance of my factory', inject(function(products) {
        expect(products).toBeDefined();
    }));
    it('should check data in history modal', function() {
        expect($scope.getData({id: 1, id_product: 2, spend: 22, id_target: 30, beneficiary_id: 2, info: ' ', new_count: 22}, 22, 20)).toEqual({id: 1, product_id: 2, spend: 22, target_id: 30, beneficiary_id: 2, info: ' ', new_count: 20, old_count: 22, count: 2});
    });

});


// describe('TargetControllers', function() {
//
//     beforeEach(module('Warehouse'));
//     describe('TargetController', function(){
//         beforeEach(function() {
//             module('Warehouse'); //
//         });
//         it('Test kontrolera pierwszego', inject(function($controller) {
//             var scope = {},
//                 ctrl = $controller('TargetController', { $scope: scope });
//
//             expect(scope.testJasmine).toBe(true);
//         }));
//     });
//
// });
