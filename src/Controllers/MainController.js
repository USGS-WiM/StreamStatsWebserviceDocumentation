//------------------------------------------------------------------------------
//----- SidebarController ------------------------------------------------------
//------------------------------------------------------------------------------
//-------1---------2---------3---------4---------5---------6---------7---------8
//       01234567890123456789012345678901234567890123456789012345678901234567890
//-------+---------+---------+---------+---------+---------+---------+---------+
// copyright:   2014 WiM - USGS
//    authors:  Jeremy K. Newson USGS Wisconsin Internet Mapping
//   purpose:  
//discussion:   Controllers are typically built to reflect a View. 
//              and should only contailn business logic needed for a single view. For example, if a View 
//              contains a ListBox of objects, a Selected object, and a Save button, the Controller 
//              will have an ObservableCollection ObectList, 
//              Model SelectedObject, and SaveCommand.
//Comments
//04.14.2015 jkn - Created
//Imports"
var StreamStats;
(function (StreamStats) {
    var Controllers;
    (function (Controllers) {
        'use strinct';
        var MainController = (function () {
            function MainController($scope, $filter, Resource) {
                var _this = this;
                this.$filter = $filter;
                this.Resource = Resource;
                $scope.vm = this;
                this.waitCursor = false;
                this.sideBarCollapsed = false;
                this.applicationURL = configuration.baseurls['application'];
                var href = window.location.href.split('/');
                this.servicesBaseURL = href[0] + '//' + href[2] + '/' + href[3];
                this._onSelectedResourceHandler = new WiM.Event.EventHandler(function () {
                    _this.selectedResource = Resource.SelectedResource;
                });
                Resource.onResourceChanged.subscribe(this._onSelectedResourceHandler);
                this._onSelectedUriHandler = new WiM.Event.EventHandler(function () {
                    _this.selectedUri = Resource.SelectedUri;
                    _this.requestResults = "";
                });
                Resource.onUriChanged.subscribe(this._onSelectedUriHandler);
            }
            //Methods
            //-+-+-+-+-+-+-+-+-+-+-+-
            MainController.prototype.loadURL = function () {
                var _this = this;
                var newURL = this.$filter("makeURL")(this.selectedUri);
                this.waitCursor = true;
                this.Resource.getURL(newURL, this.selectedMedia).then(function (response) {
                    _this.requestResults = response.data;
                }, function (error) {
                    _this.requestResults = "(" + error.status + ") " + error.data;
                }).finally(function () {
                    _this.waitCursor = false;
                });
            };
            //Helper Methods
            //-+-+-+-+-+-+-+-+-+-+-+-
            MainController.prototype.sm = function (msg) {
                try {
                }
                catch (e) {
                }
            };
            //Constructor
            //-+-+-+-+-+-+-+-+-+-+-+-
            MainController.$inject = ['$scope', '$filter', 'StreamStats.Services.ResourceService'];
            return MainController;
        })(); //end class
        angular.module('StreamStats.Controllers').controller('StreamStats.Controllers.MainController', MainController);
    })(Controllers = StreamStats.Controllers || (StreamStats.Controllers = {}));
})(StreamStats || (StreamStats = {})); //end module
//# sourceMappingURL=MainController.js.map