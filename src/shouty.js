"use strict";

// Shared state between all instances
const sharedMessages = [];  // Format: [{message: string, shouter: Person}]
const MAX_DISTANCE = 100;  // Maximum distance in meters for hearing shouts

module.exports = (name) => {
    let distance = 0;
    
    const person = {
        name: name,
        
        moveTo: function(newDistance) {
            distance = newDistance;
        },
        
        getDistance: function() {
            return distance;
        },
        
        shout: function(message) {
            if (message) {
                sharedMessages.length = 0;  // Clear previous messages
                sharedMessages.push({
                    message: message,
                    shouter: this
                });
            }
        },
        
        messageHeard: function() {
            console.log(sharedMessages);
            return sharedMessages
                .filter(({ shouter }) => {
                    // Calculate distance between this person and the shouter
                    const distanceToShouter = Math.abs(distance - shouter.getDistance());
                    return distanceToShouter <= MAX_DISTANCE;
                })
                .map(({ message }) => message);
        }
    };
    
    return person;
}