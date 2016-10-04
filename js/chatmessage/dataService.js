angular.module('tinychat').service('dataService', function($http, sharedPropertiesService){
    this.getMessages = function(scope){
        // BACK_TODO: Change url of request to correct route /messages 
        $http({method: 'GET', url: '/fixtures/fakedata.json'})
            .success(function(data, status) {
                var i, j; 
                var elementOnPage; 

                // If there's a difference in the number of outbound messages on the client side v. obtained from database
                if (data.messages.length > sharedPropertiesService.numOutboundMsg){
                    // Check if msg is not already on the page and add if not
                    for (i = 0; i < data.messages.length; i++){
                        elementOnPage = angular.element(document.querySelector('#chat-' + data.messages[i].id)); 
                        if (elementOnPage.length === 0){
                            scope.messages.push(data.messages[i]); 
                            // Update number of outbound message on client side 
                            sharedPropertiesService.numOutboundMsg++; 
                        } 
                    } 
                }
            })
            .error(function(data, status) {
                console.error(data || "Request failed");
            });   
    };

    this.sendMessage = function(message, scope){
        // BACK_TODO: REMOVE when Post to /messages is supported
        scope.messages.push(message); 
        angular.element(document.querySelector('.sendForm__content')).val(''); 
        scope.sendForm__content = '';  
 
        /* BACK_TODO: Post Message to '/messages'
        $http({method: 'POST', url: '/messages', data: message})
            .success(function(data){
                message.id = data.id; 
                scope.messages.push(message); 

                // Reset form and variable
                angular.element(document.querySelector('.sendForm__content')).val('');   
                scope.sendForm__content = '';  
            })
            .error(function(data, status) {
                console.error(data || "Request failed");
                // Remove added message 
                scope.messages.pop();
            });   
        */
    }; 

    this.updateMessage = function(msgElem, newMsg){
        var id = msgElem.parent().prop('id').split('-')[1];

        // BACK_TODO: REMOVE when Post to /messages/{id} is supported
        msgElem.prop('contenteditable', false);

        /* BACK_TODO: Put Message to '/messages/{id}' 
        $http({method: 'POST', url: '/messages/ + id', data: newMsg})
            .success(function(){
                msgElem.prop('contenteditable', false); 
            })
            .error(function(data, status) {
                console.error(data || "Request failed");
                // Revert back edited message
                msgElem.text(sharedPropertiesService.prevMessage); 
            });  
        */
    };
});