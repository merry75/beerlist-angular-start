var app = angular.module('beerList', ['ui.router']);


app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      controller: 'beerController',
      templateUrl: '/templates/home.html'
    })
    .state('beer', {
      url: '/beers/:id',
      controller: 'beerController2',
      templateUrl: '/templates/beer.html',
      params: {
        beerParam: null
      }
    });

  $urlRouterProvider.otherwise('/home');
}]);