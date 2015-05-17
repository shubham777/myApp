/**
 * Create Shop Controller module
 */
'use strict'

var shopCtrl = angular.module('shopCtrl', ['shopServices']);

shopCtrl.controller('browseCtrl',['$scope', 'Products', function($scope, Products){
    $scope.name = "Shubham";
    $scope.orderCriteria = 'age';
    $scope.noOfVisibleProducts = 12;
    var data = Products.getAllProducts();
    $scope.products = data;
    $scope.defaultCategory = true;

    $scope.categoryGroup = [{name : 'Furniture', on: true},
        {name : 'Vehicles', on: true},
        {name : 'Apparels', on: true},
        {name : 'Adventure', on: true},
        {name :  'Electronics', on: true }
    ];

    $scope.localityGroup = [{name : 'Koramangala', on: true},
        {name : 'Indiranagar', on: true},
        {name : 'Ejipura', on: true},
        {name : 'Shivajinagar', on: true},
        {name :  'HSR Layout', on: true },
        {name :  'BTM Layout', on: true }
    ];

    $scope.priceRangeGroup = [{name : 'Below and 250', on: true},
        {name : '250 - 500', on: true},
        {name : '500 and Above', on: true}

    ];
    $scope.filterCategory = function(arr){

        for(var i in $scope.categoryGroup){
            var category = $scope.categoryGroup[i]
            if(category.on && arr.category == category.name){
                return true;
            }
        }
    };

    $scope.filterPriceRange = function(arr){
        debugger;
        for(var i in $scope.priceRangeGroup){
            var priceRange = $scope.priceRangeGroup[i]
            if(priceRange.on && arr.price > 0 && arr.price <= 250 && priceRange.name == 'Below and 250' ){
                return true;
            }
            if(priceRange.on && arr.price > 250 && arr.price < 500 && priceRange.name == '250 - 500' ) {
               return true;
            }
            if(priceRange.on && arr.price >= 500 &&  priceRange.name == '500 and Above' ) {
                return true;
            }


        }
    };


    $scope.filterLocality = function(arr){

        for(var i in $scope.localityGroup){
            var locality = $scope.localityGroup[i]
            if(locality.on && arr.locality == locality.name){
                return true;
            }
        }
    };

    $scope.categories = [
        {'name' : 'Furniture'},
        {'name' : 'Vehicles'},
        {'name' : 'Electronics'},
        {'name' : 'Apparels'},
        {'name' : 'Adventure'}
    ];
    $scope.allSubCategories = [{ 'Furniture' : ['Beds','Tables','Chairs', 'Sofas', 'Bean Bags']},
                               { 'Vehicles' : ['Bikes', 'Cars', 'Scooters']},
                               { 'Electronics' : ['AC & Coolers', 'Refigerators','TVs','Microwave']},
                               { 'Apparels' : ['Wedding Wear', 'Formal Wear', 'Costumes']},
                               { 'Adventure' : ['Camping', 'Trekking', 'Tents']}
                              ];
    $scope.subCategories = [];

    $scope.changeSubCategory = function(category){
        debugger;
        if(category === "Furniture"){
            $scope.subCategories = $scope.allSubCategories[0].Furniture;
        }
        else if(category === "Vehicles"){
            $scope.subCategories = $scope.allSubCategories[1].Vehicles;
        }
        else if(category === "Electronics"){
            $scope.subCategories = $scope.allSubCategories[2].Electronics;
        }
        else if(category === "Apparels"){
            $scope.subCategories = $scope.allSubCategories[3].Apparels;
        }
        else if(category === "Adventure"){
            $scope.subCategories = $scope.allSubCategories[4].Adventure;
        }
        else {}

    };


}]);
shopCtrl.controller('productCtrl',['$scope','$routeParams', function($scope, $routeParams){

    $scope.productId = $routeParams.productId;


}]);

shopCtrl.controller('loginCtrl', ['$scope', function($scope){

    Parse.initialize("2jT2a7YjlWSXRrhcNL8TSph4uy5g0Er5degdz9hL", "u4uGj6polu3Izo6jd4BOYeTsnQf9tvXLfpHKkZu2");

    $scope.signUp =  function(){

        debugger;
        var user = new Parse.User();
        user.set("username", $scope.emailSignUp);
        user.set("password",$scope.passwordSignUp);
        user.set("name",$scope.nameSignUp);
        user.set("mobile",$scope.mobileSignUp);
        user.set("email",$scope.emailSignUp);

        user.signUp(null, {
            success : function(user){
                alert("success");
               location.reload();

            },
            error : function(user, error){
                alert("Error: " +  error.message);
                //202username faraz@yahoo.com already taken
            }
        });
    };

   $scope.facebookSignUp = function(){


       Parse.FacebookUtils.logIn(null, {
           success: function(user) {
               if (!user.existed()) {
                   alert("User signed up and logged in through Facebook!");
               } else {
                   alert("User logged in through Facebook!");
               }
           },
           error: function(user, error) {
               alert("User cancelled the Facebook login or did not fully authorize.");
           }
       });
   };

    $scope.signIn = function(){
        debugger;

        if($scope.emailSignIn == 'admin@rentbingo.com' && $scope.passwordSignIn == 'admin123'){
            window.open('/app/admin');
            return;
        }


        Parse.User.logIn($scope.emailSignIn, $scope.passwordSignIn,{
           success : function(user) {

               $('#menu_item_MyAccount').show();
               $('#login').hide();
               $('#loginModal').modal('hide');

           } ,
            error : function(user, error){
                alert("Error: " + error.code + error.message);
            }
        });
    };

    $scope.resetPassword = function(){

        Parse.User.requestPasswordReset($scope.emailResetPassword, {
            success: function() {
                // Password reset request was sent successfully
                alert('success');
            },
            error: function(error) {
                // Show the error message somewhere
                alert("Error: " + error.code + " " + error.message);
            }
        });
    };

    $scope.logOut = function(){
        Parse.User.logOut();
        $('#menu_item_MyAccount').hide();
        $('#login').show();
    }

    $scope.currentUser = Parse.User.current();
    $scope.currentUserName = 'User';
    if($scope.currentUser) {
        $scope.currentUser = $scope.currentUser._serverData.name;
    }
}]);


