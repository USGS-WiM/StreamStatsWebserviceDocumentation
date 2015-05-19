//------------------------------------------------------------------------------
//----- URIParameter -----------------------------------------------------------
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
    export interface IURIParameter {
        parameter: string;
        value: string;
        required?: boolean;
        description: string;
    }

    export class URIParameter implements IURIParameter {
        //properties
        public parameter: string;
        public value: string;
        public required: boolean;
        public description: string;

        constructor(p:string, v:string, d:string, r:boolean = false) {
            this.parameter = p;
            this.value = v;
            this.description = d;
            this.required = r;
        }

    }//end class
}//end module 