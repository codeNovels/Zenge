(function ()
{
    'use strict';

    angular
        .module('app.channels')
        .controller('ChannelsController', ChannelsController);

    ChannelsController.$inject = ['Data', 'channelsService', '$state'];

    /** @ngInject */
    function ChannelsController(Data, channelsService, $state, $stateParams)
    {
        var vm = this;

        var type = $state.params.type?$state.params.type:'';
        var name = $state.params.name?$state.params.name:'';

        vm.windowSize = document.documentElement.clientWidth;

        // Data
        vm.helloText = Data.data.helloText;
        vm.goToUser = goToUser;

        getList();

        // Methods
        function goToUser(user) {
            $state.go('app.channels.user', { channel: user.channel.name });
        }

       function getList() {
            channelsService.getList(type, name)
                .then(function(data) {
                    if (!data){
                        return
                    }
                    vm.channels = data.streams.streams                  
                });
        }

        //////////
    }
})();
