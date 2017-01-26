import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Timer = new Meteor.Collection('Timer');

if (Meteor.isServer) {
  // This code only runs on the server

  Meteor.publish('timer', function timerPublication() {
    return Timer.find();
  });
}

Meteor.setInterval(function() {
  Timer.update(Timer.findOne()._id, {
    $inc: {value: -1000}
  });
}, 1000);

// Meteor.methods({
//     getServerTime: function () {
//         var _time = (new Date).toTimeString();
//         console.log(_time);
//         return _time;
//     }
// });
