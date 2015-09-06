var airlineSearch = angular.module('airlineSearch',[]);

function searchController($scope, $http){
	$scope.formData = {};

	$scope.searchAirlines = function(){
		$http.post('http://jsonplaceholder.typicode.com/posts',$scope.formData)
		.success(function(data){
			$scope.formData = {};

			// FOR TESTING
			data={"airlines": [ "Singapore Airlines", "Malaysian Airlines", "Cathay Pacific", "China Air" ]}

			$scope.airlineList = data['airlines'];
			console.log($scope.airlineList);
		})
		.error(function(data){
			console.log('Error: ' + data);
		})
	}
}