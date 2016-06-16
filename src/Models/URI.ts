//------------------------------------------------------------------------------
//----- URI ---------------------------------------------------------------
//------------------------------------------------------------------------------

//-------1---------2---------3---------4---------5---------6---------7---------8
//       01234567890123456789012345678901234567890123456789012345678901234567890
//-------+---------+---------+---------+---------+---------+---------+---------+

// copyright:   2015 WiM - USGS

//    authors:  Jeremy K. Newson USGS Wisconsin Internet Mapping
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
module StreamStats.Models {
    export interface IBody {
        description: string;
        value: string;
    }

    export interface IURI {
        uri: string;
        id: string;
        description: string;
        parameters: Array<Models.IURIParameter>;
        availableMedia: string;
        selectedMedia: string;
        newURL: string;
        body: IBody;
    }

    export class URI implements IURI {
        //properties
        public uri: string;
        public id: string;
        public description: string;
        public parameters: Array<Models.IURIParameter>;
        public availableMedia: string;
        public selectedMedia: string;
        public newURL: string;
        public body: IBody;

        constructor(u: string) {
            this.uri = u;
            this.parameters = [];            
        }

    }//end class
}//end module   