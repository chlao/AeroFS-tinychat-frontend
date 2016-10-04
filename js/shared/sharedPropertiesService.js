angular.module('tinychat').factory('sharedPropertiesService', function(){
    return {
        sharedObject: {
            prevMessage: '', 
            numOutboundMsg: 0, 
        }
    }
});