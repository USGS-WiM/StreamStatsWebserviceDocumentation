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
            this.$stateProvider.state("main", {
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
        config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
        return config;
    })(); //end class
    angular.module('StreamStats', [
        "ui.router",
        "mobile-angular-ui",
        "StreamStats.Services",
        "StreamStats.Controllers",
        'jsonFormatter'
    ]).config(config);
})(StreamStats || (StreamStats = {})); //end module 
//# sourceMappingURL=config.js.map