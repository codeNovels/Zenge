(function ()
{
    'use strict';

    angular
        .module('app.channels', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.channels', {
                url    : '/channels?/:type?/:name?',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/channels/channels.html',
                        controller : 'ChannelsController as vm'
                    }
                },
                resolve: {
                    Data: function (msApi)
                    {
                        return msApi.resolve('channels@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/channels');

        // Api
        msApiProvider.register('channels', ['app/data/channels/channels.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'Navigation',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.channels', {
            title    : 'Channels',
            icon     : 'icon-television',
            state    : 'app.channels',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'CHANNELS.CHANNELS_NAV',
            weight   : 1
        });
    }
})();