//------------------------------------------------------------------------------
//----- MainController ------------------------------------------------------
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
    interface ILeafletData {
        getMap(): ng.IPromise<any>;
    }
    interface ICenter {
        lat: number;
        lng: number;
        zoom: number;
    }
    interface IBounds {
        southWest: IMapPoint;
        northEast: IMapPoint;
    }
    interface IMapPoint {
        lat: number;
        lng: number;
    }
    interface IMapLayers {
        baselayers: Object;
        overlays: ILayer;
        markers: Object;
        geojson: Object;
    }
    interface ILayer {
        name: string;
        url: string;
        type: string;
        visible: boolean;
        layerOptions: Object;
    }
    class Center implements ICenter {
        //Properties
        //-+-+-+-+-+-+-+-+-+-+-+-
        public lat: number;
        public lng: number;
        public zoom: number;
        //Constructor
        //-+-+-+-+-+-+-+-+-+-+-+-
        constructor(lt: number, lg: number, zm: number) {
            this.lat = lt;
            this.lng = lg;
            this.zoom = zm;
        }
    }   
    class Layer implements ILayer {
        public name: string;
        public url: string;
        public type: string;
        public visible: boolean;
        public layerOptions: Object;

        public constructor(nm: string, ul: string, ty: string, vis: boolean, op: Object = undefined) {
            this.name = nm;
            this.url = ul;
            this.type = ty;
            this.visible = vis;
            this.layerOptions = op;

        }
    }

    class studyArea {
        //Properties
        //-+-+-+-+-+-+-+-+-+-+-+-
        public lat: number;
        public lng: number;
        public rcode: string;
        public crs: number;
        public features: any;
        public workspaceID: string;
        //Constructor
        //-+-+-+-+-+-+-+-+-+-+-+-
        constructor(rcode: string) {
            this.rcode = rcode;
        }
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
        public showOnMap: boolean;
        public applicationURL: string;
        public servicesBaseURL: string;

        public mapPoint: IMapPoint = null;
        public bounds: IBounds = null;
        private leafletData: ILeafletData;
        public cursorStyle: string;
        public center: ICenter = null;
        public layers: IMapLayers = null;
        public markers: Object = null;
        public geojson: Object = null;
        public fitBounds: IBounds;
        public studyArea: studyArea;
        public mapSpinner;

        //Constructor
        //-+-+-+-+-+-+-+-+-+-+-+-
        static $inject = ['$scope', '$filter', 'StreamStats.Services.ResourceService', 'leafletBoundsHelpers', 'leafletData'];
        constructor($scope: IMainControllerScope, private $filter, private Resource: Services.IResourceService, leafletBoundsHelper: any, leafletData: ILeafletData) {
            $scope.vm = this;         
            this.selectedUri = new StreamStats.Models.URI('');
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
            
            //MAP STUFF
            //-+-+-+-+-+-+-+-+-+-+-+-
            this.initMap();
            this.leafletData = leafletData;
            this.showOnMap = false;

            //update lat lng on click
            $scope.$on('leafletDirectiveMap.click',(event, args) => {
                var latlng = args.leafletEvent.latlng;
                this.studyArea.lat = latlng.lat;
                this.studyArea.lng = latlng.lng;

                this.markers['pourpoint'] = {
                    lat: this.studyArea.lat,
                    lng: this.studyArea.lng,
                    focus: true
                }

                for (var index in this.selectedUri.parameters) {
                    if (this.selectedUri.parameters[index].name == "xlocation") {
                        this.selectedUri.parameters[index].value = latlng.lng.toFixed(4);
                    }
                    if (this.selectedUri.parameters[index].name == "ylocation") {
                        this.selectedUri.parameters[index].value = latlng.lat.toFixed(4);
                    }
                }
            });

            $scope.$on('leafletDirectiveMap.zoomend',(event, args) => {
                console.log('map zoom changed', args.leafletEvent.target._animateToZoom, 15, this.cursorStyle);
                (args.leafletEvent.target._animateToZoom > 14) ? this.cursorStyle = 'crosshair' : this.cursorStyle = 'hand'
            });

            $scope.$watch(() => this.selectedUri.selectedMedia,(newVal, oldVal) => {
                this.makeRequestURL();
            });

            $scope.$watch(() => this.selectedUri.parameters,(newVal, oldVal) => {

                this.makeRequestURL();

                if (this.selectedUri.id == 'Watershed By Location') {

                    for (var key in this.selectedUri.parameters) {

                        //if oldval doesnt exists were on first page load
                        if (this.selectedUri.parameters[key].name == "rcode") {

                            //if there isn't a study area
                            if (!this.studyArea) {
                                console.log('first page load');
                                this.studyArea = new studyArea(this.selectedUri.parameters[key].value);
                                this.changeMapRegion(this.selectedUri.parameters[key].value);
                            }

                            //otherwise change studyArea
                            else if (this.studyArea.rcode != this.selectedUri.parameters[key].value) {
                                console.log('rcode changed');
                                this.studyArea = new studyArea(newVal[key].value);
                                this.changeMapRegion(newVal[key].value);
                            }
                        }
                    }
                }
            }, true);

        }

        //Methods
        //-+-+-+-+-+-+-+-+-+-+-+-
        public loadResponse() {

            this.waitCursor = true;
            this.showOnMap = false;
            this.requestResults = '';

            this.Resource.getURL(this.selectedUri.newURL, this.selectedMedia)
                .then(
                (response: any) => {
                    this.requestResults = response.data;
                },(error) => {
                    this.requestResults = "(" + error.status + ") " + error.data;
                }).finally(() => {
                this.waitCursor = false;
                this.showOnMap = true;
            });
        }

        public makeRequestURL() {
            console.log('in makeRequest URL function');
            var inputParams = [this.selectedUri.selectedMedia];
            for (var i = 0; i < this.selectedUri.parameters.length; i++) {
                inputParams.push(this.selectedUri.parameters[i].value);
            }
            var func = this.selectedUri.uri.format;
            var newURL = func.apply(this.selectedUri.uri, inputParams);
            this.selectedUri.newURL = newURL;
            return newURL.replace(/\{(.+?)\}/g, "");
        }


        //MAP STUFF
        //-+-+-+-+-+-+-+-+-+-+-+-
        private changeMapRegion(region: string) {
            this.leafletData.getMap().then((map: any) => {
                console.log('getting the map for fitbounds');
                for (var index in configuration.regions) {
                    var value = configuration.regions[index];
                    if (value.RegionID == region.toUpperCase()) {
                        console.log('match found', value.RegionID + "_region", value.Bounds);
                        map.fitBounds(value.Bounds);
                    }
                }
            });
        }

        private showResponseOnMap() {

            this.studyArea.features = this.requestResults.hasOwnProperty("featurecollection") ? this.requestResults["featurecollection"] : null;
            this.studyArea.workspaceID = this.requestResults.hasOwnProperty("workspaceID") ? this.requestResults["workspaceID"] : null;

            //clear out this.markers
            this.markers = {};
            this.geojson = {};

            if (!this.studyArea.features) return;

            var lat = this.studyArea.lat;
            var lng = this.studyArea.lng;
            var rcode = this.studyArea.rcode;
            var workspaceID = this.studyArea.workspaceID;

            this.studyArea.features.forEach((item) => {
                this.geojson[item.name] = {
                    data: item.feature
                }

                //do layer styling or labelling here
                if (item.name == 'globalwatershed') {
                    this.geojson[item.name].style = {
                        fillColor: "yellow",
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        fillOpacity: 0.5
                    }
                }

                else if (item.name == 'globalwatershedpoint') {
                    this.geojson[item.name].onEachFeature = function (feature, layer) {
                        var popupContent = '<strong>Latitude: </strong>' + lat + '</br><strong>Longitude: </strong>' + lng + '</br><strong>Region: </strong>' + rcode + '</br><strong>WorkspaceID: </strong>' + workspaceID + '</br>';
                        angular.forEach(feature.properties, function (value, key) {
                            popupContent += '<strong>' + key + ': </strong>' + value + '</br>';
                        });
                        
                        layer.bindPopup(popupContent);
                    }
                }
            });            
  
            var bbox = this.geojson['globalwatershed'].data.features[0].bbox;
            console.log(bbox);
            this.leafletData.getMap().then((map: any) => {
                map.fitBounds([[bbox[1], bbox[0]], [bbox[3], bbox[2]]]);
            });
        }

        private initMap(): void {
            this.center = new Center(39, -100, 4);
            this.layers = {
                baselayers: configuration.basemaps,
                overlays: configuration.overlayedLayers,
                markers: this.markers,
                geojson: this.geojson
            }
            this.markers = {};
            this.geojson = {};
            L.Icon.Default.imagePath = 'images';
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