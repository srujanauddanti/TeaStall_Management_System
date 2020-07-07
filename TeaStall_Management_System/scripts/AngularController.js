var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
    debugger;
    $scope.InsertData = function () {
        var Action = document.getElementById("btnSave").getAttribute("value");
        if (Action == "Submit") {
            $scope.Inventory= {};
            $scope.Inventory.TeaName = $scope.itemName;
            $scope.Inventory.Description = $scope.itemdescription;
            $scope.Inventory.Price = $scope.itemprice;
            $http({
                method: "post",
                url: "/Inventory/Insert_Inventory",
                datatype: "json",
                data: JSON.stringify($scope.Inventory)
            }).then(function (response) {
                console.log(response.data);
                $scope.GetAllData();
                $scope.itemName = "";
                $scope.itemdescription = "";
                $scope.itemprice="";
            })
        } else {
            $scope.Inventory = {};
            $scope.Inventory.TeaName = $scope.itemName;
            $scope.Inventory.Description = $scope.itemdescription;
            $scope.Inventory.Price = $scope.itemprice;
            $scope.Inventory.Sr_no = document.getElementById("item_").value;
            $http({
                method: "post",
                url: "/Inventory/Update_Inventory",
                datatype: "json",
                data: JSON.stringify($scope.Inventory)
            }).then(function (response) {
                console.log(response.data);
                $scope.GetAllData();
                $scope.itemName = "";
                $scope.itemdescription = "";
                $scope.itemprice = "";
                document.getElementById("btnSave").setAttribute("value", "Submit");
                document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                document.getElementById("spn").innerHTML = "Add New Item";
            })
        }
    }
    $scope.GetAllData = function () {
        $http({
            method: "get",
            url: "/Inventory/Get_AllInventory"
        }).then(function (response) {
            $scope.TeaInventories = response.data;
        }, function () {
            alert("Error Occurred");
        })
    };
    $scope.Deleteitem = function (item) {
        $http({
            method: "post",
            url: "/Inventory/Delete_Inventory",
            datatype: "json",
            data: JSON.stringify(item)
        }).then(function (response) {
            console.log(response.data);
            $scope.GetAllData();
        })
    };
    $scope.Updateitem = function (item) {
        document.getElementById("item_").value = item.Sr_no;
        $scope.itemName = item.TeaName;
        $scope.itemdescription = item.Description;
        $scope.itemprice = item.Price;
        document.getElementById("btnSave").setAttribute("value", "Update");
        document.getElementById("btnSave").style.backgroundColor = "Black";
        document.getElementById("spn").innerHTML = "Update Item Information";
    };
    //myApp.config(['$routeProvider',
    //    function ($routeProvider) {
    //        $routeProvider.
    //            when("/Inventory/Index", {
    //                templateUrl: "Inventory/Index"
    //            })
    //                .when('/Inventory/Get_InventoryById/:id', {
    //                    templateUrl: "Inventory/Get_InventoryById",
    //                    controller: "ItemsDetails"
    //                })
    //        otherwise({
    //            redirectTo: '/Inventory/Index'
    //        });
    //    }])
    //.controller("ItemsDetails", function ($scope, $http, $routeParams) {
    //    $http({
    //        url: "Inventory/Get_InventoryById",
    //        params: { id: $routeParams.id },
    //        method:"get"
    //    }).
    //    then(function (response) {
    //        $scope.TeaInventory = response.data;
    //    })

    //});
    //Redirect to Detail view from index view with parameter

    //$scope.GetItemByID() = function (id) {

    //    $http({
    //        url: "Inventory/Get_InventoryById",
    //        method: "get",
    //        datatype: "json",
    //        data: JSON.stringify($scope.Inventory)
    //    }).then(function (response) {
    //        $scope.TeaInventory = response.data;
    //    }, function () {
    //        alert("Error Occurred");
    //    })
    //};
  
    
    //$scope.GetItemByID().success(function (id) {
    //    document.getElementById("item_").value = item.Sr_no;
    //    $scope.itemName = item.TeaName;
    //    $scope.itemdescription = item.Description;
    //    $scope.itemprice = item.Price;
    //    $http({
    //        method: "get",
    //        url: "/Inventory/Get_AllInventory"
    //    }).then(function (response) {
    //        $scope.TeaInventories = response.data;
    //    }, function () {
    //        alert("Error Occurred");
    //    })
        
    //});
})


