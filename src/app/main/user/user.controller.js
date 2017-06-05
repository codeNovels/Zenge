(function () {
    'use strict';

    angular
        .module('app.user')
        .controller('UserController', UserController);

    UserController.$inject = ['Data', 'userService', '$state', '$scope', '$sce'];

    /** @ngInject */
    function UserController(Data, userService, $state, $scope, $sce) {
        var vm = this;
        $scope.channel = $state.params.channel
        $scope.url = $sce.trustAsResourceUrl('http://player.twitch.tv/?channel='+$scope.channel)
    //    getList();

        // Methods
        function getList() {
            userService.getList(channel)
                .then(function (data) {
                    vm.user = data.user;
                });
        }
    }
})();
