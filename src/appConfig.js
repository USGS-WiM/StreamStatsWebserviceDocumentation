var configuration = {}
configuration.baseurls =
{
    'StreamStats': 'http://ssdev.cr.usgs.gov/servicesTest'
}
configuration.resources=
    [
        {
            "name": "Watershed",
            "description": "This is the watershed resource",
            "methods": [{
                "type": "GET",
                "uriList": [
                    {
                        "uri": "/watershed.{0}?state={1}&xlocation={2}&ylocation={3}&wkid={4}&simplifyid={5}&includeparameters={6}&includeflowtypes={7}&includegeometry={8}",
                        "description":"This service returns a watershed",
                        "id":"gw0",
                        "parameters": [
                            { "name": "regioncode", "type": "string", "description": "Region code", "value":"NY" },
                            { "name": "x", "type": "number", "description": "X coordinate", "value": -74.524 },
                            { "name": "y", "type": "number", "description": "Y coordinate", "value": 43.939 },
                            { "name": "espg", "type": "string", "description": "Spatial reference", "value": "4326" },
                            { "name": "simplificationOption", "type": "number", "optional": true, "description": "Simplify geometry", "value": false },
                            { "name": "parameterList", "type": "string", "optional": true, "description": "List of parameters", "value": true },
                            { "name": "flowtypeList", "type": "string", "optional": true, "description": "List of flow types", "value": false },
                            { "name": "includegeometry", "type": "boolean", "optional": true, "description": "Include geometry", "value": true }],
                        "availableMedia": ["xml", "json", "geojson"],
                        "selectedMedia": "geojson"
                        //{ "name": "XML format", "type": "xml"},
                        //{ "name": "JSON format", "type": "json"},
                        //{ "name": "geoJSON format", "type": "geojson" }]
                    }//,
                    //{
                    //    "uri": "/watershed?rcode={regioncode}&workspaceID={workspaceID}&simplifyid={simplificationOption}&includeparameters={parameterList}&includeflowtypes={flowtypeList}&includegeometry={boolean}",
                    //    "description":"This service returns a watershed",
                    //    "parameters": [
                    //       { "name": "regioncode", "type": "string", "description": "", "value":"" },
                    //       { "name": "workspaceID", "type": "string", "description": "", "value":"" },
                    //       { "name": "simplificationOption", "type": "number", "optional": true, "description": "", "value":"" },
                    //       { "name": "parameterList", "type": "string", "optional": true, "description": "", "value":"" },
                    //       { "name": "flowtypeList", "type": "string", "optional": true, "description": "", "value":"" },
                    //       { "name": "boolean", "type": "boolean", "optional": true, "description": "", "value":"" }],
                    //    "availableMedia": "xml, json, geojson"
                    //}
                ]
            }
            ]
        },
        {
            "name": "Parameters",
            "description": "This is the parameters resource",
            "methods": [{
                "type": "GET",
                "uriList": [
                    {
                        "uri": "/parameters?rcode={regioncode}&group={group}",
                        "description": "This service returns a watershed",
                        "id": "pm0",
                        "parameters": [
                            { "name": "regioncode", "type": "string", "description": "", "value": "" },
                            { "name": "group", "type": "string", "optional": true, "description": "", "value": "" }],
                        "availableMedia": "xml, json"
                    },
                    {
                        "uri": "/parameters?rcode={regioncode}&workspaceID={workspaceID}&includeparameters={parameterList}",
                        "description": "This service returns a watershed",
                        "id": "pm1",
                        "parameters": [
                           { "name": "regioncode", "type": "string", "description": "", "value": "" },
                           { "name": "workspaceID", "type": "string", "description": "", "value": "" },
                           { "name": "simplificationOption", "type": "number", "description": "", "value": "" },
                           { "name": "parameterList", "type": "string", "description": "", "value": "" }],
                        "availableMedia": "xml, json"
                    }
                ]
            }]
        },
        {
            "name": "Download",
            "description": "This is the download resource",
            "methods": [{
                "type": "GET",
                "uriList": [
                    {
                        "uri": "/download?workspaceID={workspaceID}&format={f}",
                        "description": "This service returns a watershed",
                        "id": "dl0",
                        "parameters": [
                            { "name": "workspaceID", "type": "string", "description": "", "value": "" },
                            { "name": "f", "type": "string", "optional": true, "description": "", "value": "" }],
                        "availableMedia": "zip file"
                    }
                ]
            }]
        },
        {
            "name": "Flow statistics",
            "description": "This is the Flow Statistics resource",
            "methods": [{
                "type": "GET",
                "uriList": [
                    {
                        "uri": "/flowstatistics?rcode={regioncode}&workspaceID={workspaceID}&includeflowtypes={flowtypeList}",
                        "description": "This service returns a watershed",
                        "id": "fs0",
                        "parameters": [
                            { "name": "regioncode", "type": "string", "description": "", "value": "" },
                            { "name": "workspaceID", "type": "string", "description": "", "value": "" },
                            { "name": "flowtypeList", "type": "string", "optional": true, "description": "", "value": "" }],
                        "availableMedia": "xml, json"
                    }
                ]
            }]
        },
        {
            "name": "Network navigation",
            "description": "This is the Network Navigation resource",
            "methods": [{
                "type": "GET",
                "uriList": [
                    {
                        "uri": "/networkpath?rcode={regioncode}&spoint={startpoint}epoint={endpoint}&workspaceID={workspaceID}",
                        "description": "This service returns a watershed",
                        "id": "nn0",
                        "parameters": [
                            { "name": "regioncode", "type": "string", "description": "", "value": "" },
                            { "name": "startpoint", "type": "string", "description": "", "value": "" },
                            { "name": "endpoint", "type": "string", "description": "", "value": "" },
                            { "name": "workspaceID", "type": "string", "optional": true, "description": "", "value": "" }],
                        "availableMedia": "xml, json, geojson"
                    }
                ]
            }]
        }
    ]