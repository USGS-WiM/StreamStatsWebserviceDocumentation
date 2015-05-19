//------------------------------------------------------------------------------
//----- StudyAreaService -------------------------------------------------------
//------------------------------------------------------------------------------
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
var StreamStats;
(function (StreamStats) {
    var Services;
    (function (Services) {
        'use strict';
        var ResourceService = (function (_super) {
            __extends(ResourceService, _super);
            //Constructor
            //-+-+-+-+-+-+-+-+-+-+-+-
            function ResourceService($http, $q) {
                _super.call(this, $http, configuration.baseurls['StreamStats']);
                this.$q = $q;
                this._onResourceChanged = new WiM.Event.Delegate();
                this.loadResourceList();
            }
            Object.defineProperty(ResourceService.prototype, "onResourceChanged", {
                get: function () {
                    return this._onResourceChanged;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ResourceService.prototype, "ResourceList", {
                get: function () {
                    return this._resourceList;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ResourceService.prototype, "SelectedResource", {
                get: function () {
                    return this._selectedResource;
                },
                set: function (v) {
                    if (this._selectedResource == v)
                        return;
                    this._selectedResource = v;
                    // notify listeners
                    this._onResourceChanged.raise(this, WiM.Event.EventArgs.Empty);
                },
                enumerable: true,
                configurable: true
            });
            //Methods
            //-+-+-+-+-+-+-+-+-+-+-+-
            ResourceService.prototype.AddResource = function (r) {
                if (!r.name)
                    return;
                this._resourceList.push(r);
            };
            ResourceService.prototype.RemoveResource = function () {
                //add the study area to studyAreaList
            };
            //Helper Methods
            //-+-+-+-+-+-+-+-+-+-+-+-       
            ResourceService.prototype.loadResourceList = function () {
                //reads from config.
                this._resourceList = configuration.resources;
            };
            return ResourceService;
        })(WiM.Services.HTTPServiceBase); //end class
        factory.$inject = ['$http', '$q'];
        function factory($http, $q) {
            return new ResourceService($http, $q);
        }
        angular.module('StreamStats.Services').factory('StreamStats.Services.ResourceService', factory);
    })(Services = StreamStats.Services || (StreamStats.Services = {}));
})(StreamStats || (StreamStats = {})); //end module
//# sourceMappingURL=ResourceService.js.map