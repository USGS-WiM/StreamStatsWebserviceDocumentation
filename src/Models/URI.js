//------------------------------------------------------------------------------
//----- URI ---------------------------------------------------------------
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
        var URI = (function () {
            function URI(u) {
                this.uri = u;
                this.parameters = [];
            }
            return URI;
        }()); //end class
        Models.URI = URI;
    })(Models = StreamStats.Models || (StreamStats.Models = {}));
})(StreamStats || (StreamStats = {})); //end module   
//# sourceMappingURL=URI.js.map