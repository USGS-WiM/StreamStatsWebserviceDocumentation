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
    interface IMainControllerScope extends ng.IScope {
        vm: MainController;
    }
    interface IMainController {
       
    }
    
    class MainController implements IMainController {
        //Events
        //-+-+-+-+-+-+-+-+-+-+-+-
        private _onSelectedUriHandler: WiM.Event.EventHandler<WiM.Event.EventArgs>;
        private _onSelectedResourceHandler: WiM.Event.EventHandler<WiM.Event.EventArgs>;

        //Properties
        //-+-+-+-+-+-+-+-+-+-+-+-
        public sideBarCollapsed: boolean;
        private selectedUri: Models.IURI;
        private selectedResource: Models.IResource;
        private selectedUriParameters: Array<Models.IURIParameter>;
        private selectedMedia: string;

        //Constructor
        //-+-+-+-+-+-+-+-+-+-+-+-
        static $inject = ['$scope', 'StreamStats.Services.ResourceService'];
        constructor($scope: IMainControllerScope, Resource: Services.IResourceService) {
            $scope.vm = this;
            this.sideBarCollapsed = false;
            //this.selectedMedia = null;
            //this.selectedUriParameters = [];

            this._onSelectedResourceHandler = new WiM.Event.EventHandler<WiM.Event.EventArgs>(() => {
                this.selectedResource = Resource.SelectedResource;
            });
            Resource.onResourceChanged.subscribe(this._onSelectedResourceHandler);   

            this._onSelectedUriHandler = new WiM.Event.EventHandler<WiM.Event.EventArgs>(() => {
                this.selectedUri = Resource.SelectedUri;
                //this.selectedMedia = this.selectedUri.selectedMedia;
                //this.selectedUriParameters.length = 0;


                //for (var i = 0; i < this.selectedUri.parameters.length; i++) {
                //    this.selectedUriParameters.push(this.selectedUri.parameters[i]);
                //}
                //console.log(this.selectedUriParameters);

            });
            Resource.onUriChanged.subscribe(this._onSelectedUriHandler);  
          /*
            $scope.$watchGroup([this.selectedMedia, this.selectedUriParameters], function (newValues, oldValues, scope) {
                
                if (this.selectedUri == null) return;
                var newUri = this.selectedUri.newUri = '';
                //var inputs = newValues.join(',');
                newUri = this.selectedUri.uri.format(newValues);

            });
        */
            
        }

        //Methods
        //-+-+-+-+-+-+-+-+-+-+-+-
       
       
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
        .controller('StreamStats.Controllers.MainController', MainController)
}//end module