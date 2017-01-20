import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Games = new Meteor.Collection('games');

// GameSchema = new SimpleSchema({
//   "code": {
//     type: String,
//     label: "gameCode"
//   },
//   "code.players": {
//     type: Array,
//     label: "players"
//   }
// });
//
// Games.attachSchema(GameSchema);

Meteor.methods({
  'games.insert'(text) {
    check(text, String);

    Games.insert({
      text,
      createdAt: new Date(),
      players: [

      ]
    });
  }
});
