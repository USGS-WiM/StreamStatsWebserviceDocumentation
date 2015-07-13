﻿var configuration = {}
configuration.baseurls =
{
    'services': 'http://ssdev.cr.usgs.gov/streamstatsservices',
    'application': 'http://ssdev.cr.usgs.gov/v3_beta/'
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
                            { "name": "src", "type": "string", "description": "ESPSG spatial reference code.", "value": "4326" },
                            { "name": "includeparameters", "type": "string", "optional": true, "description": "Comma separated list of region parameters to compute. Default: true, will return all parameters for region", "value": "false" },
                            { "name": "includeflowtypes", "type": "string", "optional": true, "description": "Not yet implemented", "value": "false" },
                            { "name": "includefeatures", "type": "string", "optional": true, "description": "Comma separated list of features to include in response. See Feature resource for more information. Default: true, returns delineated basin and pourpoint", "value": "true" },
                            { "name": "simplify", "type": "boolean", "optional": true, "description": "Whether to simplify returned result, defaut: true.", "value": "true" }],
                        "availableMedia": [".xml", ".json", ".geojson"],
                        "selectedMedia": ".geojson"
                    },
                    {
                        "uri": "/watershed{0}?rcode={1}&workspaceID={2}&includeparameters={3}&includeflowtypes={4}&includefeatures={5}&simplify={6}",
                        "description": "This service returns a watershed",
                        "id": "Watershed By Workspace",
                        "parameters": [
                           { "name": "rcode", "type": "string", "description": "StreamStats 2-3 character code that identifies the region.", "value": "NY" },
                           { "name": "workspaceID", "type": "string", "description": "Service workspace received from watershed service result", "value": "" },
                            { "name": "includeparameters", "type": "string", "optional": true, "description": "Comma separated list of region parameters to compute. Default: true, will return all parameters for region", "value": "false" },
                            { "name": "includeflowtypes", "type": "string", "optional": true, "description": "Not yet implemented", "value": "false" },
                            { "name": "includefeatures", "type": "string", "optional": true, "description": "Comma separated list of features to include in response. See Feature resource for more information. Default: true, returns delineated basin and pourpoint", "value": "true" },
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
                        "uri": "/features{0}?workspaceID={1}&includefeatures={2}&simplify={3}",
                        "description": "This service returns a collection of spatial features available for the workspace.",
                        "id": "Features",
                        "parameters": [
                            { "name": "workspaceID", "type": "string", "description": "Service workspace received from watershed service result", "value": "" },
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