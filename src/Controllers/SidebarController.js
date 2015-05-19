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
        var SidebarController = (function () {
            function SidebarController($scope, resourceService) {
                var _this = this;
                this.resourceService = resourceService;
                $scope.vm = this;
                this._onSelectedResourceHandler = new WiM.Event.EventHandler(function () {
                    _this.selectedResource = _this.resourceService.SelectedResource;
                });
                this.resourceList = resourceService.ResourceList;
                resourceService.onResourceChanged.subscribe(this._onSelectedResourceHandler);
            }
            //Methods
            //-+-+-+-+-+-+-+-+-+-+-+-
            SidebarController.prototype.selectResource = function (r) {
                this.resourceService.SelectedResource = r;
            };
            SidebarController.prototype.selectUri = function (r) {
                this.resourceService.SelectedUri = r;
            };
            //Helper Methods
            //-+-+-+-+-+-+-+-+-+-+-+-
            SidebarController.prototype.sm = function (msg) {
                try {
                }
                catch (e) {
                }
            };
            //Constructor
            //-+-+-+-+-+-+-+-+-+-+-+-
            SidebarController.$inject = ['$scope', 'StreamStats.Services.ResourceService'];
            return SidebarController;
        })(); //end class
        angular.module('StreamStats.Controllers').controller('StreamStats.Controllers.SidebarController', SidebarController);
    })(Controllers = StreamStats.Controllers || (StreamStats.Controllers = {}));
})(StreamStats || (StreamStats = {})); //end module
//# sourceMappingURL=SidebarController.js.map