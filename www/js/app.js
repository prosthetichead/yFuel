// Ashley Colman
// yFuel

var app = angular.module('yFuel', ['ionic'])
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/fuel')

  //Our navigation States (ui-sref looks for these)
  //Fuel Tab
  $stateProvider.state('fuel', {
  	abstract: true,
	url: '/fuel',
	views: {
		fuel: {
			template: '<ion-nav-view></ion-nav-view>'
		}	
	} 
  })
  $stateProvider.state('fuel.index', {
  	url: '',
  	templateUrl: 'fuelIndex.html',
  	controller: 'fuelIndexCtrl'
  })
  $stateProvider.state('fuel.detail', {
  	url: '/:fuelRecordIndex',
  	templateUrl: 'fuelDetail.html'
  })

  //Help Tab
  $stateProvider.state('help', {
  	url: '/help',
  	views: { help: { templateUrl: 'help.html' }}
  })

  //Settings Tab
  $stateProvider.state('settings', {
  	url: '/settings',
  	views: { settings: { templateUrl: 'settings.html' }}
  })
})

app.controller('fuelIndexCtrl', function($scope){
	$scope.fuelRecords = [
		{title: "07-07-15 10:36pm"},
		{title: "07-07-15 10:00pm"}
	]
})