(function ()
{
    'use strict';

    angular
        .module('app.games')
        .controller('GamesController', GamesController);

    GamesController.$inject = ['Data', 'gamesService'];

    /** @ngInject */
    function GamesController(Data, gamesService)
    {
        var vm = this;

        // Data
        vm.helloText = Data.data.helloText;

        getList();

        // Methods
       function getList() {
            gamesService.getList()
                .then(function(data) {
                    vm.games = data.games.top;                  
                });
        }
    }
})();
