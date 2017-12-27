(function () { 
	angular.module('BaitsaagchApp', ['ngRoute', 'ngSanitize']);

	//myCtrl.$inject = ['$routeProvider'];
	function config ($routeProvider, $locationProvider) {
	 $routeProvider
	 .when('/', {
	 	templateUrl: 'home/home.view.html',
	 	controller: 'homeCtrl',
	 	controllerAs: 'vm'
	 })
	 .when('/help', {
	 	templateUrl: 'help/help.view.html',
	 	controller: 'helpCtrl',
	 	controllerAs: 'vm'
	 })
	 .when('/config', {
	 	templateUrl: 'help/config.view.html',
	 	controllerAs: 'vm'
	 })
	 .when('/transport/:bus_id', {
		 templateUrl: '/transport/transport.view.html',
		 controller: 'transportCtrl',
		 controllerAs: 'vm'
	 })
	 .otherwise({redirectTo: '/'});
	$locationProvider.html5Mode(true);
	}
	angular
	 .module('BaitsaagchApp')
	 .config(['$routeProvider', '$locationProvider', config]);
})();