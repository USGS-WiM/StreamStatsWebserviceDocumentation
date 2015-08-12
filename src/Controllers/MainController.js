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
        var Center = (function () {
            //Constructor
            //-+-+-+-+-+-+-+-+-+-+-+-
            function Center(lt, lg, zm) {
                this.lat = lt;
                this.lng = lg;
                this.zoom = zm;
            }
            return Center;
        })();
        var Layer = (function () {
            function Layer(nm, ul, ty, vis, op) {
                if (op === void 0) { op = undefined; }
                this.name = nm;
                this.url = ul;
                this.type = ty;
                this.visible = vis;
                this.layerOptions = op;
            }
            return Layer;
        })();
        var studyArea = (function () {
            //Constructor
            //-+-+-+-+-+-+-+-+-+-+-+-
            function studyArea(rcode, lat, lng) {
                this.rcode = rcode;
                this.lat = lat;
                this.lng = lng;
            }
            return studyArea;
        })();
        var MainController = (function () {
            function MainController($scope, $filter, Resource, leafletBoundsHelper, leafletData) {
                var _this = this;
                this.$filter = $filter;
                this.Resource = Resource;
                this.mapPoint = null;
                this.bounds = null;
                this.center = null;
                this.layers = null;
                this.markers = null;
                this.geojson = null;
                $scope.vm = this;
                this.initMap();
                this.selectedUri = new StreamStats.Models.URI('');
                //update lat lng on click
                $scope.$on('leafletDirectiveMap.click', function (event, args) {
                    var latlng = args.leafletEvent.latlng;
                    _this.studyArea.lat = latlng.lat;
                    _this.studyArea.lng = latlng.lng;
                    _this.markers['pourpoint'] = {
                        lat: _this.studyArea.lat,
                        lng: _this.studyArea.lng,
                        focus: true
                    };
                    for (var index in _this.selectedUri.parameters) {
                        if (_this.selectedUri.parameters[index].name == "xlocation") {
                            _this.selectedUri.parameters[index].value = latlng.lng.toFixed(4);
                        }
                        if (_this.selectedUri.parameters[index].name == "ylocation") {
                            _this.selectedUri.parameters[index].value = latlng.lat.toFixed(4);
                        }
                    }
                });
                //manage map cursor
                $scope.$on('leafletDirectiveMap.zoomend', function (event, args) {
                    //console.log('map zoom changed', args.leafletEvent.target._animateToZoom, 15);
                    (args.leafletEvent.target._animateToZoom >= 15) ? _this.cursorStyle = 'crosshair' : _this.cursorStyle = 'hand';
                });
                //check for map load
                $scope.$on('leafletDirectiveMap.load', function (event, args) {
                    //console.log('map loaded');
                });
                //watch for changes to rcode only
                $scope.$watch(function () { return _this.selectedUri.parameters; }, function (newVal, oldVal) {
                    //make sure we are on the right uri
                    if (_this.selectedUri.id == 'Watershed By Location') {
                        for (var key in _this.selectedUri.parameters) {
                            //make sure there is a value
                            if (_this.selectedUri.parameters.hasOwnProperty(key)) {
                                //if oldval doesnt exists were on first page load
                                if ((oldVal.length == 0) && (_this.selectedUri.parameters[key].name == "rcode")) {
                                    console.log('first page load');
                                    //create new studyArea object
                                    //this.studyArea = new studyArea(newVal[0].value);
                                    _this.changeMapRegion(newVal[0].value);
                                }
                                else if ((_this.selectedUri.parameters[key].name == "rcode") && (newVal[key].value != oldVal[key].value)) {
                                    //this.studyArea = new studyArea(newVal[key].value);
                                    console.log('rcode changed');
                                    _this.changeMapRegion(newVal[key].value);
                                }
                            }
                        }
                    }
                }, true);
                this.leafletData = leafletData;
                this.waitCursor = false;
                this.showOnMap = false;
                this.sideBarCollapsed = false;
                this.applicationURL = configuration.baseurls['application'];
                this.servicesBaseURL = configuration.baseurls['services'];
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
            MainController.prototype.changeMapRegion = function (region) {
                this.leafletData.getMap().then(function (map) {
                    console.log('getting the map for fitbounds');
                    for (var index in configuration.regions) {
                        var value = configuration.regions[index];
                        if (value.RegionID == region.toUpperCase()) {
                            console.log('match found', value.RegionID + "_region", value.Bounds);
                            map.fitBounds(value.Bounds);
                        }
                    }
                });
            };
            MainController.prototype.loadURL = function () {
                var _this = this;
                this.waitCursor = true;
                this.showOnMap = false;
                for (var key in this.selectedUri.parameters) {
                    if (this.selectedUri.parameters[key].name == 'rcode') {
                        var region = this.selectedUri.parameters[key].value;
                    }
                    if (this.selectedUri.parameters[key].name == 'xlocation') {
                        var lng = this.selectedUri.parameters[key].value;
                    }
                    if (this.selectedUri.parameters[key].name == 'ylocation') {
                        var lat = this.selectedUri.parameters[key].value;
                    }
                }
                var url = configuration.queryparams['SSdelineation'].format(region, lng.toString(), lat.toString(), "4326", false);
                //clear study area
                this.studyArea = new studyArea(region, Number(lat), Number(lng));
                this.Resource.getURL(url, "JSON").then(function (response) {
                    _this.studyArea.features = response.data.hasOwnProperty("featurecollection") ? response.data["featurecollection"] : null;
                    _this.studyArea.workspaceID = response.data.hasOwnProperty("workspaceID") ? response.data["workspaceID"] : null;
                    //sm when complete
                }, function (error) {
                    //sm when error
                }).finally(function () {
                    _this.waitCursor = false;
                    _this.showOnMap = true;
                });
            };
            MainController.prototype.showResultsOnMap = function () {
                var _this = this;
                this.geojson = {};
                console.log('features returned: ', this.studyArea.features);
                if (!this.studyArea.features)
                    return;
                var lat = this.studyArea.lat;
                var lng = this.studyArea.lng;
                var rcode = this.studyArea.rcode;
                var workspaceID = this.studyArea.workspaceID;
                this.studyArea.features.forEach(function (item) {
                    _this.geojson[item.name] = {
                        data: item.feature
                    };
                    //do layer styling or labelling here
                    if (item.name == 'globalwatershed') {
                        _this.geojson[item.name].style = {
                            fillColor: "yellow",
                            weight: 2,
                            opacity: 1,
                            color: 'white',
                            fillOpacity: 0.5
                        };
                    }
                    else if (item.name == 'globalwatershedpoint') {
                        _this.geojson[item.name].onEachFeature = function (feature, layer) {
                            var popupContent = '<strong>Latitude: </strong>' + lat + '</br><strong>Longitude: </strong>' + lng + '</br><strong>Region: </strong>' + rcode + '</br><strong>WorkspaceID: </strong>' + workspaceID + '</br>';
                            angular.forEach(feature.properties, function (value, key) {
                                popupContent += '<strong>' + key + ': </strong>' + value + '</br>';
                            });
                            layer.bindPopup(popupContent);
                        };
                    }
                });
                //clear out this.markers
                this.markers = {};
                //console.log(JSON.stringify(this.geojson));    
                var bbox = this.geojson['globalwatershed'].data.features[0].bbox;
                console.log(bbox);
                this.leafletData.getMap().then(function (map) {
                    map.fitBounds([[bbox[1], bbox[0]], [bbox[3], bbox[2]]]);
                });
            };
            //Helper Methods
            //-+-+-+-+-+-+-+-+-+-+-+-
            MainController.prototype.initMap = function () {
                //init map
                this.center = new Center(39, -100, 4);
                this.layers = {
                    baselayers: configuration.basemaps,
                    overlays: configuration.overlayedLayers,
                    markers: this.markers,
                    geojson: this.geojson
                };
                this.markers = {};
                this.geojson = {};
                //L.Icon.Default.imagePath = './images';
            };
            //Constructor
            //-+-+-+-+-+-+-+-+-+-+-+-
            MainController.$inject = ['$scope', '$filter', 'StreamStats.Services.ResourceService', 'leafletBoundsHelpers', 'leafletData'];
            return MainController;
        })(); //end class
        angular.module('StreamStats.Controllers').controller('StreamStats.Controllers.MainController', MainController);
    })(Controllers = StreamStats.Controllers || (StreamStats.Controllers = {}));
})(StreamStats || (StreamStats = {})); //end module
//# sourceMappingURL=MainController.js.map