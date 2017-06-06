(function () {
    'use strict';

    angular
        .module('app.quick-panel')
        .controller('InfoTabController', InfoTabController);

    /** @ngInject */
    function InfoTabController(msApi, $timeout, $state, $rootScope, $sce, $scope, userService) {
        var vm = this;

        $scope.user = $rootScope.channel;
        if ($scope.user) {
            userService.getUser($state.params.channel)
                .then(function (data) {
                    vm.channel = data.user
                });
        }


        $scope.$watch('$root.channel', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.user = $rootScope.channel
                userService.getUser($scope.user)
                    .then(function (data) {
                        vm.channel = data.user
                    });
            }
        });

        // Data
        vm.chat = {};
        vm.chatActive = false;
        vm.replyMessage = '';
        vm.url = $sce.trustAsResourceUrl('http://www.twitch.tv/' + $scope.user + '/chat')

        msApi.request('quickPanel.contacts@get', {},
            // Success
            function (response) {
                vm.contacts = response.data;
            }
        );

        // Methods
        vm.toggleChat = toggleChat;
        vm.reply = reply;

        //////////

        function toggleChat(contact) {
            vm.chatActive = !vm.chatActive;

            if (vm.chatActive) {
                vm.replyMessage = '';
                vm.chat.contact = contact;
                scrollToBottomOfChat(0);
            }
        }

        function reply() {
            if (vm.replyMessage === '') {
                return;
            }

            if (!vm.chat.contact.dialog) {
                vm.chat.contact.dialog = [];
            }

            vm.chat.contact.dialog.push({
                who: 'user',
                message: vm.replyMessage,
                time: 'Just now'
            });

            vm.replyMessage = '';

            scrollToBottomOfChat(400);
        }

        function scrollToBottomOfChat(speed) {
            var chatDialog = angular.element('#chat-dialog');

            $timeout(function () {
                chatDialog.animate({
                    scrollTop: chatDialog[0].scrollHeight
                }, speed);
            }, 0);

        }
    }

})();