//------------------------------------------------------------------------------
//----- WiM About --------------------------------------------------------------
//------------------------------------------------------------------------------
//-------1---------2---------3---------4---------5---------6---------7---------8
//       01234567890123456789012345678901234567890123456789012345678901234567890
//-------+---------+---------+---------+---------+---------+---------+---------+
// copyright:   2015 WiM - USGS
//    authors:  Jeremy K. Newson USGS Web Informatics and Mapping
//             
// 
//   purpose:  
//          
//discussion:
//  http://www.ng-newsletter.com/posts/directives.html
//      Restrict parameters
//          'A' - <span ng-sparkline></span>
//          'E' - <ng-sparkline > </ng-sparkline>
//          'C' - <span class="ng-sparkline" > </span>
//          'M' - <!--directive: ng - sparkline-- >
//Comments
//04.15.2015 jkn - Created
//Import
var StreamStats;
(function (StreamStats) {
    var Directives;
    (function (Directives) {
        'use string';
        var AboutController = (function () {
            function AboutController($scope) {
                $scope.vm = this;
                this.selectedTabName = "about";
                this.selected = false;
            }
            //Methods  
            //-+-+-+-+-+-+-+-+-+-+-+-
            AboutController.prototype.toggleSelected = function () {
                if (this.selected)
                    this.selected = false;
                else
                    this.selected = true;
                console.log(this.selected);
            };
            AboutController.prototype.selectTab = function (tabname) {
                if (this.selectedTabName == tabname)
                    return;
                this.selectedTabName = tabname;
                console.log('selected tab: ' + tabname);
            };
            return AboutController;
        }());
        //Constructor
        //-+-+-+-+-+-+-+-+-+-+-+-
        AboutController.$inject = ['$scope'];
        var wimAbout = (function () {
            function wimAbout() {
                this.scope = true;
                this.restrict = 'E';
                this.controller = AboutController;
                this.templateUrl = 'Views/about/about.html';
            }
            wimAbout.instance = function () {
                return new wimAbout;
            };
            //replace= true;
            wimAbout.prototype.link = function (scope, element, attributes, controller) {
                //this is where we can register listeners, set up watches, and add functionality. 
                // The result of this process is why the live data- binding exists between the scope and the DOM tree.
            }; //end link
            return wimAbout;
        }()); //end UrlDirective
        angular.module('StreamStats.Directives', [])
            .directive('about', wimAbout.instance);
    })(Directives = StreamStats.Directives || (StreamStats.Directives = {}));
})(StreamStats || (StreamStats = {})); //end module 
//# sourceMappingURL=AboutDirective.js.map