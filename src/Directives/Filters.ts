//Filters
angular.module('StreamStats')
    .filter('makeURL', function () {
    return function (input:StreamStats.Models.IURI) {
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