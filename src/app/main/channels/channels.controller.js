(function ()
{
    'use strict';

    angular
        .module('app.channels')
        .controller('ChannelsController', ChannelsController);

    /** @ngInject */
    function ChannelsController(Data)
    {
        var vm = this;

        // Data
        vm.helloText = Data.data.helloText;

        // Methods

        //////////
    }
})();
