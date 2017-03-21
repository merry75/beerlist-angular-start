app.controller('beerController', function($scope,beerService) {

	$scope.allBeers = beerService.allBeers;

	$scope.addToMyCollection = function(){
		var beer = {name: $scope.name,
			style: $scope.style,
			abv: $scope.abv,
			image_url: $scope.img,
			rating: $scope.rating
		};

		beerService.addToMyCollection(beer);
	}	


	$scope.removeFromMyCollection = function(beer){
		beerService.removeFromMyCollection(beer);
	}



	$scope.addRatingToBeer = function (beer,rating) {
		beerService.addRatingToBeer(beer,Number(rating));
	}


	$scope.sortByRating = function (beer) {
		beerService.sortByRating(beer);
	}


	$scope.test = beerService.test;

	$scope.show = false ;

	$scope.showIf = function () {
		if ($scope.show) {
			$scope.show = false;
		} else {
			$scope.show = true;
		}
	}

	//this is an array to store the copy we make of our beer for editing purposes
  $scope.tempBeer = [];

  $scope.editBeer = function(index) {
    //copy the beer to be edited into a position on the tempBeer array
    $scope.tempBeer[index] = angular.copy($scope.allBeers[index]);
  };

  $scope.updateBeer = function(index) {
    //pass the modified beer in the tempBeer array to our factory
    beerService.updateBeer($scope.tempBeer[index])
      .then(function(updatedBeer) {  
        //if all goes OK the server sends back the updated beer
        $scope.allBeers[index] = updatedBeer;
      }, function(err) {
        //if there has been a problem then alert it
        alert(err.data.message);
      })
      .then(function() {
        //finally, success or error, we need to clear the tempBeer so the view updates
        $scope.tempBeer[index] = null;
      })
  };

 	beerService.getBeers();
	
});

