app.service('beerService', function($http){
  var beerService = new Object();
  beerService.allBeers =  [
		// {img:"https://cdn.beeradvocate.com/im/beers/78820.jpg",name:"Kentucky Brunch Brand Stout", style:"American Double / Imperial Stout", abv:12, ratings:[],averageRating:0},
  //   {img:"https://cdn.beeradvocate.com/im/beers/136936.jpg",name:"Good Morning", style:"American Double / Imperial Stout ", abv:8.4,ratings:[], averageRating:0},
  //   {img:"https://cdn.beeradvocate.com/im/beers/87846.jpg",name:"King Julius", style:"American Double / Imperial IPA ", abv:8.3,ratings:[], averageRating:0},
  //   {img:"https://cdn.beeradvocate.com/im/beers/146770.jpg",name:"Very Hazy", style:"American Double / Imperial IPA ", abv:8.6,ratings:[], averageRating:0},
  //   {img:"https://cdn.beeradvocate.com/im/beers/21690.jpg",name:"Pliny The Younger", style:"American Double / Imperial IPA ", abv:10.0,ratings:[], averageRating:0}
	];


  var test = "Im alive from the service"; 

  beerService.reviews = [] ;

  beerService.addToMyReviews = function (review, id) {
    return $http.post('/beers/' + id + '/reviews', review)
  };

  beerService.addToMyCollection = function(beer){
    // console.log(beers);
  	var index = beerService.indexInMyCollection(beer);
    return $http.post('/beers', beer)
    .then(function(response) {
            if(index < 0){
               beerService.allBeers.push(response.data);
            }
    }, function(err) {
      console.error(err)
    });
  }

 beerService.addRatingToBeer = function (beer,rating) {
  console.log(beer);
    beer.rating.push(rating);
    var total = 0;
    for (var i =0; i < beer.rating.length ; i++) {
      total += beer.rating[i];
    }
    beer.averageRating = total / beer.rating.length;
    
  }


  beerService.removeFromMyCollection = function(beerToRemove){
  	beerService.allBeers.splice(beerService.indexInMyCollection(beerToRemove), 1);
    return $http.delete('/beers/' + (beerToRemove._id))
    .then(function(response) {
       //beerService.allBeers.splice(response,1);
    })
  }

  beerService.indexInMyCollection = function(beerToCheck){
  	for(m in beerService.allBeers){
  		var beer = beerService.allBeers[m];
  		if(beerToCheck.name == beer.name){
  			return m;
  		}
  	}
  	return -1;
  }

beerService.sortByRating = function () {
  allBeers.sort(function(a, b) {
  return a.averageRating - b.averageRating;
  });
}

beerService.getBeers = function () {
    return $http.get('/beers')
    .then(function(response) {
      angular.copy(response.data, beerService.allBeers);
    }, function(err) {
      console.error(err)
    });
}

  beerService.updateBeer = function(beer) {
    return $http.put('/beers/' + beer._id, beer)
      .then(function(response) {
        return response.data
      });
  };

    beerService.getBeer = function(id) {
    return $http.get('/beers/' + id)
      .then(function(response) {
        return response.data
      }, function(err) {
        console.error(err)
      });
  };

  return beerService;
})