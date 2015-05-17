/**
 * Created by Shubham on 04-05-2015.
 */

var customer = angular.module('myApp.customer',['customerControllers', 'customerServices', 'ngRoute']);
customer.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/orders',{
            templateUrl : 'orders/orders.html',
            controller : 'ordersController'
        })
        .when('/profile', {
            templateUrl : 'profile/profile.html',
            controller : 'profileController'
        })
        .when('/store',{
            templateUrl : 'store/store.html',
            controller : 'storeController'
        })
        .otherwise({
            redirectTo : 'orders'
        });
}]);

