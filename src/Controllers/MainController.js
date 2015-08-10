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
            function studyArea(rcode) {
                this.rcode = rcode;
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
                    console.log('map zoom changed', args.leafletEvent.target._animateToZoom, 15);
                    (args.leafletEvent.target._animateToZoom >= 15) ? _this.cursorStyle = 'crosshair' : _this.cursorStyle = 'hand';
                });
                //check for map load
                $scope.$on('leafletDirectiveMap.load', function (event, args) {
                    console.log('map loaded');
                });
                //watch for changes to rcode only
                $scope.$watch(function () { return _this.selectedUri.parameters; }, function (newVal, oldVal) {
                    //make sure we are on the right uri
                    if (_this.selectedUri.id == 'Watershed By Location') {
                        for (var key in _this.selectedUri.parameters) {
                            //make sure there is a value
                            if (_this.selectedUri.parameters.hasOwnProperty(key)) {
                                //if oldval doesnt exists were on first page load
                                if (oldVal.length == 0) {
                                    console.log('first page load');
                                    _this.studyArea = new studyArea(newVal[0].value);
                                    //do something here
                                    _this.leafletData.getMap().then(function (map) {
                                        console.log('getting the map for fitbounds');
                                        for (var index in configuration.regions) {
                                            var value = configuration.regions[index];
                                            if (value.RegionID == newVal[0].value.toUpperCase()) {
                                                console.log('match found', value.RegionID + "_region", value.Bounds);
                                                map.fitBounds(value.Bounds);
                                                _this.layers.overlays[value.RegionID + "_region"] = new Layer(value.RegionID + " Region", configuration.baseurls['StreamStats'] + "/arcgis/rest/services/{0}_ss/MapServer".format(value.RegionID.toLowerCase()), "agsDynamic", true, { "opacity": 0.5 });
                                            }
                                        }
                                    });
                                    return;
                                }
                                if ((_this.selectedUri.parameters[key].name == "rcode") && (newVal[key].value != oldVal[key].value)) {
                                    console.log(newVal[key].value);
                                }
                            }
                        }
                    }
                }, true);
                this.leafletData = leafletData;
                this.waitCursor = false;
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
            MainController.prototype.startDelineate = function () {
                var _this = this;
                //this.canUpdate = false;
                var url = configuration.queryparams['SSdelineation'].format(this.studyArea.rcode, this.studyArea.lng.toString(), this.studyArea.lat.toString(), "4326", false);
                //var request: WiM.Services.Helpers.RequestInfo = new WiM.Services.Helpers.RequestInfo(url);
                this.Resource.getURL(url, "JSON").then(function (response) {
                    _this.studyArea.features = response.data.hasOwnProperty("featurecollection") ? response.data["featurecollection"] : null;
                    _this.studyArea.workspaceID = response.data.hasOwnProperty("workspaceID") ? response.data["workspaceID"] : null;
                    //sm when complete
                }, function (error) {
                    //sm when error
                }).finally(function () {
                    _this.onSelectedStudyAreaChanged();
                    //this.canUpdate = true;
                    //this._onSelectedStudyAreaChanged.raise(null, WiM.Event.EventArgs.Empty);
                });
            };
            MainController.prototype.onSelectedStudyAreaChanged = function () {
                var _this = this;
                console.log('features returned: ', this.studyArea.features);
                if (!this.studyArea.features)
                    return;
                this.studyArea.features.forEach(function (item) {
                    _this.geojson[item.name] = {
                        data: item.feature
                    };
                    //do layer styling or labelling here
                    if (item.name == 'delineatedbasin(simplified)') {
                        _this.geojson[item.name].style = {
                            fillColor: "yellow",
                            weight: 2,
                            opacity: 1,
                            color: 'white',
                            fillOpacity: 0.5
                        };
                    }
                    else if (item.name == 'pourpoint') {
                        _this.geojson[item.name].onEachFeature = function (feature, layer) {
                            var popupContent = '';
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
                L.Icon.Default.imagePath = '../../images';
            };
            MainController.prototype.removeOverlayLayers = function (name, isPartial) {
                var _this = this;
                if (isPartial === void 0) { isPartial = false; }
                var layeridList;
                layeridList = this.getLayerIdsByID(name, this.layers.overlays, isPartial);
                layeridList.forEach(function (item) {
                    delete _this.layers.overlays[item];
                });
            };
            MainController.prototype.getLayerIdsByID = function (id, layerObj, isPartial) {
                var layeridList = [];
                for (var variable in layerObj) {
                    if (isPartial ? (variable.indexOf(id) > -1) : (variable === id)) {
                        layeridList.push(variable);
                    }
                }
                return layeridList;
            };
            MainController.prototype.sm = function (msg) {
                try {
                }
                catch (e) {
                }
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