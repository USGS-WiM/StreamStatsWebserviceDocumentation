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
module StreamStats.Controllers {
    'use strinct';
    interface ISidebarControllerScope extends ng.IScope {
        vm: SidebarController;
    }
    interface ISidebarController {
        resourceList: Array<Models.IResource>
  
    }
    
    class SidebarController implements ISidebarController {
        //Events
        private _onSelectedResourceHandler: WiM.Event.EventHandler<WiM.Event.EventArgs>;
        //Properties
        //-+-+-+-+-+-+-+-+-+-+-+-
        public resourceList: Array<Models.IResource>;
        public selectedResource: Models.IResource;

        
        //Constructor
        //-+-+-+-+-+-+-+-+-+-+-+-
        static $inject = ['$scope','StreamStats.Services.ResourceService'];
        constructor($scope: ISidebarControllerScope, private resourceService:Services.IResourceService) {
            $scope.vm = this; 
            this._onSelectedResourceHandler = new WiM.Event.EventHandler<WiM.Event.EventArgs>(() => {
                this.selectedResource = this.resourceService.SelectedResource;
            }); 
            this.resourceList = resourceService.ResourceList;
            resourceService.onResourceChanged.subscribe(this._onSelectedResourceHandler);          
        }

        //Methods
        //-+-+-+-+-+-+-+-+-+-+-+-
        public selectResource(r: Models.IResource) {
            this.resourceService.SelectedResource = r;
        }

        public selectUri(r: Models.IURI) {
            this.resourceService.SelectedUri = r;
        }
        
       
        //Helper Methods
        //-+-+-+-+-+-+-+-+-+-+-+-

        private sm(msg: string) {
            try {
                //toastr.options = {
                //    positionClass: "toast-bottom-right"
                //};

                //this.NotificationList.unshift(new LogEntry(msg.msg, msg.type));

                //setTimeout(() => {
                //    toastr[msg.type](msg.msg);
                //    if (msg.ShowWaitCursor != undefined)
                //        this.IsLoading(msg.ShowWaitCursor)
                //}, 0)
            }
            catch (e) {
            }
        }

  
    }//end class


    angular.module('StreamStats.Controllers')
        .controller('StreamStats.Controllers.SidebarController', SidebarController)
    
}//end module
 