(function () {
    'use strict';

    angular
        .module('app.games')
        .factory('gamesService', gamesService);

    gamesService.$inject = ['$http'];

    /* @ngInject */
    function gamesService($http) {
        var service = {
            getList: getList
            ,searchDirectory: searchDirectory
        };

        return service;


        // Services
        function getList(ticketId) {
            var url = 'https://api.twitch.tv/kraken/games/top?limit=50&on_site=1&client_id=8t7uaf2uwb21c5afou4bdte9lnvzwe';
            return $http.get(url)
                .then(getListComplete)
                .catch(getListFailed);

            function getListComplete(response) {
                return {
                    games : response.data
                };
            }

            function getListFailed(error) {
                return false;
            }
        }

        function searchDirectory(query) {
            var url = 'https://api.twitch.tv/kraken/search/games?query='+query+'&type=suggest&client_id=8t7uaf2uwb21c5afou4bdte9lnvzwe';
            return $http.get(url)
                .then(searchDirectoryComplete)
                .catch(searchDirectoryFailed);

            function searchDirectoryComplete(response) {
                return {
                    results : response.data.games
                };
            }

            function searchDirectoryFailed(error) {
                return false;
            }
        }
    }

})();