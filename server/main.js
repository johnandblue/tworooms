import { Meteor } from 'meteor/meteor';
import '../imports/api/games.js';


Meteor.startup(() => {
  // code to run on server at startup
  Meteor.onConnection(function(connection){
  });
});
