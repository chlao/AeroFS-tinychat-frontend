angular.module('tinychat').controller('chatmessageCtrl', function($scope, $interval, dataService, sharedPropertiesService){
    $scope.messages = []; 

    $scope.messageHovered = false; 
    $scope.messageFocused = true;   

    angular.element(document).ready(function(){
        dataService.getMessages($scope);
        sharedPropertiesService.numOutboundMsg = $scope.messages.length; 

        // Polling for new messages added every 3 seconds
        $interval(function(){
            dataService.getMessages($scope);
        }, 3000);  
    });

    // Add a message
    $scope.sendMessage = function(){
        if ($scope.sendForm__content || $scope.sendForm__content.trim() !== ''){
            var message = {
                "author": $scope.sendForm__author, 
                "timestamp": new Date().getTime(), 
                "content": $scope.sendForm__content, 
                "type": 'outbound'
            };

            dataService.sendMessage(message, $scope);
        }
    }; 

    // Update an edited message
    $scope.updateMessage = function($event){
        var msgElem = angular.element($event.target);
        var newMsgText = msgElem.text();

        // Update if contents of message have changed
        if (newMsgText !== sharedPropertiesService.prevMessage){
            newMsg = {
                "content": newMsgText,
                "last_edited": new Date().getTime()
            }; 
            dataService.updateMessage(msgElem, newMsg);
        }
    };
});