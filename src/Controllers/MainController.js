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
                this.selectedUri = new StreamStats.Models.URI('');
                this.waitCursor = false;
                this.sideBarCollapsed = false;
                this.applicationURL = configuration.baseurls['application'];
                this.servicesBaseURL = configuration.baseurls['services'];
                this._onSelectedResourceHandler = new WiM.Event.EventHandler(function () {
                    //clear selectedUri on resource change
                    _this.selectedUri = new StreamStats.Models.URI('');
                    _this.selectedResource = Resource.SelectedResource;
                });
                Resource.onResourceChanged.subscribe(this._onSelectedResourceHandler);
                this._onSelectedUriHandler = new WiM.Event.EventHandler(function () {
                    _this.selectedUri = Resource.SelectedUri;
                    _this.requestResults = "";
                });
                Resource.onUriChanged.subscribe(this._onSelectedUriHandler);
                //MAP STUFF
                //-+-+-+-+-+-+-+-+-+-+-+-
                this.initMap();
                this.leafletData = leafletData;
                this.showOnMap = false;
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
                $scope.$on('leafletDirectiveMap.zoomend', function (event, args) {
                    //console.log('map zoom changed', args.leafletEvent.target._animateToZoom, 15, this.cursorStyle);
                    (args.leafletEvent.target._animateToZoom > 13) ? _this.cursorStyle = 'crosshair' : _this.cursorStyle = 'hand';
                });
                $scope.$watch(function () { return _this.selectedUri.selectedMedia; }, function (newVal, oldVal) {
                    _this.makeRequestURL();
                });
                $scope.$watch(function () { return _this.selectedUri.parameters; }, function (newVal, oldVal) {
                    _this.makeRequestURL();
                    if (_this.selectedUri.id == 'Watershed By Location') {
                        for (var key in _this.selectedUri.parameters) {
                            //if oldval doesnt exists were on first page load
                            if (_this.selectedUri.parameters[key].name == "rcode") {
                                //if there isn't a study area
                                if (!_this.studyArea) {
                                    console.log('first page load');
                                    _this.studyArea = new studyArea(_this.selectedUri.parameters[key].value);
                                    _this.changeMapRegion(_this.selectedUri.parameters[key].value);
                                }
                                else if (_this.studyArea.rcode != _this.selectedUri.parameters[key].value) {
                                    console.log('rcode changed');
                                    _this.studyArea = new studyArea(newVal[key].value);
                                    _this.changeMapRegion(newVal[key].value);
                                }
                            }
                        }
                    }
                }, true);
            }
            //Methods
            //-+-+-+-+-+-+-+-+-+-+-+-
            MainController.prototype.loadResponse = function () {
                var _this = this;
                this.waitCursor = true;
                this.showOnMap = false;
                this.requestResults = '';
                this.Resource.getURL(this.selectedUri.newURL, this.selectedMedia).then(function (response) {
                    _this.requestResults = response.data;
                }, function (error) {
                    _this.requestResults = "(" + error.status + ") " + error.data;
                }).finally(function () {
                    _this.waitCursor = false;
                    _this.showOnMap = true;
                });
            };
            MainController.prototype.makeRequestURL = function () {
                console.log('in makeRequest URL function');
                var inputParams = [this.selectedUri.selectedMedia];
                for (var i = 0; i < this.selectedUri.parameters.length; i++) {
                    inputParams.push(this.selectedUri.parameters[i].value);
                }
                var func = this.selectedUri.uri.format;
                var newURL = func.apply(this.selectedUri.uri, inputParams);
                this.selectedUri.newURL = newURL;
                return newURL.replace(/\{(.+?)\}/g, "");
            };
            //MAP STUFF
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
            MainController.prototype.showResponseOnMap = function () {
                var _this = this;
                this.studyArea.features = this.requestResults.hasOwnProperty("featurecollection") ? this.requestResults["featurecollection"] : null;
                this.studyArea.workspaceID = this.requestResults.hasOwnProperty("workspaceID") ? this.requestResults["workspaceID"] : null;
                //clear out this.markers
                this.markers = {};
                this.geojson = {};
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
                var bbox = this.geojson['globalwatershed'].data.features[0].bbox;
                console.log(bbox);
                this.leafletData.getMap().then(function (map) {
                    map.fitBounds([[bbox[1], bbox[0]], [bbox[3], bbox[2]]]);
                });
            };
            MainController.prototype.initMap = function () {
                this.center = new Center(39, -100, 4);
                this.layers = {
                    baselayers: configuration.basemaps,
                    overlays: configuration.overlayedLayers,
                    markers: this.markers,
                    geojson: this.geojson
                };
                this.markers = {};
                this.geojson = {};
                L.Icon.Default.imagePath = 'images';
            };
            //Helper Methods
            //-+-+-+-+-+-+-+-+-+-+-+-
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