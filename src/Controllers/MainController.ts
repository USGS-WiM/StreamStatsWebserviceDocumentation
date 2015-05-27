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
        public selectedUri: Models.IURI;
        public selectedResource: Models.IResource;
        //public selectedUriParameters: Array<Models.IURIParameter>;
        public selectedMedia: string;
        public requestResults: string;
        public waitCursor: boolean;
        public applicationURL: string;
        public servicesBaseURL: string;

        //Constructor
        //-+-+-+-+-+-+-+-+-+-+-+-
        static $inject = ['$scope', '$filter','StreamStats.Services.ResourceService'];
        constructor($scope: IMainControllerScope, private $filter, private Resource: Services.IResourceService) {
            $scope.vm = this;
            this.waitCursor = false;
            this.sideBarCollapsed = false;
            this.applicationURL = configuration.baseurls['application'];
            this.servicesBaseURL = configuration.baseurls['services'];
            this._onSelectedResourceHandler = new WiM.Event.EventHandler<WiM.Event.EventArgs>(() => {
                this.selectedResource = Resource.SelectedResource;
            });
            Resource.onResourceChanged.subscribe(this._onSelectedResourceHandler);   

            this._onSelectedUriHandler = new WiM.Event.EventHandler<WiM.Event.EventArgs>(() => {
                this.selectedUri = Resource.SelectedUri;
                this.requestResults = ""
            });
            Resource.onUriChanged.subscribe(this._onSelectedUriHandler);             
            
        }

        //Methods
        //-+-+-+-+-+-+-+-+-+-+-+-
        public loadURL() {
            var newURL = this.$filter("makeURL")(this.selectedUri)
            this.waitCursor = true;
            this.Resource.getURL(newURL,this.selectedMedia) 
                .then(
                    (response: any) => {
                        this.requestResults = response.data;
                },(error) => {
                    this.requestResults = "("+error.status+") "+ error.data;
                }).finally(() => {
                    this.waitCursor=false;                    
                });
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
        .controller('StreamStats.Controllers.MainController', MainController)
}//end module