(function ()
{
    'use strict';

    angular
        .module('app.user', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.channels.user', {
                url    : '/users?/:channel?',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/user/user.html',
                        controller : 'UserController as vm'
                    }
                },
                resolve: {
                    Data: function (msApi)
                    {
                        return msApi.resolve('user@get');
                    }
                }
            });

         // Translation
         $translatePartialLoaderProvider.addPart('app/main/user');

         // Api
         msApiProvider.register('user', ['app/data/user/user.json']);

        // // Navigation
        // msNavigationServiceProvider.saveItem('fuse', {
        //     title : 'Navigation',
        //     group : true,
        //     weight: 1
        // });

        // msNavigationServiceProvider.saveItem('fuse.user', {
        //     title    : 'User',
        //     icon     : 'icon-gamepad-variant',
        //     state    : 'app.user',
        //     /*stateParams: {
        //         'param1': 'page'
        //      },*/
        //     translate: 'USER.USER_NAV',
        //     weight   : 1
        // });
    }
})();