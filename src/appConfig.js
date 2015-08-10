var configuration = {}
configuration.baseurls =
{
    'services': 'http://ssdev.cr.usgs.gov/streamstatsservices',
    'application': 'http://ssdev.cr.usgs.gov/v3_beta/',
    'StreamStats': 'http://streamstats09.cr.usgs.gov',
}

configuration.queryparams =
{
    'SSdelineation': '/watershed.geojson?rcode={0}&xlocation={1}&ylocation={2}&crs={3}&simplify=true&includeparameters=false&includeflowtypes=false&includefeatures=true',
}
configuration.resources =
    [
        {
            "name": "Watershed",
            "description": "The watershed resource represents a delineated hydrologic study area.",
            "methods": [{
                "type": "GET",
                "uriList": [
                    {
                        "uri": "/watershed{0}?rcode={1}&xlocation={2}&ylocation={3}&crs={4}&includeparameters={5}&includeflowtypes={6}&includefeatures={7}&simplify={8}",
                        "description": "Returns a watershed object. The request configuration will determine the overall request response. However all returns will return a watershed object with at least the workspaceid. The workspace id is the id to the service workspace where files are stored and can be used for further processing such as for downloads and flow statistic computations.",
                        "id": "Watershed By Location",
                        "parameters": [
                            { "name": "rcode", "type": "string", "description": "StreamStats 2-3 character code that identifies the region.", "value": "NY" },
                            { "name": "xlocation", "type": "number", "description": "X location of the most downstream point of desired study area.", "value": -74.524 },
                            { "name": "ylocation", "type": "number", "description": "Y location of the most downstream point of desired study area.", "value": 43.939 },
                            { "name": "crs", "type": "string", "description": "ESPSG spatial reference code.", "value": "4326" },
                            { "name": "includeparameters", "type": "string", "optional": true, "description": "Comma separated list of region parameters to compute. Default: true, will return all parameters for region", "value": "false" },
                            { "name": "includeflowtypes", "type": "string", "optional": true, "description": "Not yet implemented", "value": "false" },
                            { "name": "includefeatures", "type": "string", "optional": true, "description": "Comma separated list of features to include in response. See Feature resource for more information. Default: true, returns delineated basin and pourpoint", "value": "true" },
                            { "name": "simplify", "type": "boolean", "optional": true, "description": "Whether to simplify returned result, defaut: true.", "value": "true" }],
                        "availableMedia": [".xml", ".json", ".geojson"],
                        "selectedMedia": ".geojson"
                    },
                    {
                        "uri": "/watershed{0}?rcode={1}&workspaceID={2}&includeparameters={3}&includeflowtypes={4}&includefeatures={5}&crs={6}&simplify={7}",
                        "description": "This service returns a watershed",
                        "id": "Watershed By Workspace",
                        "parameters": [
                           { "name": "rcode", "type": "string", "description": "StreamStats 2-3 character code that identifies the region.", "value": "NY" },
                           { "name": "workspaceID", "type": "string", "description": "Service workspace received from watershed service result", "value": "" },
                            { "name": "includeparameters", "type": "string", "optional": true, "description": "Comma separated list of region parameters to compute. Default: true, will return all parameters for region", "value": "false" },
                            { "name": "includeflowtypes", "type": "string", "optional": true, "description": "Not yet implemented", "value": "false" },
                            { "name": "includefeatures", "type": "string", "optional": true, "description": "Comma separated list of features to include in response. See Feature resource for more information. Default: true, returns delineated basin and pourpoint", "value": "true" },
                            { "name": "crs", "type": "string", "optional": true, "description": "ESPSG spatial reference code. Default is local projection", "value": "4326" },
                            { "name": "simplify", "type": "boolean", "optional": true, "description": "Whether to simplify returned result, defaut: true.", "value": "true" }],
                        "availableMedia": [".xml", ".json", ".geojson"],
                        "selectedMedia": ".geojson"
                    }
                ]
            }
            ]
        },
        {
            "name": "Parameters",
            "description": "The parameters resource represent a list of characteristics that defines the study area. Such as Drainage Area and mean annual precipitation.",
            "methods": [{
                "type": "GET",
                "uriList": [
                    {
                        "uri": "/parameters{0}?rcode={1}&group={2}",
                        "description": "This service returns a list of parameters available to be computed in the selected region.",
                        "id": "Available Parameters",
                        "parameters": [
                            { "name": "rcode", "type": "string", "description": "StreamStats 2-3 character code that identifies the region.", "value": "NY" },
                            { "name": "group", "type": "string", "optional": true, "description": "Key word parameter group filter.", "value": "NY Set" }],
                        "availableMedia": [".xml", ".json"],
                        "selectedMedia": ".json"
                    },
                    {
                        "uri": "/parameters{0}?rcode={1}&workspaceID={2}&includeparameters={3}",
                        "description": "This service returns the computed values based on the request configuration.",
                        "id": "Compute Parameters",
                        "parameters": [
                           { "name": "rcode", "type": "string", "description": "StreamStats 2-3 character code that identifies the region.", "value": "NY" },
                           { "name": "workspaceID", "type": "string", "description": "Service workspace received from watershed service result", "value": "" },
                           { "name": "includeparameters", "type": "string", "optional": "true", "description": "Comma separated list of region parameter codes to compute. Default: true, will return all parameters for region", "value": "true" }, ],
                        "availableMedia": [".xml", ".json"],
                        "selectedMedia": ".json"
                    }
                ]
            }]
        },
        {
            "name": "Download",
            "description": "Download resource",
            "methods": [{
                "type": "GET",
                "uriList": [
                    {
                        "uri": "/download{0}?workspaceID={1}&format={2}",
                        "description": "This service returns a zip file containing the workspace contents, in either a geodatabase or shape files",
                        "id": "Download By Workspace",
                        "parameters": [
                            { "name": "workspaceID", "type": "string", "description": "Service workspace received from watershed service result", "value": "" },
                            { "name": "format", "type": "string", "optional": true, "description": "Download return format; default (nothing specified) will return an ESRI geodatabase zipfile. Optional input: SHAPE,:will return a zip file containing shape format. ", "value": "" }],
                        "availableMedia": [],
                        "selectedMedia": ""
                    }
                ]
            }]
        },
        {
            "name": "Flow statistics",
            "description": "The Flow statistics resource represent a list of flow statistics computed for the study area.",
            "methods": [{
                "type": "GET",
                "uriList": [
                    {
                        "uri": "/flowstatistics{0}?rcode={1}",
                        "description": "This service returns a list of flowstatistics available to be computed in the selected region.",
                        "id": "Available Flow Statistics",
                        "parameters": [
                            { "name": "rcode", "type": "string", "description": "StreamStats 2-3 character code that identifies the region.", "value": "NY" }],
                        "availableMedia": [".xml", ".json"],
                        "selectedMedia": ".json"
                    },
                    {
                        "uri": "/flowstatistics{0}?rcode={1}&workspaceID={2}&includeflowtypes={3}",
                        "description": "This service returns the computed flow statistic values based on the request configuration",
                        "id": "Compute Flow Statistics",
                        "parameters": [
                            { "name": "rcode", "type": "string", "description": "StreamStats 2-3 character code that identifies the region.", "value": "NY" },
                            { "name": "workspaceID", "type": "string", "description": "Service workspace received from watershed service result", "value": "" },
                            { "name": "includeflowtypes", "type": "string", "optional": true, "description": "Comma separated list of region flow types to compute. Default: true, will return all flow types available for the region region", "value": "true" }],
                        "availableMedia": [".json"],
                        "selectedMedia": ".json"
                    }
                ]
            }]
        },
        {
            "name": "Features",
            "description": "The Features resource represents a list of spatial features computed for the study area.",
            "methods": [{
                "type": "GET",
                "uriList": [
                    {
                        "uri": "/features{0}?workspaceID={1}",
                        "description": "This service returns a collection of spatial feature names available for the workspace.",
                        "id": "Available Features",
                        "parameters": [
                            { "name": "workspaceID", "type": "string", "description": "Service workspace received from watershed service result", "value": "" }],
                        "availableMedia": [".xml", ".json"],
                        "selectedMedia": ".json"
                    },
                    {
                        "uri": "/features{0}?workspaceID={1}&crs={2}&includefeatures={3}&simplify={4}",
                        "description": "This service returns a collection of spatial features available for the workspace.",
                        "id": "Features",
                        "parameters": [
                            { "name": "workspaceID", "type": "string", "description": "Service workspace received from watershed service result", "value": "" },
                            { "name": "crs", "type": "string", "optional": true, "description": "ESPSG spatial reference code. Default is local projection", "value": "4326" },
                            { "name": "includefeatures", "type": "string", "description": "Comma separated list of feature names to include in response.", "value": "pourpoint,delineatedbasin" },
                            { "name": "simplify", "type": "boolean", "optional": true, "description": "Whether to simplify returned result, defaut: true.", "value": "true" }],
                        "availableMedia": [".xml", ".json", ".geojson"],
                        "selectedMedia": ".geojson"
                    }
                ]
            }]
        },
        {
            "name": "Network navigation",
            "description": "!!!Not yet fully implemented!!!",
            //"methods": [{
            //    "type": "GET",
            //    "uriList": [
            //        {
            //            "uri": "/networkpath{0}?rcode={1}&spoint={2}epoint={3}&workspaceID={4}",
            //            "description": "This service returns a watershed",
            //            "id": "nn0",
            //            "parameters": [
            //                { "name": "regioncode", "type": "string", "description": "", "value": "" },
            //                { "name": "startpoint", "type": "string", "description": "", "value": "" },
            //                { "name": "endpoint", "type": "string", "description": "", "value": "" },
            //                { "name": "workspaceID", "type": "string", "optional": true, "description": "", "value": "" }],
            //            "availableMedia": "xml, json, geojson"
            //        }
            //    ]
            //}]
        }
    ]
