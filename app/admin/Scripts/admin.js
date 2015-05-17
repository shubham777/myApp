/**
 * Created by Shubham on 11-05-2015.
 */
'use strict'

var admin = angular.module('myApp.admin',['adminControllers', 'adminServices', 'ngRoute']);
admin.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/product',{
            templateUrl : 'product/product.html',
            controller : 'productController'
        })
        .when('/category', {
            templateUrl : 'category/category.html',
            controller : 'categoryController'
        })
        .otherwise({
            redirectTo : 'product'
        });
}]);
