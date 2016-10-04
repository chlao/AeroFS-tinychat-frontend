// Toggle the time a message was sent by clicking on the message bubble 
angular.module('tinychat').directive('showTime', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            element.bind('click', function(){
                $(element).siblings('.message__date').toggleClass(attrs.showTime); 
            });
        }
    };
});

// Make message editable when element (edit icon) is clicked on 
angular.module('tinychat').directive('editMessage', function(sharedPropertiesService){
    var msg;
    return {
        restrict: 'A', 
        link: function(scope, element, attrs){
            element.bind('click', function(){ 
                var msg = element.siblings('.message__content'); 

                //Keep previous message in case error occurs saving new message
                sharedPropertiesService.prevMessage = msg.text();

                msg.prop('contenteditable', true);
                msg.focus();
            });
        }, 
    }
});
