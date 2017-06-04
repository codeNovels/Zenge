(function ()
{
    'use strict';

    angular
        .module('app.games', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.games', {
                url    : '/games',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/games/games.html',
                        controller : 'GamesController as vm'
                    }
                },
                resolve: {
                    Data: function (msApi)
                    {
                        return msApi.resolve('games@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/games');

        // Api
        msApiProvider.register('games', ['app/data/games/games.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'Navigation',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.games', {
            title    : 'Games',
            icon     : 'icon-gamepad-variant',
            state    : 'app.games',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'GAMES.GAMES_NAV',
            weight   : 1
        });
    }
})();