configuration.basemaps =
{
    "mapquestOSM": {
        "name": "Mapquest Streets",
        "url": "http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png",
        "visible": false,
        "type": 'xyz',
        "layerOptions": {
            "maxZoom": 19,
            "subdomains": ['otile1', 'otile2', 'otile3', 'otile4'],
            "attribution": "Tiles courtesy of <a href='http://www.mapquest.com/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png'>. Map data (c) <a href='http://www.openstreetmap.org/' target='_blank'>OpenStreetMap</a> contributors, CC-BY-SA."
        }
    }
}// end baselayer
configuration.overlayedLayers = {
    "SSLayer": {
        "name": "Implementated Regions",
        "url": configuration.baseurls['StreamStats'] + "/arcgis/rest/services/ss_studyAreas_prod/MapServer",
        "type": 'agsDynamic',
        "visible": true,
        "layerOptions": {
            "opacity": 0.5
        }
    }   
}//end overlayedLayers
configuration.regions = [
    { "RegionID": "AL", "Name": "Alabama", "Bounds": [[30.189622, -88.47203], [35.00888, -84.893486]] },
    { "RegionID": "AK", "Name": "Alaska", "Bounds": [[51, -179], [72, -140]] },
    { "RegionID": "AS", "Name": "American Samoa", "Bounds": [[-14.375555, -170.82611], [-14.166389, -169.438323]] },
    { "RegionID": "AZ", "Name": "Arizona", "Bounds": [[31.329174, -114.815414], [37.004585, -109.044883]] },
    { "RegionID": "AR", "Name": "Arkansas", "Bounds": [[33.004528, -94.618156], [36.499656, -89.644409]] },
    { "RegionID": "CA", "Name": "California", "Bounds": [[32.530426, -124.411186], [42.009826, -114.129486]] },
    { "RegionID": "CO", "Name": "Colorado", "Bounds": [[36.992225, -109.060806], [41.005611, -102.041984]] },
    { "RegionID": "CT", "Name": "Connecticut", "Bounds": [[40.982486, -73.729721], [42.049732, -71.788238]] },
    { "RegionID": "DE", "Name": "Delaware", "Bounds": [[38.449325, -75.788055], [39.840576, -75.042396]] },
    { "RegionID": "DC", "Name": "District of Columbia", "Bounds": [[38.801475, -77.120506], [38.995063, -76.909698]] },
    { "RegionID": "FL", "Name": "Florida", "Bounds": [[24.518321, -87.637229], [31.002105, -80.029022]] },
    { "RegionID": "GA", "Name": "Georgia", "Bounds": [[30.35713, -85.605514], [35.002037, -80.841957]] },
    { "RegionID": "GU", "Name": "Guam", "Bounds": [[13.234996, 144.634155], [13.65361, 144.953308]] },
    { "RegionID": "HA", "Name": "Hawaii", "Bounds": [[18.915493, -160.236068], [22.234394, -154.798583]] },
    { "RegionID": "ID", "Name": "Idaho", "Bounds": [[41.989837, -117.240196], [49.001522, -111.043617]] },
    { "RegionID": "IL", "Name": "Illinois", "Bounds": [[36.971115, -91.512626], [42.509479, -87.018081]] },
    { "RegionID": "IN", "Name": "Indiana", "Bounds": [[37.773048, -88.089744], [41.762321, -84.787673]] },
    { "RegionID": "IA", "Name": "Iowa", "Bounds": [[40.374542, -96.635665], [43.504646, -90.139312]] },
    { "RegionID": "KS", "Name": "Kansas", "Bounds": [[36.992221, -102.048553], [40.004512, -94.592735]] },
    { "RegionID": "KY", "Name": "Kentucky", "Bounds": [[36.496719, -89.573677], [39.147232, -81.964202]] },
    { "RegionID": "LA", "Name": "Louisiana", "Bounds": [[28.918104, -94.045776], [33.020599, -88.814056]] },
    { "RegionID": "ME", "Name": "Maine", "Bounds": [[43.064773, -71.082], [47.461883, -66.954002]] },
    { "RegionID": "MD", "Name": "Maryland", "Bounds": [[37.911422, -79.487152], [39.724014, -75.045898]] },
    { "RegionID": "MA", "Name": "Massachusetts", "Bounds": [[41.237003, -73.508407], [42.886661, -69.925399]] },
    { "RegionID": "MI", "Name": "Michigan", "Bounds": [[41.6958, -90.418708], [48.304248, -82.122901]] },
    { "RegionID": "MN", "Name": "Minnesota", "Bounds": [[43.502101, -97.238975], [49.38562, -89.487754]] },
    { "RegionID": "MS", "Name": "Mississippi", "Bounds": [[30.174402, -91.654251], [34.998321, -88.097961]] },
    { "RegionID": "MO", "Name": "Missouri", "Bounds": [[35.99509, -95.774414], [40.614028, -89.100593]] },
    { "RegionID": "MT", "Name": "Montana", "Bounds": [[44.357688, -116.050735], [49.001808, -104.03971]] },
    { "RegionID": "NE", "Name": "Nebraska", "Bounds": [[39.999885, -104.052841], [43.002796, -95.307998]] },
    { "RegionID": "NV", "Name": "Nevada", "Bounds": [[35.002079, -120.005348], [42.000312, -114.039344]] },
    { "RegionID": "NH", "Name": "New Hampshire", "Bounds": [[42.697776, -72.556434], [45.308731, -70.7135]] },
    { "RegionID": "NJ", "Name": "New Jersey", "Bounds": [[38.92564, -75.567596], [41.357639, -73.89363]] },
    { "RegionID": "NM", "Name": "New Mexico", "Bounds": [[31.331899, -109.050102], [36.999423, -103.000656]] },
    { "RegionID": "NY", "Name": "New York", "Bounds": [[40.499076, -79.763328], [45.017364, -71.85588]] },
    { "RegionID": "NC", "Name": "North Carolina", "Bounds": [[33.844467, -84.320968], [36.589008, -75.459503]] },
    { "RegionID": "ND", "Name": "North Dakota", "Bounds": [[45.93505, -104.049591], [49.001316, -96.555152]] },
    { "RegionID": "MP", "Name": "Northern Mariana Islands", "Bounds": [[14.105276, 144.89859], [20.556385, 145.870788]] },
    { "RegionID": "OH", "Name": "Ohio", "Bounds": [[38.4025, -84.819931], [42.324424, -80.51387]] },
    { "RegionID": "OK", "Name": "Oklahoma", "Bounds": [[33.615253, -103.000869], [37.00093, -94.430702]] },
    { "RegionID": "OR", "Name": "Oregon", "Bounds": [[41.992462, -124.566024], [46.285762, -116.461639]] },
    { "RegionID": "PA", "Name": "Pennsylvania", "Bounds": [[39.719429, -80.519561], [42.510452, -74.690032]] },
    { "RegionID": "PR", "Name": "Puerto Rico", "Bounds": [[17.922222, -67.938339], [18.519443, -65.241958]] },
    { "RegionID": "RI", "Name": "Rhode Island", "Bounds": [[41.144325, -71.888366], [42.0191, -71.120613]] },
    { "RegionID": "SC", "Name": "South Carolina", "Bounds": [[32.049209, -83.354354], [35.21611, -78.55368]] },
    { "RegionID": "SD", "Name": "South Dakota", "Bounds": [[42.481113, -104.057128], [45.944362, -96.436576]] },
    { "RegionID": "TN", "Name": "Tennessee", "Bounds": [[34.983898, -90.310745], [36.679244, -81.647453]] },
    { "RegionID": "TX", "Name": "Texas", "Bounds": [[25.83802, -106.645782], [36.50344, -93.508743]] },
    { "RegionID": "UT", "Name": "Utah", "Bounds": [[36.99863, -114.054069], [42.004196, -109.040946]] },
    { "RegionID": "VT", "Name": "Vermont", "Bounds": [[42.727611, -73.443428], [45.016334, -71.467712]] },
    { "RegionID": "VA", "Name": "Virginia", "Bounds": [[36.539142, -83.674819], [39.466579, -75.240722]] },
    { "RegionID": "VI", "Name": "Virgin Islands", "Bounds": [[17.676666, -65.026947], [18.377777, -64.560287]] },
    { "RegionID": "WA", "Name": "Washington", "Bounds": [[45.553112, -124.75579], [49.00362, -116.912506]] },
    { "RegionID": "WV", "Name": "West Virginia", "Bounds": [[37.202762, -82.640777], [40.638553, -77.719734]] },
    { "RegionID": "WI", "Name": "Wisconsin", "Bounds": [[42.494701, -92.885391], [47.302532, -86.249565]] },
    { "RegionID": "WY", "Name": "Wyoming", "Bounds": [[40.996269, -111.055137], [45.004203, -104.051986]] },
    { "RegionID": "CRB", "Name": "Connecticut River Basin", "Bounds": [[43, -70.5], [44, -74.5]] },
    { "RegionID": "DRB", "Name": "Delaware River Basin", "Bounds": [[38.5, -73], [42.5, -77]] },
    { "RegionID": "RRB", "Name": "Rainy River Basin", "Bounds": [[47.3, -89.5], [50, -96]] }

]//end regions