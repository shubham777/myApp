/**
 * Created by Shubham on 04-05-2015.
 */
'use strict'

var profileCounter = 0;

var customerControllers = angular.module('customerControllers',['customerServices']);

customerControllers.controller('ordersController', ['$scope', function($scope){}]);
customerControllers.controller('storeController', ['$scope', function($scope){}]);
customerControllers.controller('profileController', ['$scope', function($scope){

    $scope.user = {

    };

    $scope.setLocalStorage = function(){ debugger;
        localStorage.setItem('name', $scope.user.name);
        localStorage.setItem('email', $scope.user.email);
        localStorage.setItem('phone1', $scope.user.phone1);
        localStorage.setItem('country', $scope.user.country);

        if($scope.customerAccountExisting) {
            if(typeof $scope.user.phone2 != 'undefined')
                localStorage.setItem('phone2', $scope.user.phone2);
            localStorage.setItem('address', $scope.user.address);
            localStorage.setItem('city', $scope.user.city);
            localStorage.setItem('pincode', $scope.user.pincode);
            localStorage.setItem('country', $scope.user.country);
            localStorage.setItem('state', $scope.user.state.name);
            localStorage.setItem('imageUrl', $scope.user.imageUrl);
            localStorage.setItem('customerAccountExisting', true);
        }
        else
        {
            localStorage.setItem('customerAccountExisting', false);
        }
    };



    $scope.getLocalStorage = function(){
        debugger;
        $scope.user.name =  localStorage.getItem('name');
        $scope.user.email = localStorage.getItem('email');
        $scope.user.phone1 = localStorage.getItem('phone1');
        $scope.user.country = localStorage.getItem('country');

        if(localStorage.getItem('customerAccountExisting')) {
            $scope.user.phone2 =  localStorage.getItem('phone2');
            $scope.user.address = localStorage.getItem('address');
            $scope.user.city = localStorage.getItem('city');
            $scope.user.pincode = localStorage.getItem('pincode');
            $scope.user.state = $scope.states.filter(function(el){
                return el.name == localStorage.getItem('state');
            })[0];
            if(localStorage.getItem('imageUrl') != 'undefined')
            $('#profileImage').attr('src', localStorage.getItem('imageUrl'));
        }

    };



    $scope.clearLocalStorage = function(){
        localStorage.clear();
    };
    var currentUser = Parse.User.current();
    $scope.customerAccountExisting = false;
    $scope.states = [{name : '--Please Select Your State--'},{name : 'Andaman'},{name : 'Karnataka'},{name :'Uttar Pradesh'}];

    debugger;

    if(typeof localStorage.name != 'undefined' && typeof localStorage.city != 'undefined'){
        $scope.getLocalStorage();
    }
    else {
        alert('City not set');


        if (currentUser == null) {
            alert('No User');
        }
        else {
                if(window.location.hash == "#/profile"){
                    var Customer = Parse.Object.extend('Customer');
                    var query = new Parse.Query(Customer);
                    query.equalTo("email", currentUser._serverData.username);
                    query.find({
                        success: function (results) {
                            alert('get customer query');
                            $scope.customer = results[0];
                            if (typeof $scope.customer === 'undefined') {
                                $scope.customerAccountExisting = false;

                            }
                            else {
                                $scope.customerAccountExisting = true;

                            }

                            $('#updateForm').click();
                        },
                        error: function (error) {
                            alert("Error: " + error.code + " " + error.message);
                        }
                    });

                }
        }
    }

    $scope.checkCustomerAccountExisting  = function(){

    };

    $scope.populateForm  = function(){debugger;
        $scope.user.name = currentUser._serverData.name;
        $scope.user.email = currentUser._serverData.username;
        $scope.user.phone1 = currentUser._serverData.mobile;
        $scope.user.country = 'India';
        $scope.user.state = $scope.states[0];

    };

    $scope.getCustomerDetails = function(){debugger;
        $scope.user.name = $scope.customer.get('name');
        $scope.user.email = $scope.customer.get('email');
        $scope.user.phone1 = $scope.customer.get('phone_1');
        $scope.user.phone2 = $scope.customer.get('phone_2');
        $scope.user.address = $scope.customer.get('address');
        $scope.user.city = $scope.customer.get('city');
        $scope.user.pincode = $scope.customer.get('pincode');
        $scope.user.country = 'India';
        $scope.user.state = $scope.states.filter(function(el){
            return el.name == $scope.customer.get('state')
        })[0];
        $scope.user.imageUrl = $scope.customer.get('imageUrl');
         if($scope.user.imageUrl)
            $('#profileImage').attr('src', $scope.user.imageUrl);



    };

    $scope.updateForm = function(){debugger;
        if($scope.customerAccountExisting){
           $scope.getCustomerDetails();
        }
        else{
            $scope.populateForm();
        }
        $scope.setLocalStorage();
    };

    /*
    debugger;
      if($scope.customerAccountExisting){
          $scope.getCustomerDetails();
      }
    else{
          $scope.populateForm();
      }
    */

    $scope.uploadProfilePhoto = function(){
            debugger;
      alert('hi');

    };


/*
    var query = new Parse.Query(Parse.User);
        query.equalTo("username", currentUser._serverData.username);
        query.find({
           success :  function(results){
              // var object = results[0];
              // alert(object.id + ' - ' + object.get('name'));

           },
            error : function(error){
                alert("Error: " + error.code + " " + error.message);
            }
        });
*/
    $scope.validateUpdation = function(){
            debugger;
        if(typeof $scope.user.name === 'undefined' || $scope.user.name == ''){
            return true;
        }
        else if($scope.user.email == '' || typeof $scope.user.email === 'undefined'){
            return true;
        }
        else if($scope.user.phone1 == '' || typeof $scope.user.phone1 === 'undefined'){
            return true;
        }
        else if($scope.user.address == '' || typeof $scope.user.address === 'undefined'){
            return true;
        }
        else if(typeof $scope.user.state != 'undefined' ) {
           if($scope.user.state.name === '--Please Select Your State--' || $scope.user.state.name == '')
            return true;
        }
        else if($scope.user.city == '' || typeof $scope.user.city === 'undefined'){
            return true;
        }
        else if($scope.user.pincode == '' || typeof $scope.user.pincode === 'undefined'){
            return true;
        }
        else{
            return false;
        }


    };


    $scope.updateProfile = function(){

      var Customer = Parse.Object.extend('Customer');
        var customer = new Customer();

        customer.save({
            name : $scope.user.name,
            email : $scope.user.email,
            phone_1 : $scope.user.phone1,
            phone_2 : $scope.user.phone2,
            address : $scope.user.address,
            state : $scope.user.state.name,
            city : $scope.user.city,
            pincode : $scope.user.pincode

        },{
            success : function(customer){
              alert("success " + customer.id);
               // $scope.customerAccountExisting = true;
                $('#thankYouModal').modal();
            },
            error : function(customer, error){
                alert(error.code + "" + error.message);
            }
        });

    };

}]);
customerControllers.controller('navbarController', ['$scope', function($scope){
    $scope.logOut = function(){

        Parse.User.logOut();
        $scope.clearLocalStorage();
        window.location.replace('/app/customer')

    }

    $scope.clearLocalStorage = function(){
        localStorage.clear();
    };
}]);
customerControllers.controller('loginCtrl', ['$scope', function($scope){



    $scope.signUp =  function(){


        var user = new Parse.User();
        user.set("username", $scope.emailSignUp);
        user.set("password",$scope.passwordSignUp);
        user.set("name",$scope.nameSignUp);
        user.set("mobile",$scope.mobileSignUp);
        user.set("email",$scope.emailSignUp);
        user.set("emailVerified", false);

        user.signUp(null, {
            success : function(user){
                alert("success");
            },
            error : function(user, error){
                alert("Error: " + error.code + error.message);
            }
        });
    };

    $scope.signIn = function(){
        debugger;
        Parse.User.logIn($scope.emailSignIn, $scope.passwordSignIn,{
            success : function(user) {
                alert("success");
                $scope.user = user._serverData;
                $scope.setLocalStorage();
                window.location.replace('/app/customer');
            } ,
            error : function(user, error){
                alert("Error: " + error.code + error.message);
            }
        });

        $scope.setLocalStorage = function(){
            localStorage.setItem('name', $scope.user.name);
            localStorage.setItem('email', $scope.user.email);
            localStorage.setItem('phone1', $scope.user.mobile);
            localStorage.setItem('country', 'India');

        };
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
}]);