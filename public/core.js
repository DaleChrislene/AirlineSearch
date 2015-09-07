var airlineSearch = angular.module('airlineSearch',[]);

function SearchController($scope, $http){
	$scope.formData = {};
	$scope.hasAirline = "true";
	$scope.titleFrom = "";
	$scope.titleTo = "";
	$scope.init = false;

	searchApiUrl = 'https://pure-river-4101.herokuapp.com/';

	$scope.searchAirlines = function(){
		$http.post(searchApiUrl+'api/v1/search',$scope.formData)
		.success(function(data){
			$scope.titleFrom = capitalize($scope.formData.from);
			$scope.titleTo = capitalize($scope.formData.to);
			$scope.formData = {};
			$scope.init = true;

			airlineList = data['airlines'];
			if(airlineList == null){
				$scope.hasAirline = "false";
				$scope.airlineList = [];
			}
			else{
				$scope.hasAirline = "true";
				$scope.airlineList = airlineList['airline'];
			}
		})
		.error(function(data){
			console.log('Error: ' + data);
		})
	}
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}