(function ()
{
    'use strict';

    angular
        .module('app.games')
        .controller('GamesController', GamesController);

    /** @ngInject */
    function GamesController(Data)
    {
        var vm = this;

        // Data
        vm.helloText = Data.data.helloText;

        // Methods

        //////////
    }
})();
