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
  //Fuel Record Details view
  $stateProvider.state('fuel.detail', {
  	url: '/:fuelRecordIndex',
  	templateUrl: 'fuelDetail.html',
  	controller: 'fuelDetailCtrl'	
  })

  //Help Tab
  $stateProvider.state('help', {
  	url: '/help',
  	views: { help: { templateUrl: 'help.html' }}
  })

  //Settings Tab
  $stateProvider.state('settings', {
  	url: '/settings',
  	views: { 
  		settings: { 
  			templateUrl: 'settings.html',
  			controller: 'settingsCtrl'
  		}
  	}
  })
})

//////
///Factorys
///
//Factory for Fuel Records
//This is where we will eventualy read and write to a webservice or database?
app.factory('fuelRecordsService', function() {
  return {
    all: function(){
    	var fuelRecordsString = window.localStorage['fuelRecords'];
    	if(fuelRecordsString) {
    		return angular.fromJson(fuelRecordsString);
    	}
    	return [];
    },
    save: function(fuelRecords) {
    	window.localStorage['fuelRecords'] = angular.toJson(fuelRecords);
    },
    getFuelRecord: function(index) {
    	return getFromLocalStorage('fuelRecords')[index];
    }
  }
})
//Factory for Settings
//For all the settings and units of mesure
app.factory('settingsService', function(){
	var settings = {
		firstName: "First Name",
		lastName: "Last Name",
		email: "Email",
	 	uomDistance: "Km",
		uomVolume: "L",
		car_rego: " "
	}
	return {
		settings: settings
	}
})

///////
///Controllers
///
//Fuel Index Page Controler
//Gets the fuel records from the factory fuelRecordsService
app.controller('fuelIndexCtrl', function($scope, $ionicModal, fuelRecordsService){
	$scope.fuelRecords = fuelRecordsService.all();

	$ionicModal.fromTemplateUrl('fuelRecordModal.html', function(modal) {
		$scope.fuelRecordModal = modal;
	}, {
    	scope: $scope,
   	 	animation: 'slide-in-up'
  	});

  	$scope.addFuelRecord = function(fuelRecord) {
  		$scope.fuelRecords.push({
  			date_time: fuelRecord.date_time,
  			odometer_reading: fuelRecord.odometer_reading,
  			personal: fuelRecord.personal,
  			trip_purpose: fuelRecord.trip_purpose,
  			reason: fuelRecord.reason
  		});

  		$scope.fuelRecordModal.hide();
  		fuelRecordsService.save($scope.fuelRecords);
  	};

	$scope.showFuelRecordModal = function() {
    	$scope.fuelRecordModal.show();
  	};
  	$scope.hideFuelRecordModal = function() {
  		$scope.fuelRecordModal.hide();
  	};
})
//Fuel Detail Page Controler
//Takes in the state paramiters from the state and use them to get the fuel record.
app.controller('fuelDetailCtrl', function($scope, $state, $stateParams, fuelRecordsService){
	$scope.fuelRecord = fuelRecordsService.getFuelRecord($stateParams.fuelRecordIndex)
})
//Settings Conroler
app.controller('settingsCtrl', function($scope, settingsService){
	$scope.settings = settingsService.settings;

	$scope.updateSettings = function(settings) {
		$scope.settings = settings;
		settingsService.settings = settings;
	}
})


////////
///Custom Functions
///
//Gets objects back out of local storage
function getFromLocalStorage(key){
    	var localStorageString = window.localStorage['fuelRecords']; 
    	return angular.fromJson(localStorageString);
}
