app.controller('beerController2', function($scope, $stateParams, beerService) {
	$scope.beer = $stateParams.beerParam;

	$scope.addToMyReviews= function(){
		var reviews = {
			name: $scope.name,
			text: $scope.text
		};
		beerService.addToMyReviews(reviews, $scope.beer._id).then(function(response){
		$scope.beer = response.data; // response.data is the beer as of now
		

		});;

	}	

	  if (!$stateParams.beerParam) {
    beerService.getBeer($stateParams.id)
      .then(function(beer) {
        $scope.beer = beer;
      })
  } else {
    $scope.beer = $stateParams.beerParam;
  }
});