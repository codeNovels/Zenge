(function () {
    'use strict';

    angular
        .module('fuse')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, $rootScope, $state, userService) {
        // Data
        
        if($state.params !== undefined && $state.params.channel){
            $rootScope.channel = $state.params.channel
        }

        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
               if (toParams.channel && $rootScope.channel !== toParams.channel){
                   $rootScope.channel = toParams.channel
               }
        })
        
        //////////

        // Remove the splash screen
        $scope.$on('$viewContentAnimationEnded', function (event) {
            if (event.targetScope.$id === $scope.$id) {
                $rootScope.$broadcast('msSplashScreen::remove');
            }
        });
    }
})();