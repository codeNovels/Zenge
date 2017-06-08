(function ()
{
    'use strict';

    angular
        .module('app.quick-panel')
        .controller('ChatTabController', ChatTabController);

    /** @ngInject */
    function ChatTabController(msApi, $timeout, $state, $rootScope, $sce, $scope)
    {
        var vm = this;

        $scope.user = 'zengetv'
        if ($rootScope.channel){
            $scope.user = $rootScope.channel;
        }

        $scope.$watch('$root.channel', function (newValue, oldValue) {
            if (newValue !== oldValue){
                $scope.user = $rootScope.channel
                vm.url = $sce.trustAsResourceUrl('http://www.twitch.tv/'+$scope.user+'/chat')
            }
        });

        // Data
        vm.chat = {};
        vm.chatActive = false;
        vm.replyMessage = '';
        vm.url = $sce.trustAsResourceUrl('http://www.twitch.tv/'+$scope.user+'/chat')

        msApi.request('quickPanel.contacts@get', {},
            // Success
            function (response)
            {
                vm.contacts = response.data;
            }
        );

        // Methods
        vm.toggleChat = toggleChat;
        vm.reply = reply;

        //////////

        function toggleChat(contact)
        {
            vm.chatActive = !vm.chatActive;

            if ( vm.chatActive )
            {
                vm.replyMessage = '';
                vm.chat.contact = contact;
                scrollToBottomOfChat(0);
            }
        }

        function reply()
        {
            if ( vm.replyMessage === '' )
            {
                return;
            }

            if ( !vm.chat.contact.dialog )
            {
                vm.chat.contact.dialog = [];
            }

            vm.chat.contact.dialog.push({
                who    : 'user',
                message: vm.replyMessage,
                time   : 'Just now'
            });

            vm.replyMessage = '';

            scrollToBottomOfChat(400);
        }

        function scrollToBottomOfChat(speed)
        {
            var chatDialog = angular.element('#chat-dialog');

            $timeout(function ()
            {
                chatDialog.animate({
                    scrollTop: chatDialog[0].scrollHeight
                }, speed);
            }, 0);

        }
    }

})();