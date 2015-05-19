//------------------------------------------------------------------------------
//----- Resource ---------------------------------------------------------------
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
    export interface IResource {
        name: string;
        description: string;
        methods: Array<string>;
    }

    export class Resource implements IResource {
        //properties
        public name: string;
        public description: string;
        public methods: Array<string>;

        constructor(n: string) {
            this.name = n;
        }

    }//end class
}//end module  