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
        var NavbarController = (function () {
            function NavbarController($scope) {
                $scope.vm = this;
                this.sideBarCollapsed = false;
                this.selectedProcedure = ProcedureType.INIT;
            }
            //Methods
            //-+-+-+-+-+-+-+-+-+-+-+-
            NavbarController.prototype.setProcedureType = function (pType) {
                if (this.selectedProcedure == pType || !this.canUpdateProceedure(pType))
                    return;
                this.selectedProcedure = pType;
            };
            NavbarController.prototype.toggleSideBar = function () {
                if (this.sideBarCollapsed)
                    this.sideBarCollapsed = false;
                else
                    this.sideBarCollapsed = true;
            };
            //Helper Methods
            //-+-+-+-+-+-+-+-+-+-+-+-
            NavbarController.prototype.canUpdateProceedure = function (pType) {
                //Project flow:
                var msg;
                try {
                    switch (pType) {
                        case ProcedureType.INIT:
                            return true;
                        case ProcedureType.IDENTIFY:
                            return true;
                        case ProcedureType.SELECT:
                            return true;
                        case ProcedureType.REFINE:
                            //if (!this.fileLoaded) this.sm(new MSG.NotificationArgs("Import a valid lab document", MSG.NotificationType.WARNING));
                            return false;
                        case ProcedureType.BUILD:
                            return false;
                        default:
                            return false;
                    } //end switch          
                }
                catch (e) {
                    //this.sm(new MSG.NotificationArgs(e.message, MSG.NotificationType.INFORMATION, 1.5));
                    return false;
                }
            };
            NavbarController.prototype.sm = function (msg) {
                try {
                }
                catch (e) {
                }
            };
            //Constructor
            //-+-+-+-+-+-+-+-+-+-+-+-
            NavbarController.$inject = ['$scope'];
            return NavbarController;
        })(); //end class
        var ProcedureType;
        (function (ProcedureType) {
            ProcedureType[ProcedureType["INIT"] = 1] = "INIT";
            ProcedureType[ProcedureType["IDENTIFY"] = 2] = "IDENTIFY";
            ProcedureType[ProcedureType["SELECT"] = 3] = "SELECT";
            ProcedureType[ProcedureType["REFINE"] = 4] = "REFINE";
            ProcedureType[ProcedureType["BUILD"] = 5] = "BUILD";
        })(ProcedureType || (ProcedureType = {}));
        angular.module('StreamStats.Controllers')
            .controller('StreamStats.Controllers.NavbarController', NavbarController);
    })(Controllers = StreamStats.Controllers || (StreamStats.Controllers = {}));
})(StreamStats || (StreamStats = {})); //end module
//# sourceMappingURL=NavbarController.js.map