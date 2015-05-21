//Filters
angular.module('StreamStats').filter('makeURL', function () {
    return function (input) {
        if (input) {
            console.log('in makeURL filter');
            var inputParams = [input.selectedMedia];
            for (var i = 0; i < input.parameters.length; i++) {
                inputParams.push(input.parameters[i].value);
            }
            var func = input.uri.format;
            var newURL = func.apply(input.uri, inputParams);
            return newURL;
        }
    };
});
angular.module('StreamStats').filter('prettyJson', [function () {
    return function (obj, pretty) {
        if (!obj) {
            return '';
        }
        var json = angular.toJson(obj, pretty);
        if (!pretty) {
            return json;
        }
        return json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls;
            if (/^"/.test(match)) {
                cls = /:$/.test(match) ? 'key' : 'string';
            }
            else if (/true|false/.test(match)) {
                cls = 'boolean';
            }
            else if (/null/.test(match)) {
                cls = 'null';
            }
            else {
                cls = 'number';
            }
            return '<span class="json-' + cls + '">' + match + '</span>';
        });
    };
}]);
//# sourceMappingURL=Filters.js.map