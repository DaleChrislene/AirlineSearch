var airlineSearch = angular.module('airlineSearch',[]);

angular.module('airlineSearch').controller('SearchController', function SearchController($scope, $http){ 
	//initialize variables
	$scope.formData = {};
	$scope.hasAirline = true;
	$scope.titleFrom = "";
	$scope.titleTo = "";
	$scope.init = false;

	searchApiUrl = 'https://pure-river-4101.herokuapp.com/';
	searchApiUrlLocal = 'http://localhost:3000/';

	$scope.searchAirlines = function(){

		$('body').addClass("loading");
		$scope.init = true;

		$http.post(searchApiUrl+'api/v1/search',$scope.formData)
		.success(function(data){

			$('body').removeClass("loading");

			//Setting data to list title
			$scope.titleFrom = capitalize($scope.formData.from);
			$scope.titleTo = capitalize($scope.formData.to);
			
			//clear form
			$scope.formData = {};
			
			airlineList = data['airlines'];
			console.log(airlineList);
			$scope.airlineList = setResultList(airlineList);
			console.log($scope.airlineList);
			//set variable to show/hide error message
			if($scope.airlineList.length === 0){
				$scope.hasAirline = false;
			}
			else{
				$scope.hasAirline = true;
			}
			
		})
		.error(function(data){
			$('body').removeClass("loading");
		})
	}

});

function setResultList(airlineList){

	resultList = [];

	//Case 1: Result set empty
	if(airlineList == null){
		return resultList;
	}

	if( airlineList['airline'].constructor  === Array){
		//Case 2: Result set contains 1 result
		resultList = airlineList['airline'];
	}
	else{
		//Case 2: Result set contains more than 1 result
		resultList.push(airlineList['airline']);
	}

	return resultList;
}
