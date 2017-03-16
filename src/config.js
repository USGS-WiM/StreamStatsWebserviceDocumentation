//http://lgorithms.blogspot.com/2013/07/angularui-router-as-infrastructure-of.html
//http://www.funnyant.com/angularjs-ui-router/
var StreamStats;
(function (StreamStats) {
    'use strinct';
    var config = (function () {
        function config($stateProvider, $urlRouterProvider, $locationProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.$locationProvider = $locationProvider;
            this.$stateProvider
                .state("main", {
                url: '/',
                reloadOnSearch: true,
                //abstract: true,
                template: '<ui-view/>',
                views: {
                    'main': {
                        templateUrl: "Views/homeview.html",
                        controller: "StreamStats.Controllers.MainController"
                    },
                    'sidebar': {
                        templateUrl: "Views/sidebarview.html",
                        controller: "StreamStats.Controllers.SidebarController"
                    },
                    'navbar': {
                        templateUrl: "Views/navigationview.html",
                        controller: "StreamStats.Controllers.NavbarController"
                    }
                }
            }); //end main state 
            this.$urlRouterProvider.otherwise('/');
            //this.$locationProvider.html5Mode(true);                            
        } //end constructor
        return config;
    }()); //end class
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    angular.module('StreamStats', [
        "ui.router", "mobile-angular-ui",
        'leaflet-directive',
        "StreamStats.Services",
        "StreamStats.Controllers",
        'jsonFormatter', 'WiM.Services', 'WiM.Event', 'StreamStats.Directives'
    ])
        .config(config);
})(StreamStats || (StreamStats = {})); //end module 
//# sourceMappingURL=config.js.map