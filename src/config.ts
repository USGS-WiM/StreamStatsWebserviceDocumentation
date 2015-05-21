
//http://lgorithms.blogspot.com/2013/07/angularui-router-as-infrastructure-of.html
//http://www.funnyant.com/angularjs-ui-router/

declare var configuration: any;
module StreamStats {
    'use strinct';

    class config {
        static $inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
        constructor(private $stateProvider: ng.ui.IStateProvider, private $urlRouterProvider: ng.ui.IUrlRouterProvider, private $locationProvider: ng.ILocationProvider) {
            this.$stateProvider
                .state("main", {
                url: '/',
                reloadOnSearch: true,
                //abstract: true,
                template:'<ui-view/>',
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
                })//end main state 
                          
            this.$urlRouterProvider.otherwise('/');

            //this.$locationProvider.html5Mode(true);                            
        }//end constructor
    }//end class

    angular.module('StreamStats',[
        "ui.router", "mobile-angular-ui",
        "StreamStats.Services",
        "StreamStats.Controllers"
        ])
        .config(config);
}//end module 