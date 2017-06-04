(function ()
{
    'use strict';

    angular
        .module('app.channels')
        .controller('ChannelsController', ChannelsController);

    ChannelsController.$inject = ['Data', 'channelsService'];

    /** @ngInject */
    function ChannelsController(Data, channelsService)
    {
        var vm = this;

        // Data
        vm.helloText = Data.data.helloText;

        getList();

        // Methods
       function getList() {
            channelsService.getList()
                .then(function(data) {
                    vm.channels = data.streams.streams                  
                });
        }

        //////////
    }
})();
