(function () {
    'use strict';

    angular
        .module('app.user')
        .factory('userService', userService);

    userService.$inject = ['$http'];

    /* @ngInject */
    function userService($http) {
        var service = {
            getUser: getUser
        };

        return service;


        // Services
        function getUser(channel) {
            var url = 'https://api.twitch.tv/kraken/streams/' + channel + '?client_id=8t7uaf2uwb21c5afou4bdte9lnvzwe';
            return $http.get(url)
                .then(getListComplete)
                .catch(getListFailed);

            function getListComplete(response) {
                return {
                    user: response.data.stream
                };
            }

            function getListFailed(error) {
                return false;
            }
        }
    }

})();