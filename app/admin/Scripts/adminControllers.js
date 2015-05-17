

/**
 * Created by Shubham on 11-05-2015.
 */

'use strict'
var adminControllers = angular.module('adminControllers', ['adminServices']);
adminControllers.controller('navbarController', ['$scope', function(){

}]);
adminControllers.controller('productController', ['$scope', function($scope){

   $scope.product={};
   $scope.ratings = [{name: '--Please select rating--'}, {name: 0},{name: 1}, {name: 2}, {name: 3},{name: 4},{name: 5}];
    $scope.statuses = [{name : 'Active', id : 1},{ name : 'Inactive', id : 0}];
    $scope.product.status = $scope.statuses[0];
    $scope.product.rating = $scope.ratings[0];
    $scope.categories = [{name : '-Category-', id : -1},{name : 'Furniture', id : 1}, {name  : 'Vehicles', id : 2}, {name  : 'Apparels', id : 3}];
    $scope.product.category = $scope.categories[0];
    $scope.durations = [{name : '-Duration-', id : -1},{name : 'Daily', id : 1},{name : 'Monthly', id : 2},{name : '2-Months', id : 3}];
    $scope.product.duration = $scope.durations[0];
    var subCats = {};
    subCats['Furniture'] = [{name : 'Beds', id : 11},{name : 'Tables', id : 12},{name : 'Chairs', id : 13}, {name : 'Sofas', id : 14},{name : 'Wardrobes', id : 15}];
    subCats['Vehicles'] = [{name : 'Cars', id : 21},{name : 'Bikes', id : 22},{name : 'Bicycles', id : 23}, {name : 'Scooters', id : 24}];
    subCats['Apparels'] = [{name : 'Formal Wear', id : 31},{name : 'Sherwani', id : 32},{name : 'Costumes', id : 33}];
    $scope.subCategories = subCats[$scope.product.category.name];


    $scope.change = function() {
        $scope.subCategories = subCats[$scope.product.category.name];
    };


    $scope.addProduct = function(){

        var Product = Parse.Object.extend('Product');
        var product = new Product();
        product.set("code" , $scope.product.code);
        product.set("name", $scope.product.name);
        product.set("rent", $scope.product.rentalPrice);
        product.set("duration", $scope.product.duration.id);
        product.set("security_deposit", $scope.product.securityDeposit);
        product.set("description", $scope.product.description);
        product.set("category_id", $scope.product.category.id);
        product.set("subcategory_id", $scope.product.subCategory.id);
        product.set("cost_price", $scope.product.costPrice);
        product.set("vendor_id", $scope.product.vendorId);
        product.set("image_name",$scope.product.imageName);
        product.set("rating", $scope.product.rating.name);
        product.set("status", $scope.product.status.id);
        product.set("image_name", $scope.product.imageName);





    };

    $('#profilePic').change(function(){
       $scope.product.imageName = $(this).val().split(/(\\|\/)/g).pop();
        alert($scope.product.imageName);
    });

}]);
adminControllers.controller('categoryController', ['$scope', function($scope){

    $scope.category = {};

    $scope.statuses = [{name : 'Active', id : 1},{ name : 'Inactive', id : 0}];
    $scope.categories = [{name : '--Please Select Parent Category--', id : -1},{name : 'None', id : 0},{name : 'Furniture', id : 1},{name : 'Electronics', id : 2}, {name : 'Apparels', id :3}, {name : 'Vehicles', id : 4},
                         { name : 'Adventure Gear', id : 5}];
    $scope.category.parent = $scope.categories[0];
    $scope.category.status = $scope.statuses[0];

    $scope.addCategory = function(){

        var Category = Parse.Object.extend('Category');
        var category = new Category();
        category.save({
            category_id : parseInt($scope.category.id),
            name : $scope.category.name,
            parent_id : parseInt($scope.category.parent.id),
            description : $scope.category.description,
            status : parseInt($scope.category.status.id)
        },{
            success :  function(category){
                alert("Category Created " + category.id);
            },
            error : function(category, error){
                alert('Failed to create Category!! ' + error.id + "" + error.message);
            }
        });


    };


}]);