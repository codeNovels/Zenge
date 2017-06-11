(function () {
    'use strict';

    angular
        .module('app.games')
        .controller('GamesController', GamesController);

    angular
        .module('app.games')
        .directive('errSrc', function () {
            return {
                link: function (scope, element, attrs) {
                    element.bind('error', function () {
                        if (attrs.src != attrs.errSrc) {
                            attrs.$set('src', attrs.errSrc);
                        }
                    });
                }
            }
        });

    GamesController.$inject = ['Data', 'gamesService', '$state'];

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
            $state.go('app.channels', { type: 'game', name: game.name });
        }

        function getList() {
            gamesService.getList()
                .then(function (data) {
                    if (!data) {
                        return
                    }
                    vm.games = data.games.top;
                });
        }
    }
})();
