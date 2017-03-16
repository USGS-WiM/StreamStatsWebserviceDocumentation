//------------------------------------------------------------------------------
//----- URIParameter -----------------------------------------------------------
//------------------------------------------------------------------------------
//-------1---------2---------3---------4---------5---------6---------7---------8
//       01234567890123456789012345678901234567890123456789012345678901234567890
//-------+---------+---------+---------+---------+---------+---------+---------+
// copyright:   2015 WiM - USGS
//    authors:  Jeremy K. Newson USGS Web Informatics and Mapping
//             
// 
//   purpose:  
//          
//discussion:
//
//Comments
//08.20.2014 jkn - Created
//Imports"
// Interface
var StreamStats;
(function (StreamStats) {
    var Models;
    (function (Models) {
        var URIParameter = (function () {
            function URIParameter(p, v, d, r) {
                if (r === void 0) { r = false; }
                this.name = p;
                this.value = v;
                this.description = d;
                this.optional = r;
            }
            return URIParameter;
        }()); //end class
        Models.URIParameter = URIParameter;
    })(Models = StreamStats.Models || (StreamStats.Models = {}));
})(StreamStats || (StreamStats = {})); //end module 
//# sourceMappingURL=URIParameter.js.map