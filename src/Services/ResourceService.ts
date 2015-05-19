//------------------------------------------------------------------------------
//----- StudyAreaService -------------------------------------------------------
//------------------------------------------------------------------------------

//-------1---------2---------3---------4---------5---------6---------7---------8
//       01234567890123456789012345678901234567890123456789012345678901234567890
//-------+---------+---------+---------+---------+---------+---------+---------+

// copyright:   2015 WiM - USGS

//    authors:  Jeremy K. Newson USGS Wisconsin Internet Mapping
//             
// 
//   purpose:  The service agent is responsible for initiating service calls, 
//             capturing the data that's returned and forwarding the data back to 
//             the ViewModel.
//          
//discussion:
//

//Comments
//04.15.2015 jkn - Created

//Import
module StreamStats.Services {
    'use strict'
    export interface IResourceService {
        onResourceChanged: WiM.Event.Delegate<WiM.Event.EventArgs>;
        ResourceList: Array<Models.IResource>;
        SelectedResource: Models.IResource;
       
    }
    class ResourceService extends WiM.Services.HTTPServiceBase implements IResourceService {
        //Events
        private _onResourceChanged: WiM.Event.Delegate<WiM.Event.EventArgs>;
        public get onResourceChanged(): WiM.Event.Delegate<WiM.Event.EventArgs> {
            return this._onResourceChanged;
        }
        
        //Properties
        //-+-+-+-+-+-+-+-+-+-+-+-
        private _resourceList: Array<Models.IResource>;
        public get ResourceList(): Array<Models.IResource> {
            return this._resourceList;
        }

        private _selectedResource: Models.IResource;
        public get SelectedResource(): Models.IResource {
            return this._selectedResource;
        }
        public set SelectedResource(v: Models.IResource) {
            if (this._selectedResource == v) return;
            this._selectedResource = v;
            // notify listeners
            this._onResourceChanged.raise(this, WiM.Event.EventArgs.Empty);
        }

        //Constructor
        //-+-+-+-+-+-+-+-+-+-+-+-
        constructor($http: ng.IHttpService, private $q: ng.IQService) {
            super($http, configuration.baseurls['StreamStats'])
            this._onResourceChanged = new WiM.Event.Delegate<WiM.Event.EventArgs>();
            this.loadResourceList();
            
        }
        //Methods
        //-+-+-+-+-+-+-+-+-+-+-+-
        public AddResource(r: Models.IResource) {
            if (!r.name) return;
            this._resourceList.push(r);
        }
        public RemoveResource() {
            //add the study area to studyAreaList
        }
        

        //Helper Methods
        //-+-+-+-+-+-+-+-+-+-+-+-       
        private loadResourceList(): void{
            //reads from config.
            this._resourceList = configuration.resources;
        }

    }//end class

    factory.$inject = ['$http', '$q'];
    function factory($http: ng.IHttpService, $q: ng.IQService) {
        return new ResourceService($http,$q)
    }
    angular.module('StreamStats.Services')
        .factory('StreamStats.Services.ResourceService', factory)
}//end module