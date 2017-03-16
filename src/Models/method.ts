//------------------------------------------------------------------------------
//----- Resource ---------------------------------------------------------------
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
module StreamStats.Models {
    export interface IMethod {
        type: string;
        uriList: Array<Models.IURI>;
    }

    export class Method implements IMethod {
        //properties
        public type: string;
        public uriList: Array<Models.IURI>;

        constructor(t: string) {
            this.type = t;;
        }

    }//end class
}//end module  