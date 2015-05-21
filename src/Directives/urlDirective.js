//------------------------------------------------------------------------------
//----- urlDirective -------------------------------------------------------
//------------------------------------------------------------------------------
//-------1---------2---------3---------4---------5---------6---------7---------8
//       01234567890123456789012345678901234567890123456789012345678901234567890
//-------+---------+---------+---------+---------+---------+---------+---------+
// copyright:   2015 WiM - USGS
//    authors:  Jeremy K. Newson USGS Wisconsin Internet Mapping
//             
// 
//   purpose:  
//          
//discussion:
//
//Comments
//04.15.2015 jkn - Created
//Import
var StreamStats;
(function (StreamStats) {
    var Directives;
    (function (Directives) {
        'use string';
        var UrlDirectiveController = (function () {
            function UrlDirectiveController($scope, resourceService) {
                this.resourceService = resourceService;
                $scope.vm = this;
                console.log('urlDirectiveController bla...');
            }
            UrlDirectiveController.$inject = ['$scope', 'StreamStats.Services.ResourceService'];
            return UrlDirectiveController;
        })();
        var UrlDirective = (function () {
            function UrlDirective() {
                this.restrict = 'A';
                this.controller = UrlDirectiveController;
                this.template = 'Views/urltemplate.html';
                this.replace = true;
            }
            UrlDirective.instance = function () {
                return new UrlDirective;
            };
            UrlDirective.prototype.link = function (scope, element, attributes, controller) {
                console.log('does something');
            }; //end link
            return UrlDirective;
        })(); //end UrlDirective
        angular.module('StreamStats.Directives').directive('UrlDirective', UrlDirective.instance);
    })(Directives = StreamStats.Directives || (StreamStats.Directives = {}));
})(StreamStats || (StreamStats = {})); //end module 
//# sourceMappingURL=urlDirective.js.map