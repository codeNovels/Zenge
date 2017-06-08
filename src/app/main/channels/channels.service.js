(function () {
    'use strict';

    angular
        .module('app.channels')
        .factory('channelsService', channelsService);

    channelsService.$inject = ['$http'];

    /* @ngInject */
    function channelsService($http) {
        var service = {
            getList: getList
        };

        return service;


        // Services
        function getList(type, id) {
            var query = '&'+type+'='+id
            var url = 'https://api.twitch.tv/kraken/streams?limit=20&offset=0'+query+'&broadcaster_language=&on_site=1&client_id=8t7uaf2uwb21c5afou4bdte9lnvzwe';
            return $http.get(url)
                .then(getListComplete)
                .catch(getListFailed);

            function getListComplete(response) {
                return {
                    streams : response.data
                };
            }

            function getListFailed(error) {
                return false;
            }
        }
    }

})();