var configuration = {}
configuration.baseurls =
{
    'StreamStats': 'http://ssdev.cr.usgs.gov'
}
configuration.resources=
    [
        {
            "name": "watershed",
            "methods": [{
                "type": "GET",
                "uriList": [
                    {
                        "uri": "/watershed?rcode={regioncode}&xlocation={X}&ylocation={Y}&crs={espg}&simplifyid={simplificationOption}&includeparameters={parameterList}&includeflowtypes={flowtypeList}&includegeometry={boolean}",
                        "id":"gw0",
                        "parameters": [
                            { "name": "regioncode", "type": "string", "description": "" },
                            { "name": "x", "type": "number", "description":"" },
                            { "name": "y", "type": "number", "description": "" },
                            { "name": "espg", "type": "string", "description": "" },
                            { "name": "simplificationOption", "type": "number", "optional": true, "description": "" },
                            { "name": "parameterList", "type": "string", "optional": true, "description": "" },
                            { "name": "flowtypeList", "type": "string", "optional": true, "description": "" },
                            { "name": "boolean", "type": "boolean", "optional": true, "description": "" }],
                        "availableMedia":"xml, json, geojson"
                    }//,
                    //{
                    //    "uri": "/watershed?rcode={regioncode}&workspaceID={workspaceID}&simplifyid={simplificationOption}&includeparameters={parameterList}&includeflowtypes={flowtypeList}&includegeometry={boolean}",
                    //    "parameters": [
                    //       { "name": "regioncode", "type": "string", "description": "" },
                    //       { "name": "workspaceID", "type": "string", "description": "" },
                    //       { "name": "simplificationOption", "type": "number", "optional": true, "description": "" },
                    //       { "name": "parameterList", "type": "string", "optional": true, "description": "" },
                    //       { "name": "flowtypeList", "type": "string", "optional": true, "description": "" },
                    //       { "name": "boolean", "type": "boolean", "optional": true, "description": "" }],
                    //    "availableMedia": "xml, json, geojson"
                    //}
                ]
            }
            ]
        },
        {
            "name": "parameters",
            "methods": [{
                "type": "GET",
                "uriList": [
                    {
                        "uri": "/parameters?rcode={regioncode}&group={group}",
                        "id": "pm0",
                        "parameters": [
                            { "name": "regioncode", "type": "string", "description": "" },
                            { "name": "group", "type": "string", "optional":true, "description": "" }],
                        "availableMedia": "xml, json"
                    },
                    {
                        "uri": "/parameters?rcode={regioncode}&workspaceID={workspaceID}&includeparameters={parameterList}",
                        "id": "pm1",
                        "parameters": [
                           { "name": "regioncode", "type": "string", "description": "" },
                           { "name": "workspaceID", "type": "string", "description": "" },
                           { "name": "simplificationOption", "type": "number", "description": "" },
                           { "name": "parameterList", "type": "string", "description": "" }],
                        "availableMedia": "xml, json"
                    }
                ]
            }]
        },
        {
            "name": "download",
            "methods": [{
                "type": "GET",
                "uriList": [
                    {
                        "uri": "/download?workspaceID={workspaceID}&format={f}",
                        "id": "dl0",
                        "parameters": [
                            { "name": "workspaceID", "type": "string", "description": "" },
                            { "name": "f", "type": "string", "optional": true, "description": "" }],
                        "availableMedia": "zip file"
                    }
                ]
            }]
        },
        {
            "name": "flow statistics",
            "methods": [{
                "type": "GET",
                "uriList": [
                    {
                        "uri": "/flowstatistics?rcode={regioncode}&workspaceID={workspaceID}&includeflowtypes={flowtypeList}",
                        "id": "fs0",
                        "parameters": [
                            { "name": "regioncode", "type": "string", "description": "" },
                            { "name": "workspaceID", "type": "string", "description": "" },
                            { "name": "flowtypeList", "type": "string", "optional": true, "description": "" }],
                        "availableMedia": "xml, json"
                    }
                ]
            }]
        },
        {
            "name": "network navigation",
            "methods": [{
                "type": "GET",
                "uriList": [
                    {
                        "uri": "/networkpath?rcode={regioncode}&spoint={startpoint}epoint={endpoint}&workspaceID={workspaceID}",
                        "id": "nn0",
                        "parameters": [
                            { "name": "regioncode", "type": "string", "description": "" },
                            { "name": "startpoint", "type": "string", "description": "" },
                            { "name": "endpoint", "type": "string", "description": "" },
                            { "name": "workspaceID", "type": "string","optional":true, "description": "" }],
                        "availableMedia": "xml, json, geojson"
                    }
                ]
            }]
        }

    ]//end resources