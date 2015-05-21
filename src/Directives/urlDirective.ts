//------------------------------------------------------------------------------
//----- urlDirective -------------------------------------------------------
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
//04.15.2015 jkn - Created

//Import

module StreamStats.Directives{
    'use string';
    interface ISidebarControllerScope extends ng.IScope {
        vm: IUrlDirectiveController;
    }
    interface IUrlDirectiveController {

    }
    interface IUrlAttributes extends ng.IAttributes {
        //must use camelcase
        mainUrl: string;
    }

    class UrlDirectiveController implements IUrlDirectiveController {
        static $inject = ['$scope','StreamStats.Services.ResourceService'];
        constructor($scope: ISidebarControllerScope, private resourceService: Services.IResourceService) {
            $scope.vm = this;
            console.log('urlDirectiveController bla...');
        }     
    }

   
    class UrlDirective implements ng.IDirective {
        static instance(): ng.IDirective {
            return new UrlDirective;
        }
        restrict = 'A';
        controller = UrlDirectiveController;
        template = 'Views/urltemplate.html';
        replace= true;

        link(scope: ng.IScope, element: ng.IAugmentedJQuery, attributes:IUrlAttributes, controller:IUrlDirectiveController): void {
            console.log('does something');           
        }//end link
    }//end UrlDirective

    angular.module('StreamStats.Directives')
        .directive('UrlDirective', UrlDirective.instance);
}//end module 