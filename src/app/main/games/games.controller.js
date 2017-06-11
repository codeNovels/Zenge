(function () {
    'use strict';

    angular
        .module('app.games')
        .controller('GamesController', GamesController);

    GamesController.$inject = ['Data', 'gamesService','$state'];

    /** @ngInject */
    function GamesController(Data, gamesService, $state) {
        var vm = this;
        vm.windowSize = document.documentElement.clientWidth;

        // Data
        vm.helloText = Data.data.helloText;
        vm.goToGame = goToGame;


        getList();

        // Methods
        function goToGame(game) {
            $state.go('app.channels', { type: 'game', name: game.name});
        }

        function getList() {
            gamesService.getList()
                .then(function (data) {
                    if (!data){
                        return
                    }
                    vm.games = data.games.top;
                });
        }
    }
})();
